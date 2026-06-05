import OpenAI from 'openai';
import type { AIProvider, StreamParams } from './types';

const SSE_DONE = new TextEncoder().encode('data: [DONE]\n\n');

function sseChunk(content: string): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`);
}

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.client = new OpenAI({ apiKey });
    this.model = model;
  }

  async streamChat({ messages, systemPrompt, maxTokens = 800, temperature = 0.7 }: StreamParams): Promise<ReadableStream<Uint8Array>> {
    const stream = await this.client.chat.completions.create({
      model: this.model,
      stream: true,
      max_tokens: maxTokens,
      temperature,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.slice(-20),
      ],
    });

    return new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content ?? '';
            if (content) controller.enqueue(sseChunk(content));
          }
          controller.enqueue(SSE_DONE);
        } catch (err) {
          controller.enqueue(sseChunk('\n\n⚠️ Stream interrupted. Please try again.'));
          controller.enqueue(SSE_DONE);
          console.error('[OpenAIProvider] stream error:', err);
        } finally {
          controller.close();
        }
      },
    });
  }
}
