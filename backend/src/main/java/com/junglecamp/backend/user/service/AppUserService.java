package com.junglecamp.backend.user.service;

import com.junglecamp.backend.user.dto.UserDtos.NicknameAvailability;
import com.junglecamp.backend.user.model.AppUser;
import com.junglecamp.backend.user.repository.AppUserRepository;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.Set;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AppUserService {

	private static final Pattern NICKNAME_PATTERN = Pattern.compile("^[\\p{IsHangul}A-Za-z0-9_-]{2,20}$");

	private final AppUserRepository repository;
	private final Set<String> bootstrapAdminEmails;

	public AppUserService(
			AppUserRepository repository,
			@Value("${app.auth.admin.bootstrap-emails:}") String bootstrapAdminEmails) {
		this.repository = repository;
		this.bootstrapAdminEmails = parseEmails(bootstrapAdminEmails);
	}

	public AppUser upsertGoogleUser(String providerUserId, String email, String displayName, String avatarUrl) {
		boolean existingGoogleUser = repository.findByProviderAndProviderUserId("google", providerUserId).isPresent();
		if (!existingGoogleUser && repository.findByProviderAndEmail("local", email).isPresent()) {
			throw new OAuth2AuthenticationException(new OAuth2Error(
					"local_email_exists",
					"이미 일반 이메일 계정으로 가입된 이메일입니다. 계정 연결 기능은 이후 별도 화면에서 제공됩니다.",
					null));
		}
		return applyBootstrapAdminRole(repository.upsert("google", providerUserId, email, displayName, avatarUrl));
	}

	public AppUser upsertGoogleUser(
			String providerUserId,
			String email,
			String displayName,
			String avatarUrl,
			boolean googleEmailVerified) {
		boolean existingGoogleUser = repository.findByProviderAndProviderUserId("google", providerUserId).isPresent();
		if (!existingGoogleUser) {
			var localCredentials = repository.findLocalCredentialsByEmail(email);
			if (localCredentials.isPresent()) {
				if (googleEmailVerified && hasText(localCredentials.get().passwordHash())) {
					return applyBootstrapAdminRole(repository.markEmailVerified(localCredentials.get().user().id()));
				}
				throw new OAuth2AuthenticationException(new OAuth2Error(
						"local_email_exists",
						"이미 일반 이메일 계정으로 가입된 이메일입니다. 계정 연결 기능은 이후 별도 화면에서 제공됩니다.",
						null));
			}
		}
		return applyBootstrapAdminRole(repository.upsert("google", providerUserId, email, displayName, avatarUrl));
	}

	public AppUser findOrCreateLocalUser(String username) {
		return repository.upsert("local", username, null, username, null);
	}

	public AppUser currentUser(Authentication authentication) {
		if (authentication.getPrincipal() instanceof AppUser user) {
			return applyBootstrapAdminRole(user);
		}
		if (authentication instanceof OAuth2AuthenticationToken oauth2Token) {
			OAuth2User oauth2User = oauth2Token.getPrincipal();
			if ("google".equals(oauth2Token.getAuthorizedClientRegistrationId())) {
				String providerUserId = attribute(oauth2User, "sub", oauth2User.getName());
				String email = attribute(oauth2User, "email", null);
				String displayName = attribute(oauth2User, "name", attribute(oauth2User, "email", oauth2User.getName()));
				String avatarUrl = attribute(oauth2User, "picture", null);
				boolean emailVerified = booleanAttribute(oauth2User, "email_verified");
				return repository.findByProviderAndProviderUserId("google", providerUserId)
						.map(this::applyBootstrapAdminRole)
						.orElseGet(() -> upsertGoogleUser(providerUserId, email, displayName, avatarUrl, emailVerified));
			}
		}

		String username = authentication.getName();
		return repository.findByProviderAndProviderUserId("local", username)
				.orElseGet(() -> findOrCreateLocalUser(username));
	}

	public AppUser updateNickname(Authentication authentication, String nickname) {
		AppUser user = currentUser(authentication);
		String normalized = normalizeNickname(nickname);
		try {
			return repository.updateNickname(user.id(), normalized);
		} catch (DuplicateKeyException exception) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Nickname is already in use");
		}
	}

	public String displayNickname(AppUser user) {
		if (user == null) {
			return null;
		}
		if (user.nickname() != null && !user.nickname().isBlank()) {
			return user.nickname();
		}
		return user.displayName();
	}

	public String normalizeNickname(String nickname) {
		if (nickname == null || nickname.isBlank()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "nickname is required");
		}
		String normalized = nickname.trim();
		if (!NICKNAME_PATTERN.matcher(normalized).matches()) {
			throw new ResponseStatusException(
					HttpStatus.BAD_REQUEST,
					"nickname must be 2-20 Korean, English, number, underscore, or hyphen characters");
		}
		return normalized;
	}

	public NicknameAvailability nicknameAvailability(String nickname) {
		String normalized = nickname == null ? "" : nickname.trim();
		if (!NICKNAME_PATTERN.matcher(normalized).matches()) {
			return new NicknameAvailability(normalized, false, false, "nickname_format_invalid");
		}
		boolean available = !repository.nicknameExists(normalized);
		return new NicknameAvailability(
				normalized,
				true,
				available,
				available ? "nickname_available" : "nickname_taken");
	}

	public AppUser applyBootstrapAdminRole(AppUser user) {
		if (user == null || user.email() == null || user.email().isBlank()) {
			return user;
		}
		String normalizedEmail = user.email().trim().toLowerCase(Locale.ROOT);
		if (!bootstrapAdminEmails.contains(normalizedEmail) || !user.emailVerified()) {
			return user;
		}
		if (user.roles().contains("ROLE_ADMIN")) {
			return user;
		}
		LinkedHashSet<String> roles = new LinkedHashSet<>(user.roles());
		roles.add("ROLE_USER");
		roles.add("ROLE_ADMIN");
		return repository.updateRoles(user.id(), roles.stream().toList());
	}

	private Set<String> parseEmails(String value) {
		if (value == null || value.isBlank()) {
			return Set.of();
		}
		return Arrays.stream(value.split(","))
				.map(email -> email.trim().toLowerCase(Locale.ROOT))
				.filter(email -> !email.isBlank())
				.collect(java.util.stream.Collectors.toUnmodifiableSet());
	}

	private String attribute(OAuth2User user, String name, String fallback) {
		Object value = user.getAttribute(name);
		return value == null || value.toString().isBlank() ? fallback : value.toString();
	}

	private boolean booleanAttribute(OAuth2User user, String name) {
		Object value = user.getAttribute(name);
		return Boolean.TRUE.equals(value) || (value != null && "true".equalsIgnoreCase(value.toString()));
	}

	private boolean hasText(String value) {
		return value != null && !value.isBlank();
	}
}
