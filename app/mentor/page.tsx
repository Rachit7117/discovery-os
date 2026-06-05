'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Send,
  BookOpen,
  Sparkles,
  MessageCircle,
  RotateCcw,
  Bot,
  User,
  Lightbulb,
} from 'lucide-react';
import { Navigation } from '@/components/shared/Navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getChatHistory, saveChatHistory } from '@/lib/storage';
import { getMockAIResponse, generateId, SUGGESTED_PROMPTS } from '@/lib/mock-ai';
import type { ChatMessage } from '@/types';

function formatContent(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={i} className="font-semibold text-white text-sm mt-3 mb-1">
          {line.slice(2, -2)}
        </p>
      );
    }
    if (line.startsWith('- ') || line.startsWith('• ')) {
      const content = line.slice(2);
      const parts = content.split('**');
      return (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-300 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
          <span>
            {parts.map((p, j) =>
              j % 2 === 1 ? (
                <strong key={j} className="text-white font-semibold">{p}</strong>
              ) : p
            )}
          </span>
        </li>
      );
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;

    const parts = line.split('**');
    return (
      <p key={i} className="text-sm text-slate-300 leading-relaxed">
        {parts.map((p, j) =>
          j % 2 === 1 ? (
            <strong key={j} className="text-white font-semibold">{p}</strong>
          ) : p
        )}
      </p>
    );
  });
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `👋 Hi! I'm your AI Product Discovery Mentor.

I'm here to help you understand any concept from your curriculum — or answer any Product Management question you have.

**What I can help with:**
- Customer discovery and interviews (The Mom Test)
- Jobs To Be Done framework
- Opportunity Solution Trees
- Experiment design and lean validation
- Discovery metrics and North Star metrics
- Career advice for aspiring PMs

Ask me anything — or pick one of the suggested questions below to get started.`,
  timestamp: new Date().toISOString(),
};

export default function MentorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history on mount
  useEffect(() => {
    const history = getChatHistory();
    if (history.length > 0) {
      setMessages([WELCOME_MESSAGE, ...history]);
    }
    setIsLoaded(true);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages.filter(m => m.id !== 'welcome'), userMsg];
    setMessages([WELCOME_MESSAGE, ...newMessages]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getMockAIResponse(text, newMessages);
      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      const updatedMessages = [...newMessages, assistantMsg];
      setMessages([WELCOME_MESSAGE, ...updatedMessages]);
      saveChatHistory(updatedMessages);
    } catch {
      const errorMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: "I'm having trouble responding right now. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearHistory = () => {
    setMessages([WELCOME_MESSAGE]);
    saveChatHistory([]);
  };

  const hasConversation = messages.filter((m) => m.id !== 'welcome').length > 0;

  return (
    <div className="min-h-screen bg-[#060d1b] flex flex-col">
      <Navigation />

      <div className="flex-1 max-w-3xl mx-auto w-full pt-20 flex flex-col">
        {/* Header */}
        <div className="px-4 py-5 border-b border-white/6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-sm">AI Discovery Mentor</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-500">Always available</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs hidden sm:flex">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
            {hasConversation && (
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 min-h-0">
          {!isLoaded && (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
            </div>
          )}

          {isLoaded && messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex gap-3',
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {/* Avatar */}
              <div className={cn(
                'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5',
                msg.role === 'assistant'
                  ? 'bg-gradient-to-br from-blue-500 to-violet-500 shadow-md shadow-blue-500/20'
                  : 'bg-white/10 border border-white/10'
              )}>
                {msg.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-slate-300" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={cn(
                  'max-w-[85%] rounded-2xl p-4',
                  msg.role === 'assistant'
                    ? 'bg-white/5 border border-white/8 rounded-tl-sm'
                    : 'bg-blue-600/20 border border-blue-500/20 rounded-tr-sm'
                )}
              >
                <ul className="list-none space-y-0.5">
                  {formatContent(msg.content)}
                </ul>
                <span className="text-xs text-slate-600 mt-2 block">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {/* Suggested prompts — shown after welcome */}
          {isLoaded && !hasConversation && (
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lightbulb className="w-3.5 h-3.5" />
                Suggested questions
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.slice(0, 6).map((prompt) => (
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
                placeholder="Ask about Product Discovery, JTBD, customer interviews..."
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
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
