import { NextRequest } from 'next/server';
import { getProvider } from '@/lib/ai-providers';
import { PERSONA_PROMPTS } from '@/lib/ai-providers/prompts';

export const runtime = 'nodejs'; // edge doesn't support require(); nodejs handles both SDKs fine

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no',
};

function sseMessage(content: string): Response {
  const body = new ReadableStream({
    start(controller) {
      const enc = new TextEncoder();
      controller.enqueue(enc.encode(`data: ${JSON.stringify({ content })}\n\n`));
      controller.enqueue(enc.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });
  return new Response(body, { headers: SSE_HEADERS });
}

function errorResponse(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: NextRequest) {
  const { messages, personaId = 'teresa' } = await req.json() as {
    messages: Array<{ role: 'user' | 'assistant'; content: string }>;
    personaId?: string;
  };

  const provider = getProvider();

  if (!provider) {
    const providerName = process.env.AI_PROVIDER ?? 'gemini';
    const keyName = providerName === 'openai' ? 'OPENAI_API_KEY' : 'GEMINI_API_KEY';
    return sseMessage(
      `⚠️ No API key configured. Add ${keyName} (and optionally AI_PROVIDER=${providerName}, AI_MODEL=…) to your .env.local file to enable AI responses.`
    );
  }

  const systemPrompt = PERSONA_PROMPTS[personaId] ?? PERSONA_PROMPTS.teresa;

  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const stream = await provider.streamChat({ messages, systemPrompt });
      return new Response(stream, { headers: SSE_HEADERS });
    } catch (err: unknown) {
      attempt++;
      const error = err as { status?: number; statusCode?: number; message?: string };
      const status = error?.status ?? error?.statusCode;

      if (status === 429) {
        if (attempt < MAX_RETRIES) {
          await new Promise((r) => setTimeout(r, 1000 * attempt));
          continue;
        }
        return errorResponse(429, 'Rate limit reached. Please wait a moment and try again.');
      }

      if (status === 401 || status === 403) {
        return errorResponse(401, 'Invalid API key. Please check your key in .env.local.');
      }

      if (attempt >= MAX_RETRIES) {
        return errorResponse(500, 'Something went wrong after multiple retries. Please try again.');
      }
    }
  }

  return errorResponse(500, 'Failed after retries.');
}
