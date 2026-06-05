'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Target,
  Clock,
  User,
  Sparkles,
  Zap,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { saveUserProfile } from '@/lib/storage';
import type { UserProfile, ExperienceLevel } from '@/types';

const STEPS = ['Your Profile', 'Experience Level', 'Learning Goals', 'Time Available'];

const EXPERIENCE_OPTIONS: { value: ExperienceLevel; label: string; description: string; icon: string }[] = [
  {
    value: 'beginner',
    label: 'Beginner',
    description: "I'm new to Product Management or just starting to learn about Discovery.",
    icon: '🌱',
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    description: "I've read some PM books and understand the basics but want to practice more.",
    icon: '🌿',
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description: 'I work in product and want to sharpen specific Discovery skills.',
    icon: '🌳',
  },
];

const GOAL_OPTIONS = [
  {
    value: 'get_first_pm_job',
    label: 'Land my first PM job',
    icon: Target,
    description: 'Building a foundation for PM interviews',
  },
  {
    value: 'improve_discovery',
    label: 'Improve my Discovery skills',
    icon: TrendingUp,
    description: 'Already a PM, leveling up',
  },
  {
    value: 'transition_to_pm',
    label: 'Transition to Product',
    icon: Users,
    description: 'Coming from eng, design, or business',
  },
  {
    value: 'build_product',
    label: 'Build my own product',
    icon: Zap,
    description: 'Founder or indie builder',
  },
];

const TIME_OPTIONS = [
  { value: 2, label: '2 hrs/week', description: 'Casual learner' },
  { value: 5, label: '5 hrs/week', description: 'Committed learner' },
  { value: 10, label: '10 hrs/week', description: 'Fast tracker' },
  { value: 15, label: '15+ hrs/week', description: 'Intensive mode' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | null>(null);
  const [goal, setGoal] = useState('');
  const [weeklyTime, setWeeklyTime] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canProceed = [
    name.trim().length > 1,
    !!experienceLevel,
    !!goal,
    !!weeklyTime,
  ][step];

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    if (!experienceLevel || !goal || !weeklyTime) return;
    setIsSubmitting(true);

    const profile: UserProfile = {
      name: name.trim(),
      experienceLevel,
      weeklyTime,
      goal,
      createdAt: new Date().toISOString(),
    };

    await new Promise((r) => setTimeout(r, 1200));
    saveUserProfile(profile);
    router.push('/roadmap');
  };

  return (
    <div className="min-h-screen bg-[#060d1b] flex flex-col items-center justify-center px-4 py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/6 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white">
            Discovery<span className="text-blue-400">OS</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300',
                    i < step
                      ? 'bg-blue-500 text-white'
                      : i === step
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        : 'bg-white/5 text-slate-600 border border-white/8'
                  )}
                >
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'h-px flex-1 transition-all duration-300',
                      i < step ? 'bg-blue-500' : 'bg-white/8'
                    )}
                    style={{ width: '40px' }}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center">
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/8 bg-white/3 backdrop-blur-sm p-8 shadow-2xl">
          {/* Step 0: Name */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-5">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome to DiscoveryOS
                </h2>
                <p className="text-slate-400">
                  Let&apos;s personalize your learning experience. First, what should we call you?
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Your name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && canProceed && handleNext()}
                  className="text-base h-12"
                />
              </div>
            </div>
          )}

          {/* Step 1: Experience */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center mb-5">
                  <TrendingUp className="w-6 h-6 text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {name ? `Hi ${name}! ` : ''}What&apos;s your PM experience level?
                </h2>
                <p className="text-slate-400">
                  This helps us tailor the depth and pace of your learning.
                </p>
              </div>
              <div className="space-y-3">
                {EXPERIENCE_OPTIONS.map(({ value, label, description, icon }) => (
                  <button
                    key={value}
                    onClick={() => setExperienceLevel(value)}
                    className={cn(
                      'w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200',
                      experienceLevel === value
                        ? 'border-blue-500/50 bg-blue-500/10 ring-1 ring-blue-500/30'
                        : 'border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/14'
                    )}
                  >
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">{label}</span>
                        {experienceLevel === value && (
                          <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Goal */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  What&apos;s your primary learning goal?
                </h2>
                <p className="text-slate-400">
                  Your roadmap will be customized to match your objective.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {GOAL_OPTIONS.map(({ value, label, icon: Icon, description }) => (
                  <button
                    key={value}
                    onClick={() => setGoal(value)}
                    className={cn(
                      'flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all duration-200',
                      goal === value
                        ? 'border-emerald-500/50 bg-emerald-500/10 ring-1 ring-emerald-500/30'
                        : 'border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/14'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center',
                      goal === value ? 'bg-emerald-500/20' : 'bg-white/5'
                    )}>
                      <Icon className={cn('w-4 h-4', goal === value ? 'text-emerald-400' : 'text-slate-400')} />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Time */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mb-5">
                  <Clock className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  How much time can you commit weekly?
                </h2>
                <p className="text-slate-400">
                  Be realistic — consistent daily learning beats occasional sprints.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {TIME_OPTIONS.map(({ value, label, description }) => (
                  <button
                    key={value}
                    onClick={() => setWeeklyTime(value)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-1 p-5 rounded-xl border transition-all duration-200',
                      weeklyTime === value
                        ? 'border-amber-500/50 bg-amber-500/10 ring-1 ring-amber-500/30'
                        : 'border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/14'
                    )}
                  >
                    <span className={cn(
                      'font-bold text-lg',
                      weeklyTime === value ? 'text-amber-400' : 'text-white'
                    )}>
                      {label}
                    </span>
                    <span className="text-xs text-slate-500">{description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 mt-8">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <Button
              className="flex-1"
              variant={step === STEPS.length - 1 ? 'gradient' : 'default'}
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Building your roadmap...
                </>
              ) : step === STEPS.length - 1 ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate My Roadmap
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Skip */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/roadmap')}
            className="text-sm text-slate-600 hover:text-slate-400 transition-colors"
          >
            Skip personalization →
          </button>
        </div>
      </div>
    </div>
  );
}
