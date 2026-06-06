import { GeminiProvider } from './gemini';
import { OpenAIProvider } from './openai';
import { GroqProvider } from './groq';
import type { AIProvider, ProviderName } from './types';

const DEFAULT_MODELS: Record<ProviderName, string> = {
  groq:   'llama-3.3-70b-versatile',
  gemini: 'gemini-2.0-flash-lite',
  openai: 'gpt-4o-mini',
};

/**
 * Reads AI_PROVIDER + AI_MODEL from env and returns the matching provider.
 * Default provider is Groq (free, fast, generous limits).
 * Returns null when no API key is set — route sends a helpful fallback message.
 *
 * To swap provider, change .env.local:
 *   AI_PROVIDER=groq   → GROQ_API_KEY
 *   AI_PROVIDER=gemini → GEMINI_API_KEY
 *   AI_PROVIDER=openai → OPENAI_API_KEY
 */
export function getProvider(): AIProvider | null {
  const providerName = (process.env.AI_PROVIDER ?? 'groq') as ProviderName;
  const model = process.env.AI_MODEL ?? DEFAULT_MODELS[providerName] ?? DEFAULT_MODELS.groq;

  if (providerName === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return null;
    return new OpenAIProvider(apiKey, model);
  }

  if (providerName === 'gemini') {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GeminiProvider(apiKey, model);
  }

  // Default: groq
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  return new GroqProvider(apiKey, model);
}

export type { AIProvider, ProviderName } from './types';
