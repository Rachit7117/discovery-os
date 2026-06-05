import type { AIProvider, ProviderName } from './types';

const DEFAULT_MODELS: Record<ProviderName, string> = {
  gemini: 'gemini-2.0-flash',
  openai: 'gpt-4o-mini',
};

/**
 * Reads AI_PROVIDER + AI_MODEL from env and returns the matching provider.
 * Falls back to a no-op stream with a helpful message when no key is set.
 */
export function getProvider(): AIProvider | null {
  const providerName = (process.env.AI_PROVIDER ?? 'gemini') as ProviderName;
  const model = process.env.AI_MODEL ?? DEFAULT_MODELS[providerName] ?? DEFAULT_MODELS.gemini;

  if (providerName === 'gemini') {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    const { GeminiProvider } = require('./gemini') as typeof import('./gemini');
    return new GeminiProvider(apiKey, model);
  }

  if (providerName === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return null;
    const { OpenAIProvider } = require('./openai') as typeof import('./openai');
    return new OpenAIProvider(apiKey, model);
  }

  return null;
}

export type { AIProvider, ProviderName } from './types';
