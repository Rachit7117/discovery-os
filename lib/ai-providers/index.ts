import { GeminiProvider } from './gemini';
import { OpenAIProvider } from './openai';
import type { AIProvider, ProviderName } from './types';

const DEFAULT_MODELS: Record<ProviderName, string> = {
  gemini: 'gemini-2.0-flash-lite',
  openai: 'gpt-4o-mini',
};

/**
 * Reads AI_PROVIDER + AI_MODEL from env and returns the matching provider.
 * Returns null when no API key is configured — the route sends a helpful fallback message.
 */
export function getProvider(): AIProvider | null {
  const providerName = (process.env.AI_PROVIDER ?? 'gemini') as ProviderName;
  const model = process.env.AI_MODEL ?? DEFAULT_MODELS[providerName] ?? DEFAULT_MODELS.gemini;

  if (providerName === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return null;
    return new OpenAIProvider(apiKey, model);
  }

  // Default: gemini
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GeminiProvider(apiKey, model);
}

export type { AIProvider, ProviderName } from './types';
