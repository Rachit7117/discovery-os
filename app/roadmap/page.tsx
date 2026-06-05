'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Lock,
  Play,
  ArrowRight,
  Flame,
  Star,
  BarChart3,
  BookOpen,
  MessageCircle,
  Trophy,
  Sparkles,
  Clock,
  Target,
  TrendingUp,
} from 'lucide-react';
import { Navigation } from '@/components/shared/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getUserProfile, getUserProgress, getAssessmentResult } from '@/lib/storage';
import { MODULES, getAllLessons } from '@/lib/lesson-data';
import { getMaturityLabel } from '@/lib/assessment-data';
import type { UserProfile, UserProgress, AssessmentResult } from '@/types';

const MATURITY_CONFIG = {
  beginner: {
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    emoji: '🌱',
    focus: 'Foundational Content',
    desc: 'Your path focuses on building strong foundations: customer research, interview techniques, and the core frameworks every PM needs.',
  },
  intermediate: {
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    emoji: '📈',
    focus: 'Practical Frameworks',
    desc: 'Your path focuses on applying frameworks in practice — running real interviews, building OSTs, and designing lean experiments.',
  },
  advanced: {
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    emoji: '🚀',
    focus: 'Case Studies & Strategy',
    desc: 'Your path covers advanced strategy, nuanced discovery challenges, and in-depth case studies from top-tier tech companies.',
  },
};

function SkeletonRow() {
  return (
    <div className="rounded-2xl border border-white/6 bg-white/2 p-6 animate-pulse">
      <div className="flex gap-5">
        <div className="w-14 h-14 rounded-2xl bg-white/8 flex-shrink-0" />
        <div className="flex-1">
          <div className="h-4 w-24 rounded bg-white/8 mb-2" />
          <div className="h-5 w-48 rounded bg-white/8 mb-2" />
          <div className="h-3 w-64 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProfile(getUserProfile());
    setProgress(getUserProgress());
    setAssessment(getAssessmentResult());
    setIsLoaded(true);
  }, []);

  const allLessons = getAllLessons();
  const completedCount = progress?.completedLessons.length ?? 0;
  const totalLessons = allLessons.length;
  const completionPct = Math.round((completedCount / totalLessons) * 100);
  const maturityConfig = assessment ? MATURITY_CONFIG[assessment.maturityLevel] : null;

  const getLessonStatus = (lessonId: string) => {
    if (progress?.completedLessons.includes(lessonId)) return 'completed';
    const lessonIndex = allLessons.findIndex((l) => l.id === lessonId);
    if (lessonIndex === 0) return 'available';
    const previousLesson = allLessons[lessonIndex - 1];
    if (progress?.completedLessons.includes(previousLesson.id)) return 'available';
    return 'locked';
  };

  return (
    <div className="min-h-screen bg-[#060d1b]">
      <Navigation />
      <div className="max-w-5xl mx-auto pt-24 pb-20 px-4">

        {/* Header */}
        <div className="mb-8">
          {isLoaded && profile ? (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                {profile.name[0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-slate-400">Welcome back,</p>
                <p className="font-semibold text-white">{profile.name}</p>
              </div>
              {assessment && (
                <Badge variant="secondary" className={cn('ml-auto', maturityConfig?.color)}>
                  {maturityConfig?.emoji} {getMaturityLabel(assessment.maturityLevel)}
                </Badge>
              )}
            </div>
          ) : null}
          <h1 className="text-3xl font-bold text-white mb-2">Your Learning Roadmap</h1>
          <p className="text-slate-400">6 weeks to master Product Discovery — one module at a time.</p>
        </div>

        {/* Personalised path banner */}
        {isLoaded && assessment && maturityConfig && (
          <div className={cn('rounded-2xl border p-5 mb-8 flex items-start gap-4', maturityConfig.bg)}>
            <div className="text-2xl">{maturityConfig.emoji}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={cn('font-semibold text-sm', maturityConfig.color)}>Personalised Path: {maturityConfig.focus}</span>
                <Badge variant="secondary" className="text-xs">Score: {assessment.score}/100</Badge>
              </div>
              <p className="text-sm text-slate-400">{maturityConfig.desc}</p>
            </div>
            <Link href="/assessment" className="flex-shrink-0 ml-auto">
              <Button size="sm" variant="ghost" className="text-xs">
                <Target className="w-3.5 h-3.5" />
                Retake
              </Button>
            </Link>
          </div>
        )}

        {!isLoaded && (
          <div className="rounded-2xl border border-white/6 bg-white/2 p-5 mb-8 animate-pulse h-24" />
        )}

        {isLoaded && !assessment && (
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 mb-8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm mb-0.5">Discover your level</div>
              <p className="text-xs text-slate-400">Take the 10-question assessment to get a personalised learning path tailored to your Discovery maturity.</p>
            </div>
            <Link href="/assessment" className="flex-shrink-0">
              <Button size="sm" variant="default">
                Take Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {!isLoaded ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/8 bg-white/3 p-4 animate-pulse">
                <div className="w-9 h-9 rounded-xl bg-white/8 mb-3" />
                <div className="h-6 w-16 rounded bg-white/8 mb-1" />
                <div className="h-3 w-20 rounded bg-white/5" />
              </div>
            ))
          ) : (
            [
              { icon: BookOpen, label: 'Completed', value: `${completedCount}/${totalLessons}`, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              { icon: TrendingUp, label: 'Progress', value: `${completionPct}%`, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
              { icon: Flame, label: 'Streak', value: `${progress?.streak ?? 0} days`, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
              { icon: Star, label: 'Points', value: `${progress?.totalPoints ?? 0}`, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="rounded-2xl border border-white/8 bg-white/3 p-4">
                <div className={cn('w-9 h-9 rounded-xl border flex items-center justify-center mb-3', bg)}>
                  <Icon className={cn('w-4 h-4', color)} />
                </div>
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))
          )}
        </div>

        {/* Overall Progress */}
        {isLoaded && completedCount > 0 && (
          <div className="rounded-2xl border border-white/8 bg-white/3 p-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-300">Overall Progress</span>
              <span className="text-sm font-bold text-white">{completionPct}%</span>
            </div>
            <Progress value={completionPct} className="h-2.5" />
            {completionPct === 100 && (
              <div className="flex items-center gap-2 mt-3 text-sm text-emerald-400">
                <Trophy className="w-4 h-4" />
                <span className="font-medium">Course complete! You&apos;re a Discovery pro.</span>
              </div>
            )}
          </div>
        )}

        {/* Modules */}
        <div className="space-y-5">
          {!isLoaded ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          ) : (
            MODULES.map((module, moduleIndex) => {
              const lessonId = module.lessons[0];
              const status = getLessonStatus(lessonId);
              const isCompleted = status === 'completed';
              const isLocked = status === 'locked';
              const isAvailable = status === 'available';

              return (
                <div
                  key={module.id}
                  className={cn(
                    'relative rounded-2xl border transition-all duration-300 overflow-hidden',
                    isCompleted && 'border-emerald-500/30 bg-emerald-500/5',
                    isAvailable && 'border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/8 hover:border-blue-500/40',
                    isLocked && 'border-white/6 bg-white/2 opacity-60'
                  )}
                >
                  {isAvailable && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-l-2xl" />}
                  {isCompleted && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-l-2xl" />}

                  <div className="p-6 pl-8">
                    <div className="flex items-start gap-5">
                      <div className={cn(
                        'w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border',
                        isCompleted && 'bg-emerald-500/15 border-emerald-500/20',
                        isAvailable && 'bg-blue-500/15 border-blue-500/20',
                        isLocked && 'bg-white/5 border-white/8'
                      )}>
                        {isCompleted ? '✅' : isLocked ? '🔒' : module.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <Badge variant="secondary" className="text-xs">Week {module.week}</Badge>
                          {isCompleted && (
                            <Badge variant="success">
                              <CheckCircle2 className="w-3 h-3 mr-1" />Completed
                            </Badge>
                          )}
                          {isAvailable && moduleIndex === completedCount && (
                            <Badge variant="default">
                              <Sparkles className="w-3 h-3 mr-1" />Up next
                            </Badge>
                          )}
                          {isLocked && <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />Locked</Badge>}
                          {assessment && (
                            <Badge
                              variant="secondary"
                              className={cn('text-xs ml-auto', maturityConfig?.color)}
                            >
                              {module.level === assessment.maturityLevel ? '⭐ Your level' : module.level}
                            </Badge>
                          )}
                        </div>

                        <h3 className={cn('text-lg font-semibold mb-1', isLocked ? 'text-slate-500' : 'text-white')}>
                          {module.title}
                        </h3>
                        <p className={cn('text-sm mb-4 leading-relaxed', isLocked ? 'text-slate-600' : 'text-slate-400')}>
                          {module.description}
                        </p>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Clock className="w-3.5 h-3.5" /><span>20–30 min</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <BookOpen className="w-3.5 h-3.5" /><span>5 sections</span>
                          </div>
                          {isCompleted && progress?.quizScores[lessonId] !== undefined && (
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                              <BarChart3 className="w-3.5 h-3.5" /><span>Quiz: {progress.quizScores[lessonId]}%</span>
                            </div>
                          )}
                        </div>

                        {!isLocked && (
                          <Link href={`/lesson/${lessonId}`}>
                            <Button
                              size="sm"
                              variant={isCompleted ? 'outline' : 'default'}
                              className={cn(isAvailable && 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20')}
                            >
                              {isCompleted ? (
                                <><BookOpen className="w-4 h-4" />Review Lesson</>
                              ) : (
                                <><Play className="w-4 h-4" />Start Lesson<ArrowRight className="w-4 h-4" /></>
                              )}
                            </Button>
                          </Link>
                        )}
                        {isLocked && (
                          <div className="text-xs text-slate-600 flex items-center gap-1.5">
                            <Lock className="w-3 h-3" />Complete previous lesson to unlock
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Mentor CTA */}
        <div className="mt-10 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-violet-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">Have questions? Ask your AI Mentor</h3>
              <p className="text-sm text-slate-400">Choose from Teresa Torres, Marty Cagan, or a Startup Founder — each with a unique teaching style.</p>
            </div>
            <Link href="/mentor" className="flex-shrink-0">
              <Button variant="outline" size="sm">
                Open Mentor<ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
