'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Target,
  MessageCircle,
  BarChart3,
  CheckCircle2,
  Star,
  Zap,
  Users,
  TrendingUp,
  Brain,
  ChevronDown,
  Github,
  Linkedin,
  Map,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ─── Data ──────────────────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Take the Assessment',
    desc: '10 questions to measure your Product Discovery maturity across 7 core topics.',
    icon: Target,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    step: '02',
    title: 'Get Your Personalised Path',
    desc: 'Your score unlocks a tailored 6-week curriculum — beginner, intermediate, or advanced.',
    icon: Map,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    step: '03',
    title: 'Learn Through Doing',
    desc: 'Each lesson includes concepts, real examples, hands-on exercises, and quizzes.',
    icon: Brain,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    step: '04',
    title: 'Ask Your AI Mentor',
    desc: 'Stuck? Chat with Teresa Torres, Marty Cagan, or a Startup Founder — 24/7.',
    icon: MessageCircle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
];

const CURRICULUM = [
  { week: 1, title: 'Customer Problems', icon: '🔍', desc: 'Find the right problem to solve', level: 'Beginner' },
  { week: 2, title: 'Customer Interviews', icon: '🎙️', desc: 'Talk to users the right way', level: 'Beginner' },
  { week: 3, title: 'Jobs To Be Done', icon: '⚙️', desc: 'Understand why customers hire products', level: 'Intermediate' },
  { week: 4, title: 'Opportunity Solution Trees', icon: '🌳', desc: 'Map the path from problem to solution', level: 'Intermediate' },
  { week: 5, title: 'Experiment Design', icon: '🧪', desc: 'Test assumptions before you build', level: 'Intermediate' },
  { week: 6, title: 'Discovery Metrics', icon: '📊', desc: 'Measure what moves the needle', level: 'Advanced' },
];

const MENTORS = [
  {
    id: 'teresa',
    name: 'Teresa Torres',
    title: 'Discovery Coach',
    avatar: '🌳',
    gradient: 'from-emerald-500 to-teal-500',
    style: 'Methodical & Evidence-based',
    desc: 'Author of Continuous Discovery Habits. Expert in Opportunity Solution Trees and weekly discovery rhythms.',
    tags: ['OST Framework', 'Continuous Discovery', 'Interview Habits'],
  },
  {
    id: 'marty',
    name: 'Marty Cagan',
    title: 'Product Leadership',
    avatar: '⚡',
    gradient: 'from-blue-500 to-indigo-500',
    style: 'Direct & High-conviction',
    desc: 'Author of Inspired & Empowered, founding partner at SVPG. Opinionated about what great PM work looks like.',
    tags: ['Empowered Teams', 'Four Risks', 'Product Strategy'],
  },
  {
    id: 'founder',
    name: 'Startup Founder',
    title: 'Execution Focus',
    avatar: '🚀',
    gradient: 'from-orange-500 to-rose-500',
    style: 'Raw & Pragmatic',
    desc: 'Serial founder who\'s built and shipped products fast. Cuts through theory to what actually works in the trenches.',
    tags: ['Fast Validation', 'Customer Obsession', 'First Principles'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Associate PM at Figma',
    quote: 'The structured curriculum finally made Product Discovery click for me. The exercises are exactly what I needed to practice real skills, not just memorise theory.',
    avatar: 'SC',
    stars: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder → PM Transition',
    quote: 'I built a whole startup without doing proper discovery. DiscoveryOS taught me what I was doing wrong — the JTBD module alone was worth it.',
    avatar: 'MJ',
    stars: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'BA transitioning to Product',
    quote: 'The AI Mentor is incredible. I can ask "dumb questions" without embarrassment and get thoughtful answers at 2am when I\'m studying.',
    avatar: 'PS',
    stars: 5,
  },
];

const BENEFITS = [
  { icon: Target, text: 'Know exactly what to learn and in what order' },
  { icon: Zap, text: 'Practice with real exercises, not just reading' },
  { icon: Users, text: 'Learn from real company examples (Slack, Airbnb, Spotify)' },
  { icon: TrendingUp, text: 'Track your progress with scores and streaks' },
  { icon: MessageCircle, text: 'Get 24/7 guidance from your AI Discovery Mentor' },
  { icon: CheckCircle2, text: 'Quiz yourself to ensure real understanding' },
];

const FAQS = [
  {
    q: 'Do I need any prior PM experience?',
    a: 'No. The assessment places you at the right level — beginners start with foundational content, while experienced PMs jump straight to advanced frameworks and case studies.',
  },
  {
    q: 'How long does the course take?',
    a: 'The full 6-week curriculum takes 2–4 hours per week. You can go faster or slower — there\'s no deadline and lessons stay unlocked once completed.',
  },
  {
    q: 'Do I need an OpenAI API key?',
    a: 'You need an OpenAI API key to use the AI Mentor chat feature. All lessons, quizzes, and assessment work without one. Instructions to add your key are in the README.',
  },
  {
    q: 'Is my progress saved?',
    a: 'Yes — all progress, quiz scores, and chat history are saved locally in your browser. No account or sign-up required.',
  },
  {
    q: 'What frameworks are covered?',
    a: 'The curriculum covers Continuous Discovery Habits, The Mom Test, Jobs To Be Done, Opportunity Solution Trees, Lean Startup experiment design, and North Star metrics.',
  },
  {
    q: 'Can I switch AI Mentors?',
    a: 'Yes. You can switch between Teresa Torres, Marty Cagan, and the Startup Founder persona at any time in the mentor chat. Each has a distinct teaching style and system prompt.',
  },
];

const MATURITY_LEVELS = [
  { level: 'Beginner', range: '0–30', emoji: '🌱', desc: 'Foundations — customer research, interviews, problem definition', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  { level: 'Intermediate', range: '31–70', emoji: '📈', desc: 'Frameworks — JTBD, OST, experiment design in practice', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  { level: 'Advanced', range: '71–100', emoji: '🚀', desc: 'Strategy — case studies, advanced metrics, discovery leadership', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
];

// ─── FAQ Item ──────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/3 transition-colors"
      >
        <span className="font-medium text-white text-sm">{q}</span>
        <ChevronDown className={cn('w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/6 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060d1b] overflow-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/6 bg-[#060d1b]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight">
              Discovery<span className="text-blue-400">OS</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/assessment">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Target className="w-4 h-4" />
                Assessment
              </Button>
            </Link>
            <Link href="/roadmap">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Map className="w-4 h-4" />
                Roadmap
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button size="sm" variant="gradient">
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-4">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-600/6 blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI-Powered Product Discovery Coach
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.05]">
            Master{' '}
            <span className="text-gradient">Product Discovery</span>
            <br />in 6 weeks
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop drowning in scattered content. Get a personalised AI-guided curriculum with
            interactive lessons, real exercises, and an always-on AI mentor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/assessment">
              <Button size="xl" variant="gradient" className="w-full sm:w-auto shadow-xl shadow-blue-600/20">
                Take Free Assessment
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/roadmap">
              <Button size="xl" variant="outline" className="w-full sm:w-auto">
                View Curriculum
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-12 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['SC', 'MJ', 'PS', 'AR'].map((initials) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 border-2 border-[#060d1b] flex items-center justify-center text-xs font-bold text-white"
                  >
                    {initials[0]}
                  </div>
                ))}
              </div>
              <span>2,400+ learners</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="violet" className="mb-4">How It Works</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              From zero to Discovery pro in 4 steps
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              A structured system designed for working PMs and aspiring product managers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon, color, bg }) => (
              <div key={step} className="relative group rounded-2xl border border-white/8 bg-white/3 p-6 hover:bg-white/5 hover:border-white/12 transition-all duration-300">
                <div className="absolute -top-3 -left-1 text-5xl font-black text-white/5 select-none leading-none">{step}</div>
                <div className={cn('w-12 h-12 rounded-xl border flex items-center justify-center mb-4', bg)}>
                  <Icon className={cn('w-6 h-6', color)} />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Discovery Score / Paths ───────────────────────────────────────── */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Personalised Learning Paths</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Your roadmap adapts to your level
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              A 10-question assessment places you at the right starting point — no wasted time on content you already know.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {MATURITY_LEVELS.map(({ level, range, emoji, desc, color, bg }) => (
              <div key={level} className={cn('rounded-2xl border p-6', bg)}>
                <div className="text-3xl mb-3">{emoji}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn('font-bold text-lg', color)}>{level}</span>
                  <Badge variant="secondary" className="text-xs">{range} pts</Badge>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Curriculum grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CURRICULUM.map(({ week, title, icon, desc, level }, index) => (
              <div
                key={week}
                className="group flex gap-4 p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/14 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    {icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Week {week}</span>
                    {index === 0 && <Badge variant="success" className="text-[10px] py-0 px-2">Start here</Badge>}
                  </div>
                  <h3 className="font-semibold text-white text-sm">{title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                  <div className="mt-2">
                    <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full border',
                      level === 'Beginner' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                      level === 'Intermediate' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' :
                      'text-violet-400 bg-violet-500/10 border-violet-500/20'
                    )}>{level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mentor Showcase ───────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="warning" className="mb-4">AI Mentor Personas</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose your teaching style
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              Three distinct mentors, each powered by GPT-4o mini with a unique system prompt and perspective on Product Discovery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {MENTORS.map(({ name, title, avatar, gradient, style, desc, tags }) => (
              <div key={name} className="rounded-2xl border border-white/8 bg-white/3 p-6 hover:bg-white/5 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg bg-gradient-to-br', gradient)}>
                    {avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{name}</div>
                    <div className="text-xs text-slate-500">{title}</div>
                    <div className="text-xs text-slate-600 mt-0.5 italic">{style}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/mentor">
              <Button size="lg" variant="gradient">
                Chat with an AI Mentor
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="success" className="mb-4">Why DiscoveryOS</Badge>
              <h2 className="text-4xl font-bold text-white mb-6">
                Stop collecting content.
                <br />
                <span className="text-gradient">Start building skills.</span>
              </h2>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                Most PMs read about Discovery without practising it. DiscoveryOS forces you to apply concepts through exercises, quizzes, and AI-guided feedback — so things actually stick.
              </p>
              <Link href="/assessment">
                <Button size="lg" variant="gradient">
                  Take the Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {BENEFITS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Loved by aspiring PMs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, quote, avatar, stars }) => (
              <div key={name} className="p-6 rounded-2xl border border-white/8 bg-white/3 flex flex-col gap-4">
                <div className="flex">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/6">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                    {avatar}
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">{name}</div>
                    <div className="text-xs text-slate-500">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-blue-600/10 to-violet-600/5 p-12 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-blue-600/10 blur-[80px] pointer-events-none" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to become a great<br />
                <span className="text-gradient">Product Discoverer?</span>
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                Join 2,400+ learners building real PM skills. Takes 5 minutes to start.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/assessment">
                  <Button size="xl" variant="gradient" className="shadow-xl shadow-blue-600/30 w-full sm:w-auto">
                    Take the Assessment
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/roadmap">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto">
                    Browse Curriculum
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-slate-500 mt-4">Free forever · No account required · Local storage only</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/6 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-slate-400 text-sm">
                Discovery<span className="text-blue-400">OS</span>
              </span>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-6">
              {[
                { href: '/assessment', label: 'Assessment' },
                { href: '/roadmap', label: 'Roadmap' },
                { href: '/mentor', label: 'AI Mentor' },
                { href: '/dashboard', label: 'Dashboard' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Creator attribution */}
          <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400 text-center sm:text-left">
              Built by{' '}
              <span className="font-semibold text-white">Rachit Agarwal</span>
              {' '}as part of the{' '}
              <span className="text-blue-400 font-medium">HelloPM AI Builder Challenge</span>
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/rachit-agarwal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/3 text-xs text-slate-400 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/rachitagarwal7117"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-500/8 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/15 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
