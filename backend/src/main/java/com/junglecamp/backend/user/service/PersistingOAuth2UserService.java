package com.junglecamp.backend.user.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class PersistingOAuth2UserService extends DefaultOAuth2UserService {

	private final AppUserService appUserService;

	public PersistingOAuth2UserService(AppUserService appUserService) {
		this.appUserService = appUserService;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User user = super.loadUser(userRequest);
		if ("google".equals(userRequest.getClientRegistration().getRegistrationId())) {
			appUserService.upsertGoogleUser(
					attribute(user, "sub", user.getName()),
					attribute(user, "email", null),
					attribute(user, "name", attribute(user, "email", user.getName())),
					attribute(user, "picture", null),
					booleanAttribute(user, "email_verified"));
		}
		return user;
	}

	private String attribute(OAuth2User user, String name, String fallback) {
		Object value = user.getAttribute(name);
		return value == null || value.toString().isBlank() ? fallback : value.toString();
	}

	private boolean booleanAttribute(OAuth2User user, String name) {
		Object value = user.getAttribute(name);
		return Boolean.TRUE.equals(value) || (value != null && "true".equalsIgnoreCase(value.toString()));
	}
}
