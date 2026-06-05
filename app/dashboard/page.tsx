'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Target,
  BookOpen,
  Trophy,
  Flame,
  Clock,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Star,
} from 'lucide-react';
import { Navigation } from '@/components/shared/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getUserProgress, getUserProfile, getAssessmentResult } from '@/lib/storage';
import { getAllLessons } from '@/lib/lesson-data';
import { getMaturityLabel, TOPIC_LABELS } from '@/lib/assessment-data';
import type { UserProgress, UserProfile, AssessmentResult } from '@/types';

const MATURITY_CONFIG = {
  beginner: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', gradient: 'from-amber-500 to-orange-500', emoji: '🌱' },
  intermediate: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', gradient: 'from-blue-500 to-cyan-500', emoji: '📈' },
  advanced: { color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20', gradient: 'from-violet-500 to-purple-500', emoji: '🚀' },
};

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-5 animate-pulse">
      <div className="w-9 h-9 rounded-xl bg-white/8 mb-4" />
      <div className="h-7 w-16 rounded bg-white/8 mb-1" />
      <div className="h-3 w-20 rounded bg-white/5" />
    </div>
  );
}

export default function DashboardPage() {
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
  const totalLessons = allLessons.length;
  const completedCount = progress?.completedLessons.length ?? 0;
  const completionPct = Math.round((completedCount / totalLessons) * 100);

  const avgQuizScore = progress && Object.keys(progress.quizScores).length > 0
    ? Math.round(Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / Object.values(progress.quizScores).length)
    : null;

  const maturityConfig = assessment ? MATURITY_CONFIG[assessment.maturityLevel] : null;

  const recentLessons = allLessons
    .filter((l) => progress?.completedLessons.includes(l.id))
    .slice(-3)
    .reverse();

  const STATS = [
    {
      icon: Target,
      label: 'Discovery Score',
      value: assessment ? `${assessment.score}` : '—',
      sub: assessment ? getMaturityLabel(assessment.maturityLevel) : 'Take assessment',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10 border-violet-500/20',
      href: assessment ? undefined : '/assessment',
    },
    {
      icon: BookOpen,
      label: 'Lessons Completed',
      value: `${completedCount}/${totalLessons}`,
      sub: `${completionPct}% complete`,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: BarChart3,
      label: 'Quiz Accuracy',
      value: avgQuizScore !== null ? `${avgQuizScore}%` : '—',
      sub: avgQuizScore !== null ? 'Average score' : 'Complete a quiz',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${progress?.streak ?? 0}`,
      sub: progress?.streak === 1 ? 'day' : 'days',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Clock,
      label: 'Learning Time',
      value: progress?.totalStudyMinutes ? `${progress.totalStudyMinutes}m` : '—',
      sub: 'Total study time',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
    {
      icon: Star,
      label: 'Points Earned',
      value: `${progress?.totalPoints ?? 0}`,
      sub: 'Total XP',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-[#060d1b]">
      <Navigation />
      <div className="max-w-5xl mx-auto pt-24 pb-20 px-4">

        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            {isLoaded && profile ? (
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                  {profile.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-slate-500">Welcome back</p>
                  <p className="font-semibold text-white">{profile.name}</p>
                </div>
              </div>
            ) : null}
            <h1 className="text-3xl font-bold text-white">Learning Dashboard</h1>
            <p className="text-slate-400 mt-1">Track your Product Discovery journey.</p>
          </div>
          {!assessment && (
            <Link href="/assessment" className="flex-shrink-0">
              <Button size="sm" variant="gradient">
                <Target className="w-4 h-4" />
                Take Assessment
              </Button>
            </Link>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {!isLoaded ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            STATS.map(({ icon: Icon, label, value, sub, color, bg, href }) => (
              <div
                key={label}
                className={cn(
                  'rounded-2xl border bg-white/3 p-5 transition-all duration-200',
                  href ? 'hover:bg-white/5 cursor-pointer' : '',
                  bg
                )}
                onClick={() => href && (window.location.href = href)}
              >
                <div className={cn('w-9 h-9 rounded-xl border flex items-center justify-center mb-4', bg)}>
                  <Icon className={cn('w-4.5 h-4.5', color)} style={{ width: '1.125rem', height: '1.125rem' }} />
                </div>
                <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
                <div className="text-xs text-slate-500">{label}</div>
                <div className={cn('text-xs mt-0.5', href ? color : 'text-slate-600')}>{sub}</div>
              </div>
            ))
          )}
        </div>

        {/* Progress bar */}
        {isLoaded && completedCount > 0 && (
          <div className="rounded-2xl border border-white/8 bg-white/3 p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Overall Progress</span>
              </div>
              <span className="text-sm font-bold text-white">{completionPct}%</span>
            </div>
            <Progress value={completionPct} className="h-2.5 mb-3" />
            {completionPct === 100 ? (
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <Trophy className="w-4 h-4" />
                Course complete — you&apos;re a Discovery pro!
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                {totalLessons - completedCount} lesson{totalLessons - completedCount !== 1 ? 's' : ''} remaining
              </p>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Assessment result */}
          {isLoaded && assessment && maturityConfig && (
            <div className={cn('rounded-2xl border p-6', maturityConfig.bg)}>
              <div className="flex items-center gap-3 mb-5">
                <div className={cn('w-10 h-10 rounded-xl border flex items-center justify-center text-xl', maturityConfig.bg)}>
                  {maturityConfig.emoji}
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">Discovery Maturity</div>
                  <div className={cn('font-bold text-sm', maturityConfig.color)}>
                    {getMaturityLabel(assessment.maturityLevel)} · {assessment.score}/100
                  </div>
                </div>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {new Date(assessment.completedAt).toLocaleDateString()}
                </Badge>
              </div>

              <div className="space-y-2.5">
                {Object.entries(assessment.breakdown).map(([topic, score]) => (
                  <div key={topic}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-400">{TOPIC_LABELS[topic] ?? topic}</span>
                      <span className={cn('text-xs font-medium', score === 100 ? 'text-emerald-400' : score >= 50 ? maturityConfig.color : 'text-amber-400')}>{score}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5">
                      <div
                        className={cn('h-full rounded-full', score === 100 ? 'bg-emerald-500' : score >= 50 ? `bg-gradient-to-r ${maturityConfig.gradient}` : 'bg-amber-500')}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/8">
                <Link href="/assessment">
                  <button className={cn('text-xs font-medium transition-colors', maturityConfig.color, 'hover:opacity-80')}>
                    Retake assessment →
                  </button>
                </Link>
              </div>
            </div>
          )}

          {!isLoaded ? (
            <div className="rounded-2xl border border-white/8 bg-white/3 p-6 animate-pulse">
              <div className="h-5 w-32 rounded bg-white/8 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <div key={i} className="h-12 rounded-xl bg-white/5" />)}
              </div>
            </div>
          ) : recentLessons.length > 0 ? (
            <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-white">Recently Completed</span>
              </div>
              <div className="space-y-3">
                {recentLessons.map((lesson) => {
                  const score = progress?.quizScores[lesson.id];
                  return (
                    <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-xl border border-white/6 hover:bg-white/5 hover:border-white/12 transition-all group">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-base flex-shrink-0">
                          ✅
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate">{lesson.title}</div>
                          <div className="text-xs text-slate-500">Week {lesson.week}</div>
                        </div>
                        {score !== undefined && (
                          <Badge variant="success" className="text-xs flex-shrink-0">{score}%</Badge>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/8 bg-white/3 p-6 flex flex-col items-center justify-center text-center">
              <BookOpen className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-sm font-medium text-slate-400 mb-1">No lessons completed yet</p>
              <p className="text-xs text-slate-600 mb-5">Start your first lesson to see progress here</p>
              <Link href="/roadmap">
                <Button size="sm" variant="default">
                  View Roadmap
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { href: '/roadmap', icon: BookOpen, title: 'Continue Learning', desc: 'Pick up where you left off', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            { href: '/mentor', icon: Sparkles, title: 'Ask AI Mentor', desc: 'Get instant answers', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
            { href: '/assessment', icon: Target, title: assessment ? 'Retake Assessment' : 'Take Assessment', desc: 'Measure your progress', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
          ].map(({ href, icon: Icon, title, desc, color, bg }) => (
            <Link key={href} href={href}>
              <div className={cn('rounded-2xl border p-5 hover:opacity-90 transition-all duration-200 cursor-pointer', bg)}>
                <Icon className={cn('w-5 h-5 mb-3', color)} />
                <div className="font-semibold text-white text-sm mb-0.5">{title}</div>
                <div className="text-xs text-slate-500">{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
