import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIProvider, StreamParams } from './types';

const SSE_DONE = new TextEncoder().encode('data: [DONE]\n\n');

function sseChunk(content: string): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`);
}

export class GeminiProvider implements AIProvider {
  private client: GoogleGenerativeAI;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = model;
  }

  async streamChat({ messages, systemPrompt, maxTokens = 800, temperature = 0.7 }: StreamParams): Promise<ReadableStream<Uint8Array>> {
    // Gemini uses 'model' role instead of 'assistant'
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const genModel = this.client.getGenerativeModel({
      model: this.model,
      systemInstruction: systemPrompt,
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature,
      },
    });

    const chat = genModel.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage?.content ?? '');

    return new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(sseChunk(text));
          }
          controller.enqueue(SSE_DONE);
        } catch (err) {
          controller.enqueue(sseChunk('\n\n⚠️ Stream interrupted. Please try again.'));
          controller.enqueue(SSE_DONE);
          console.error('[GeminiProvider] stream error:', err);
        } finally {
          controller.close();
        }
      },
    });
  }
}
