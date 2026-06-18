import type { HookProvider } from '../../core/src/provider.js';

let hookProviders: HookProvider[] = [];

export function setHookProviders(providers: HookProvider[]): void {
  hookProviders = providers;
}

export function getHookProviders(): HookProvider[] {
  return hookProviders;
}

export function getHookProvider(providerId?: string): HookProvider | null {
  if (hookProviders.length === 0) return null;
  if (!providerId) return hookProviders[0];
  return (
    hookProviders.find((p) => p.id === providerId) ||
    hookProviders[0]
  );
}

export function getHookProviderOrThrow(providerId?: string): HookProvider {
  const provider = getHookProvider(providerId);
  if (!provider) {
    throw new Error('No HookProviders registered');
  }
  return provider;
}
