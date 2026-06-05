'use client';

import Link from 'next/link';
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
  Map,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Personalized Roadmap',
    description:
      'AI generates a 6-week learning path tailored to your experience level and goals — no more guessing what to learn next.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: Brain,
    title: 'Interactive Lessons',
    description:
      'Each lesson includes concept explanation, real-world examples, hands-on exercises, reflection questions, and a quiz.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: MessageCircle,
    title: 'AI Mentor',
    description:
      'Ask any Product Discovery question and get expert guidance — available 24/7, never judgmental, always helpful.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description:
      'Track completed lessons, quiz scores, and learning streaks. See exactly how far you\'ve come and what\'s next.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
];

const CURRICULUM = [
  { week: 1, title: 'Customer Problems', icon: '🔍', desc: 'Find the right problem to solve' },
  { week: 2, title: 'Customer Interviews', icon: '🎙️', desc: 'Talk to users the right way' },
  { week: 3, title: 'Jobs To Be Done', icon: '⚙️', desc: 'Understand why customers hire products' },
  { week: 4, title: 'Opportunity Solution Trees', icon: '🌳', desc: 'Map the path from problem to solution' },
  { week: 5, title: 'Experiment Design', icon: '🧪', desc: 'Test assumptions before you build' },
  { week: 6, title: 'Discovery Metrics', icon: '📊', desc: 'Measure what moves the needle' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Associate PM at Figma',
    quote: 'The structured curriculum finally made Product Discovery click for me. The exercises are exactly what I needed to practice real skills, not just memorize theory.',
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060d1b] overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/6 bg-[#060d1b]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight">
              Discovery<span className="text-blue-400">OS</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/roadmap">
              <Button variant="ghost" size="sm">
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">Roadmap</span>
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

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-600/6 blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            AI-Powered Product Discovery Coach
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 animate-slide-up leading-[1.05]">
            Master{' '}
            <span className="text-gradient">Product Discovery</span>
            <br />in 6 weeks
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            Stop drowning in scattered content. Get a personalized AI-guided curriculum with
            interactive lessons, real exercises, and an always-on mentor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link href="/onboarding">
              <Button size="xl" variant="gradient" className="w-full sm:w-auto">
                Start Learning Free
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
          <div className="flex items-center justify-center gap-6 mt-12 text-sm text-slate-500 animate-fade-in">
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

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="violet" className="mb-4">Features</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to master Discovery
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              A complete learning system — not just another course.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, description, color, bg }) => (
              <div
                key={title}
                className="group relative rounded-2xl border border-white/8 bg-white/3 p-6 hover:bg-white/5 hover:border-white/12 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl border ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Curriculum</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              6 weeks. 6 core skills.
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              A structured sequence that builds from fundamentals to advanced techniques.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CURRICULUM.map(({ week, title, icon, desc }, index) => (
              <div
                key={week}
                className="group flex gap-4 p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/14 transition-all duration-300 cursor-default"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    {icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Week {week}</span>
                    {index === 0 && (
                      <Badge variant="success" className="text-[10px] py-0 px-2">Start here</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-white text-sm">{title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="warning" className="mb-4">Why DiscoveryOS</Badge>
              <h2 className="text-4xl font-bold text-white mb-6">
                Stop collecting content.
                <br />
                <span className="text-gradient">Start building skills.</span>
              </h2>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                Most PMs read about Discovery without practicing it. DiscoveryOS forces you to apply concepts through exercises, quizzes, and AI-guided feedback — so concepts actually stick.
              </p>
              <Link href="/onboarding">
                <Button size="lg" variant="gradient">
                  Build Your Roadmap
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {BENEFITS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors"
                >
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

      {/* Testimonials */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by aspiring PMs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, quote, avatar, stars }) => (
              <div
                key={name}
                className="p-6 rounded-2xl border border-white/8 bg-white/3 flex flex-col gap-4"
              >
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

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-blue-600/10 to-violet-600/5 p-12 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-blue-600/10 blur-[80px] pointer-events-none" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to become a great
                <br />
                <span className="text-gradient">Product Discoverer?</span>
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                Join 2,400+ learners building real PM skills. Takes 2 minutes to set up.
              </p>
              <Link href="/onboarding">
                <Button size="xl" variant="gradient" className="shadow-xl shadow-blue-600/30">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-slate-500 mt-4">Free forever. No account required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-400 text-sm">
              Discovery<span className="text-blue-400">OS</span>
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Built for aspiring Product Managers. Learn, practice, grow.
          </p>
        </div>
      </footer>
    </div>
  );
}
