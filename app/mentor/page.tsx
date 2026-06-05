'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Send,
  Sparkles,
  RotateCcw,
  User,
  Lightbulb,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';
import { Navigation } from '@/components/shared/Navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getChatHistory, saveChatHistory, getActivePersona, saveActivePersona } from '@/lib/storage';
import { generateId } from '@/lib/mock-ai';
import { MENTOR_PERSONAS, PERSONA_SUGGESTED_PROMPTS } from '@/lib/mentor-personas';
import type { ChatMessage, MentorPersonaId } from '@/types';

function formatContent(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={i} className="font-semibold text-white text-sm mt-3 mb-1">{line.slice(2, -2)}</p>
      );
    }
    if (line.startsWith('- ') || line.startsWith('• ')) {
      const content = line.slice(2);
      const parts = content.split('**');
      return (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-300 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
          <span>{parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{p}</strong> : p)}</span>
        </li>
      );
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;
    const parts = line.split('**');
    return (
      <p key={i} className="text-sm text-slate-300 leading-relaxed">
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{p}</strong> : p)}
      </p>
    );
  });
}

function buildWelcome(personaId: MentorPersonaId): ChatMessage {
  const persona = MENTOR_PERSONAS.find((p) => p.id === personaId)!;
  const welcomes: Record<MentorPersonaId, string> = {
    teresa: `${persona.avatar} Hi! I'm your Discovery Coach — channeling Teresa Torres, author of *Continuous Discovery Habits*.

**What I can help with:**
- Setting up continuous discovery habits
- Building and interpreting Opportunity Solution Trees
- Designing customer interview questions
- Testing assumptions cheaply before building
- Connecting discovery work to desired outcomes

Ask me anything, or try one of the suggested prompts below.`,
    marty: `${persona.avatar} Let's get into it. I'm drawing from Marty Cagan's frameworks at SVPG.

**What I can help with:**
- Understanding what separates great product teams from feature factories
- Navigating the four product risks (value, usability, feasibility, viability)
- Product discovery vs. delivery — and why the distinction matters
- Building the case for empowered product teams
- Evaluating real-world product strategy decisions

Ask me something — I don't sugarcoat.`,
    founder: `${persona.avatar} Hey — I'm your startup founder mentor. I've shipped products, made every mistake, and learned the hard way.

**What I can help with:**
- Validating ideas before writing a line of code
- Getting brutally honest customer feedback (without being lied to)
- Finding your first customers fast
- Knowing when to pivot vs. persevere
- Cutting through frameworks to what actually matters

What are you working on? Let's figure out the fastest path to learning something useful.`,
  };

  return {
    id: 'welcome',
    role: 'assistant',
    content: welcomes[personaId],
    timestamp: new Date().toISOString(),
    personaId,
  };
}

export default function MentorPage() {
  const [activePersonaId, setActivePersonaId] = useState<MentorPersonaId>('teresa');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPersonaPicker, setShowPersonaPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedPersonaId = getActivePersona();
    setActivePersonaId(savedPersonaId);
    const history = getChatHistory();
    if (history.length > 0) {
      setMessages([buildWelcome(savedPersonaId), ...history]);
    } else {
      setMessages([buildWelcome(savedPersonaId)]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const switchPersona = (personaId: MentorPersonaId) => {
    setActivePersonaId(personaId);
    saveActivePersona(personaId);
    setMessages([buildWelcome(personaId)]);
    saveChatHistory([]);
    setShowPersonaPicker(false);
    setError(null);
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError(null);

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    const historyMessages = messages.filter((m) => m.id !== 'welcome');
    const newHistory = [...historyMessages, userMsg];
    setMessages([buildWelcome(activePersonaId), ...newHistory]);
    setInput('');
    setIsLoading(true);
    setStreamingContent('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          personaId: activePersonaId,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data) as { content?: string };
              if (parsed.content) {
                full += parsed.content;
                setStreamingContent(full);
              }
            } catch { /* ignore parse errors */ }
          }
        }
      }

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: full,
        timestamp: new Date().toISOString(),
        personaId: activePersonaId,
      };
      const updated = [...newHistory, assistantMsg];
      setMessages([buildWelcome(activePersonaId), ...updated]);
      saveChatHistory(updated);
      setStreamingContent('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(msg);
      setStreamingContent('');
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, activePersonaId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearHistory = () => {
    setMessages([buildWelcome(activePersonaId)]);
    saveChatHistory([]);
    setError(null);
  };

  const activePersona = MENTOR_PERSONAS.find((p) => p.id === activePersonaId)!;
  const hasConversation = messages.filter((m) => m.id !== 'welcome').length > 0;
  const suggestedPrompts = PERSONA_SUGGESTED_PROMPTS[activePersonaId] ?? [];

  return (
    <div className="min-h-screen bg-[#060d1b] flex flex-col">
      <Navigation />

      <div className="flex-1 max-w-3xl mx-auto w-full pt-20 flex flex-col">
        {/* Header */}
        <div className="px-4 py-4 border-b border-white/6 flex items-center justify-between gap-3">
          <button
            onClick={() => setShowPersonaPicker((v) => !v)}
            className="flex items-center gap-3 group"
          >
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg flex-shrink-0 bg-gradient-to-br', activePersona.gradient)}>
              {activePersona.avatar}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">{activePersona.name}</span>
                <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform', showPersonaPicker && 'rotate-180')} />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-500">{activePersona.style}</span>
              </div>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs hidden sm:flex">
              <Sparkles className="w-3 h-3 mr-1" />
              GPT-4o mini
            </Badge>
            {hasConversation && (
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
          </div>
        </div>

        {/* Persona Picker Dropdown */}
        {showPersonaPicker && (
          <div className="mx-4 mt-2 rounded-2xl border border-white/10 bg-[#0c1628] shadow-2xl overflow-hidden z-10">
            {MENTOR_PERSONAS.map((persona) => (
              <button
                key={persona.id}
                onClick={() => switchPersona(persona.id)}
                className={cn(
                  'w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0',
                  activePersonaId === persona.id && 'bg-white/5'
                )}
              >
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-gradient-to-br', persona.gradient)}>
                  {persona.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{persona.name}</span>
                    <span className="text-xs text-slate-500">{persona.title}</span>
                    {activePersonaId === persona.id && <Badge variant="success" className="text-[10px] py-0 px-2 ml-auto">Active</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-1">{persona.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 min-h-0">
          {!isLoaded && (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
            </div>
          )}

          {isLoaded && messages.map((msg) => (
            <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
              <div className={cn(
                'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 text-base',
                msg.role === 'assistant'
                  ? `bg-gradient-to-br ${activePersona.gradient} shadow-md`
                  : 'bg-white/10 border border-white/10'
              )}>
                {msg.role === 'assistant' ? activePersona.avatar : <User className="w-4 h-4 text-slate-300" />}
              </div>
              <div className={cn(
                'max-w-[85%] rounded-2xl p-4',
                msg.role === 'assistant'
                  ? 'bg-white/5 border border-white/8 rounded-tl-sm'
                  : 'bg-blue-600/20 border border-blue-500/20 rounded-tr-sm'
              )}>
                <ul className="list-none space-y-0.5">{formatContent(msg.content)}</ul>
                <span className="text-xs text-slate-600 mt-2 block">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {/* Streaming message */}
          {isLoading && streamingContent && (
            <div className="flex gap-3">
              <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-base bg-gradient-to-br', activePersona.gradient)}>
                {activePersona.avatar}
              </div>
              <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                <ul className="list-none space-y-0.5">{formatContent(streamingContent)}</ul>
                <span className="inline-block w-0.5 h-4 bg-blue-400 animate-pulse ml-0.5 align-middle" />
              </div>
            </div>
          )}

          {/* Typing indicator (no content yet) */}
          {isLoading && !streamingContent && (
            <div className="flex gap-3">
              <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-base bg-gradient-to-br', activePersona.gradient)}>
                {activePersona.avatar}
              </div>
              <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl border border-rose-500/20 bg-rose-500/8 text-sm text-rose-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
              <button onClick={() => setError(null)} className="ml-auto text-xs text-rose-400 hover:text-rose-200">Dismiss</button>
            </div>
          )}

          {/* Suggested prompts */}
          {isLoaded && !hasConversation && (
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lightbulb className="w-3.5 h-3.5" />
                Suggested questions for {activePersona.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.slice(0, 6).map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="text-xs px-3 py-2 rounded-xl border border-white/10 bg-white/4 text-slate-300 hover:bg-white/8 hover:border-white/16 hover:text-white transition-all duration-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-4 border-t border-white/6">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask ${activePersona.name} anything about Product Discovery...`}
                rows={2}
                className="resize-none pr-12 min-h-[52px] max-h-[160px]"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              size="icon"
              variant="gradient"
              className="h-[52px] w-[52px] flex-shrink-0 rounded-xl"
            >
              {isLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-slate-600 mt-2 text-center">
            Enter to send · Shift+Enter for new line · Switch personas to change teaching style
          </p>
        </div>
      </div>
    </div>
  );
}
