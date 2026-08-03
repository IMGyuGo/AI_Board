export function makeStatusResponse(): Record<string, unknown> {
  return {
    service: 'Jungle AI Backend',
    state: 'running',
    message: 'Backend API is connected.',
  };
}
