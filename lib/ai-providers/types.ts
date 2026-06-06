export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface StreamParams {
  messages: ChatMessage[];
  systemPrompt: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Common interface every AI provider must implement.
 * Returns a ReadableStream that emits SSE lines: `data: {"content":"..."}\n\n`
 * and terminates with `data: [DONE]\n\n`.
 */
export interface AIProvider {
  streamChat(params: StreamParams): Promise<ReadableStream<Uint8Array>>;
}

export type ProviderName = 'groq' | 'gemini' | 'openai';
