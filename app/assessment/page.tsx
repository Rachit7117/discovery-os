'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Trophy,
  BookOpen,
  Target,
  Sparkles,
  ChevronRight,
  BarChart3,
} from 'lucide-react';
import { Navigation } from '@/components/shared/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { saveAssessmentResult } from '@/lib/storage';
import {
  ASSESSMENT_QUESTIONS,
  calculateMaturityLevel,
  getMaturityDescription,
  TOPIC_LABELS,
} from '@/lib/assessment-data';
import type { AssessmentAnswer, AssessmentResult } from '@/types';

type Phase = 'intro' | 'quiz' | 'results';

const MATURITY_CONFIG = {
  beginner: {
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    gradient: 'from-amber-500 to-orange-500',
    emoji: '🌱',
    label: 'Beginner',
    scoreRange: '0–30',
  },
  intermediate: {
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    gradient: 'from-blue-500 to-cyan-500',
    emoji: '📈',
    label: 'Intermediate',
    scoreRange: '31–70',
  },
  advanced: {
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    gradient: 'from-violet-500 to-purple-500',
    emoji: '🚀',
    label: 'Advanced',
    scoreRange: '71–100',
  },
};

export default function AssessmentPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const question = ASSESSMENT_QUESTIONS[current];
  const progress = ((current + (showExplanation ? 1 : 0)) / ASSESSMENT_QUESTIONS.length) * 100;

  const handleSelect = (optionIndex: number) => {
    if (showExplanation) return;
    setSelected(optionIndex);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const correct = selected === question.correctAnswer;
    const answer: AssessmentAnswer = {
      questionId: question.id,
      selectedOption: selected,
      correct,
      points: correct ? question.points : 0,
    };
    setAnswers((prev) => [...prev, answer]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelected(null);
    if (current + 1 >= ASSESSMENT_QUESTIONS.length) {
      finishQuiz([...answers]);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const finishQuiz = (finalAnswers: AssessmentAnswer[]) => {
    const totalPoints = finalAnswers.reduce((sum, a) => sum + a.points, 0);
    const maxPoints = ASSESSMENT_QUESTIONS.reduce((sum, q) => sum + q.points, 0);
    const score = Math.round((totalPoints / maxPoints) * 100);
    const maturityLevel = calculateMaturityLevel(score);

    // Breakdown by topic
    const breakdown: Record<string, number> = {};
    for (const q of ASSESSMENT_QUESTIONS) {
      const answer = finalAnswers.find((a) => a.questionId === q.id);
      if (!breakdown[q.topic]) breakdown[q.topic] = 0;
      if (answer?.correct) breakdown[q.topic] += 100;
    }
    // Normalize to percentage (some topics have 2 questions)
    const topicCounts: Record<string, number> = {};
    for (const q of ASSESSMENT_QUESTIONS) {
      topicCounts[q.topic] = (topicCounts[q.topic] ?? 0) + 1;
    }
    for (const topic of Object.keys(breakdown)) {
      breakdown[topic] = Math.round(breakdown[topic] / topicCounts[topic]);
    }

    const assessmentResult: AssessmentResult = {
      score,
      maturityLevel,
      answers: finalAnswers,
      completedAt: new Date().toISOString(),
      breakdown,
    };

    saveAssessmentResult(assessmentResult);
    setResult(assessmentResult);
    setPhase('results');
  };

  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#060d1b]">
        <Navigation />
        <div className="max-w-2xl mx-auto pt-24 pb-20 px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/20">
              <Target className="w-10 h-10 text-white" />
            </div>
            <Badge className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Discovery Maturity Assessment
            </Badge>
            <h1 className="text-4xl font-bold text-white mb-4">
              Find your Discovery level
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              10 questions covering the core frameworks of Product Discovery.
              We&apos;ll calculate your maturity score and generate a personalised learning path.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {[
              { icon: BookOpen, title: '10 multiple-choice questions', desc: 'Covering Customer Discovery, JTBD, OST, Experiment Design, and more', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              { icon: BarChart3, title: 'Discovery Maturity Score', desc: 'Get rated as Beginner (0–30), Intermediate (31–70), or Advanced (71–100)', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
              { icon: Sparkles, title: 'Personalised Learning Path', desc: 'Your roadmap adapts based on your score — foundations, frameworks, or strategy', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className={cn('flex gap-4 p-5 rounded-2xl border', bg)}>
                <div className={cn('w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0', bg)}>
                  <Icon className={cn('w-5 h-5', color)} />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm mb-0.5">{title}</div>
                  <div className="text-sm text-slate-400">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="xl" variant="gradient" onClick={() => setPhase('quiz')} className="w-full sm:w-auto">
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-sm text-slate-500 mt-3">Takes ~5 minutes · No sign-up required</p>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'results' && result) {
    const config = MATURITY_CONFIG[result.maturityLevel];
    const correctCount = result.answers.filter((a) => a.correct).length;

    return (
      <div className="min-h-screen bg-[#060d1b]">
        <Navigation />
        <div className="max-w-2xl mx-auto pt-24 pb-20 px-4">
          {/* Score card */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 text-center mb-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className={cn('absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[100px] opacity-20', `bg-gradient-to-br ${config.gradient}`)} />
            </div>
            <div className="relative">
              <div className="text-6xl mb-4">{config.emoji}</div>
              <div className={cn('text-7xl font-black mb-2', config.color)}>{result.score}</div>
              <div className="text-slate-400 text-sm mb-4">out of 100</div>
              <div className={cn('inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-semibold mb-4', config.bg, config.color)}>
                <Trophy className="w-4 h-4" />
                {config.label} Discovery Practitioner
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
                {getMaturityDescription(result.maturityLevel)}
              </p>
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{correctCount}/{ASSESSMENT_QUESTIONS.length}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Correct answers</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className={cn('text-2xl font-bold', config.color)}>{config.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Maturity level</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{config.scoreRange}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Score range</div>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown by topic */}
          <div className="rounded-2xl border border-white/8 bg-white/3 p-6 mb-8">
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-400" />
              Topic Breakdown
            </h3>
            <div className="space-y-4">
              {Object.entries(result.breakdown).map(([topic, score]) => (
                <div key={topic}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-300">{TOPIC_LABELS[topic] ?? topic}</span>
                    <span className={cn('text-sm font-semibold', score === 100 ? 'text-emerald-400' : score >= 50 ? 'text-blue-400' : 'text-amber-400')}>{score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all duration-1000', score === 100 ? 'bg-emerald-500' : score >= 50 ? 'bg-blue-500' : 'bg-amber-500')}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Link href="/roadmap" className="block">
              <Button size="lg" variant="gradient" className="w-full">
                View My Personalised Roadmap
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/mentor" className="block">
              <Button size="lg" variant="outline" className="w-full">
                Chat with an AI Mentor
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            <button
              onClick={() => { setPhase('intro'); setCurrent(0); setAnswers([]); setSelected(null); setShowExplanation(false); }}
              className="w-full text-sm text-slate-500 hover:text-slate-300 transition-colors py-2"
            >
              Retake assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz phase
  return (
    <div className="min-h-screen bg-[#060d1b]">
      <Navigation />
      <div className="max-w-2xl mx-auto pt-24 pb-20 px-4">
        {/* Progress header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => { if (current === 0) setPhase('intro'); else { setCurrent((c) => c - 1); setAnswers((a) => a.slice(0, -1)); setSelected(null); setShowExplanation(false); } }}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-sm text-slate-500 font-medium">
              {current + 1} / {ASSESSMENT_QUESTIONS.length}
            </span>
            <Badge variant="secondary" className="text-xs">
              {question.topicLabel}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question card */}
        <div className="rounded-2xl border border-white/8 bg-white/3 p-7 mb-6">
          <h2 className="text-xl font-semibold text-white leading-snug mb-7">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              const isSelected = selected === i;
              const isCorrect = i === question.correctAnswer;
              const showResult = showExplanation;

              let optionClass = 'border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 cursor-pointer';
              if (showResult) {
                if (isCorrect) optionClass = 'border-emerald-500/40 bg-emerald-500/10 cursor-default';
                else if (isSelected && !isCorrect) optionClass = 'border-rose-500/40 bg-rose-500/10 cursor-default';
                else optionClass = 'border-white/6 bg-white/2 opacity-50 cursor-default';
              } else if (isSelected) {
                optionClass = 'border-blue-500/40 bg-blue-500/10 cursor-pointer';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showExplanation}
                  className={cn(
                    'w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center gap-4',
                    optionClass
                  )}
                >
                  <div className={cn(
                    'w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0',
                    showResult && isCorrect ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' :
                    showResult && isSelected && !isCorrect ? 'border-rose-500 bg-rose-500/20 text-rose-400' :
                    isSelected ? 'border-blue-400 bg-blue-500/20 text-blue-400' :
                    'border-white/20 text-slate-500'
                  )}>
                    {showResult && isCorrect ? <CheckCircle2 className="w-4 h-4" /> :
                     showResult && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                     String.fromCharCode(65 + i)}
                  </div>
                  <span className={cn(
                    'text-sm leading-relaxed',
                    showResult && isCorrect ? 'text-emerald-300 font-medium' :
                    showResult && isSelected && !isCorrect ? 'text-rose-300' :
                    showResult ? 'text-slate-500' :
                    isSelected ? 'text-blue-300' :
                    'text-slate-300'
                  )}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={cn(
            'rounded-2xl border p-5 mb-6',
            answers[answers.length - 1]?.correct
              ? 'border-emerald-500/20 bg-emerald-500/5'
              : 'border-amber-500/20 bg-amber-500/5'
          )}>
            <div className="flex items-start gap-3">
              {answers[answers.length - 1]?.correct ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className={cn('font-semibold text-sm mb-1.5', answers[answers.length - 1]?.correct ? 'text-emerald-400' : 'text-amber-400')}>
                  {answers[answers.length - 1]?.correct ? 'Correct! +10 points' : 'Not quite'}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        {!showExplanation ? (
          <Button
            size="lg"
            variant="gradient"
            onClick={handleConfirm}
            disabled={selected === null}
            className="w-full"
          >
            Confirm Answer
            <ChevronRight className="w-5 h-5" />
          </Button>
        ) : (
          <Button size="lg" variant="gradient" onClick={handleNext} className="w-full">
            {current + 1 >= ASSESSMENT_QUESTIONS.length ? (
              <>
                See My Results
                <Trophy className="w-5 h-5" />
              </>
            ) : (
              <>
                Next Question
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
