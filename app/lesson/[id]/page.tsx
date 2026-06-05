'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Lightbulb,
  Pencil,
  HelpCircle,
  ListChecks,
  Clock,
  Star,
  Trophy,
  ChevronRight,
  CheckCheck,
} from 'lucide-react';
import { Navigation } from '@/components/shared/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { getLessonById, getAllLessons } from '@/lib/lesson-data';
import { markLessonComplete, getUserProgress } from '@/lib/storage';
import type { Lesson, QuizQuestion } from '@/types';

type Tab = 'learn' | 'example' | 'exercise' | 'reflection' | 'quiz';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'example', label: 'Example', icon: Lightbulb },
  { id: 'exercise', label: 'Exercise', icon: Pencil },
  { id: 'reflection', label: 'Reflect', icon: HelpCircle },
  { id: 'quiz', label: 'Quiz', icon: ListChecks },
];

// ─── Quiz Component ───────────────────────────────────────────────────────────

function QuizSection({
  questions,
  onComplete,
}: {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = () => {
    const correct = questions.filter((q) => answers[q.id] === q.correctAnswer).length;
    const pct = Math.round((correct / questions.length) * 100);
    setScore(pct);
    setSubmitted(true);
    onComplete(pct);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        {/* Score card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <div className={cn(
            'w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4 border-4',
            score >= 80 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' :
              score >= 60 ? 'border-amber-500/40 bg-amber-500/10 text-amber-400' :
                'border-red-500/40 bg-red-500/10 text-red-400'
          )}>
            {score}%
          </div>
          <h3 className="text-xl font-bold text-white mb-1">
            {score >= 90 ? '🎉 Excellent!' : score >= 70 ? '👍 Good work!' : '💪 Keep practicing!'}
          </h3>
          <p className="text-slate-400 text-sm">
            {questions.filter((q) => answers[q.id] === q.correctAnswer).length} of {questions.length} correct
          </p>
        </div>

        {/* Review answers */}
        <div className="space-y-4">
          {questions.map((q) => {
            const isCorrect = answers[q.id] === q.correctAnswer;
            return (
              <div
                key={q.id}
                className={cn(
                  'rounded-xl border p-4',
                  isCorrect ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'
                )}
              >
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm font-medium text-white">{q.question}</p>
                </div>
                <div className="ml-8 space-y-1.5">
                  {q.options.map((opt, i) => (
                    <div
                      key={i}
                      className={cn(
                        'text-xs px-3 py-2 rounded-lg',
                        i === q.correctAnswer && 'bg-emerald-500/15 text-emerald-300',
                        i === answers[q.id] && i !== q.correctAnswer && 'bg-red-500/15 text-red-300',
                        i !== q.correctAnswer && i !== answers[q.id] && 'text-slate-500'
                      )}
                    >
                      {opt}
                      {i === q.correctAnswer && ' ✓'}
                    </div>
                  ))}
                </div>
                <p className="ml-8 mt-3 text-xs text-slate-400 bg-white/5 rounded-lg p-3">
                  💡 {q.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((q, qIndex) => (
        <div key={q.id} className="rounded-xl border border-white/8 bg-white/3 p-5">
          <p className="font-medium text-white mb-4 text-sm">
            <span className="text-slate-500 mr-2">Q{qIndex + 1}.</span>
            {q.question}
          </p>
          <div className="space-y-2.5">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200',
                  answers[q.id] === i
                    ? 'border-blue-500/50 bg-blue-500/15 text-white'
                    : 'border-white/8 bg-white/3 text-slate-300 hover:bg-white/6 hover:border-white/14'
                )}
              >
                <span className="text-slate-500 mr-3 font-mono text-xs">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <Button
        onClick={handleSubmit}
        disabled={!allAnswered}
        variant="gradient"
        className="w-full"
        size="lg"
      >
        <ListChecks className="w-4 h-4" />
        Submit Quiz
      </Button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('learn');
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [exerciseAnswer, setExerciseAnswer] = useState('');
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [tabsVisited, setTabsVisited] = useState<Set<Tab>>(new Set(['learn']));

  const allLessons = getAllLessons();

  useEffect(() => {
    const l = getLessonById(id);
    if (l) {
      setLesson(l);
      // Restore saved progress
      const prog = getUserProgress();
      const saved = prog.lessonProgress[id];
      if (saved) {
        if (saved.exerciseAnswer) setExerciseAnswer(saved.exerciseAnswer);
        if (saved.reflectionAnswer) setReflectionAnswer(saved.reflectionAnswer);
        if (prog.quizScores[id] !== undefined) setQuizScore(prog.quizScores[id]);
        if (saved.status === 'completed') setIsCompleted(true);
      }
    } else {
      setNotFound(true);
    }
  }, [id]);

  const visitTab = (tab: Tab) => {
    setActiveTab(tab);
    setTabsVisited((prev) => new Set([...prev, tab]));
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    markLessonComplete(id, score);
    setIsCompleted(true);
  };

  const currentIndex = allLessons.findIndex((l) => l.id === id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const tabProgress = (tabsVisited.size / TABS.length) * 100;

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#060d1b] flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <p className="text-slate-400 mb-4">Lesson not found.</p>
          <Link href="/roadmap">
            <Button>Back to Roadmap</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <div className="min-h-screen bg-[#060d1b]">
      <Navigation />

      <div className="max-w-4xl mx-auto pt-24 pb-20 px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/roadmap" className="hover:text-slate-300 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Roadmap
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-300">{lesson.title}</span>
        </div>

        {/* Lesson Header */}
        <div className="rounded-2xl border border-white/8 bg-white/3 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge variant="secondary">Week {lesson.week}</Badge>
                <Badge variant="secondary" className="capitalize">{lesson.difficulty}</Badge>
                {isCompleted && (
                  <Badge variant="success">
                    <CheckCheck className="w-3 h-3 mr-1" />
                    Completed
                    {quizScore !== null && ` · ${quizScore}%`}
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">{lesson.title}</h1>
              <p className="text-slate-400 text-sm">{lesson.subtitle}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  {lesson.duration} min
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <ListChecks className="w-3.5 h-3.5" />
                  {lesson.quiz.length} quiz questions
                </span>
              </div>
            </div>
            {isCompleted && quizScore !== null && (
              <div className="flex flex-col items-center gap-1">
                <div className={cn(
                  'w-16 h-16 rounded-2xl border-2 flex items-center justify-center font-black text-xl',
                  quizScore >= 80 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' :
                    quizScore >= 60 ? 'border-amber-500/40 bg-amber-500/10 text-amber-400' :
                      'border-red-500/40 bg-red-500/10 text-red-400'
                )}>
                  {quizScore}%
                </div>
                <span className="text-xs text-slate-500">Quiz score</span>
              </div>
            )}
          </div>

          {/* Section progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Sections visited</span>
              <span className="text-xs text-slate-400">{tabsVisited.size}/{TABS.length}</span>
            </div>
            <Progress value={tabProgress} className="h-1.5" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1 scrollbar-none">
          {TABS.map(({ id: tabId, label, icon: Icon }) => {
            const visited = tabsVisited.has(tabId);
            const active = activeTab === tabId;
            return (
              <button
                key={tabId}
                onClick={() => visitTab(tabId)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0',
                  active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : visited
                      ? 'bg-white/6 text-slate-300 hover:bg-white/8 border border-white/10'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
                {visited && !active && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="rounded-2xl border border-white/8 bg-white/3 p-6 sm:p-8">
          {/* LEARN */}
          {activeTab === 'learn' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">{lesson.concept.title}</h2>
              <div className="prose-dark space-y-4 mb-8">
                {lesson.concept.body.split('\n\n').map((para, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed text-sm">
                    {para.split('**').map((part, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className="text-white font-semibold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                ))}
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/8 p-5">
                <h3 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Key Points
                </h3>
                <ul className="space-y-2">
                  {lesson.concept.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => visitTab('example')}>
                  Next: Real-world Example
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* EXAMPLE */}
          {activeTab === 'example' && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{lesson.example.title}</h2>
                  <p className="text-xs text-slate-500">{lesson.example.company}</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/8 bg-white/3 p-5 mb-5">
                <p className="text-slate-300 leading-relaxed text-sm">{lesson.example.story}</p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 p-5">
                <h3 className="text-sm font-semibold text-amber-300 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  The Key Insight
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">{lesson.example.insight}</p>
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => visitTab('learn')}>
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={() => visitTab('exercise')}>
                  Next: Exercise
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* EXERCISE */}
          {activeTab === 'exercise' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                  <Pencil className="w-4 h-4 text-violet-400" />
                </div>
                <h2 className="text-lg font-bold text-white">{lesson.exercise.title}</h2>
              </div>
              <p className="text-sm text-slate-400 mb-5">{lesson.exercise.description}</p>

              <div className="rounded-xl border border-white/8 bg-white/3 p-5 mb-5">
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {lesson.exercise.prompt}
                </p>
              </div>

              <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 mb-5">
                <p className="text-xs text-violet-300 flex items-start gap-2">
                  <span className="font-bold flex-shrink-0">💡 Hint:</span>
                  {lesson.exercise.hint}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Your answer</label>
                <Textarea
                  value={exerciseAnswer}
                  onChange={(e) => setExerciseAnswer(e.target.value)}
                  placeholder="Write your exercise response here..."
                  rows={6}
                />
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => visitTab('example')}>
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={() => visitTab('reflection')}>
                  Next: Reflection
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* REFLECTION */}
          {activeTab === 'reflection' && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <h2 className="text-lg font-bold text-white">Reflection Question</h2>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/8 p-5 mb-5">
                <p className="text-white font-medium mb-3 text-sm">❓ {lesson.reflection.question}</p>
                <p className="text-xs text-slate-400 italic leading-relaxed">{lesson.reflection.context}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Your reflection</label>
                <Textarea
                  value={reflectionAnswer}
                  onChange={(e) => setReflectionAnswer(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={5}
                />
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => visitTab('exercise')}>
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={() => visitTab('quiz')} variant="gradient">
                  Take the Quiz
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* QUIZ */}
          {activeTab === 'quiz' && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/20 flex items-center justify-center">
                  <ListChecks className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Knowledge Check</h2>
                  <p className="text-xs text-slate-500">{lesson.quiz.length} questions</p>
                </div>
              </div>

              <QuizSection
                questions={lesson.quiz}
                onComplete={handleQuizComplete}
              />

              {/* After quiz: key takeaways + navigation */}
              {quizScore !== null && (
                <div className="mt-8 space-y-5">
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/8 p-5">
                    <h3 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Key Takeaways
                    </h3>
                    <ul className="space-y-2">
                      {lesson.keyTakeaways.map((t, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    {prevLesson && (
                      <Link href={`/lesson/${prevLesson.id}`}>
                        <Button variant="outline" size="sm">
                          <ArrowLeft className="w-4 h-4" />
                          Previous
                        </Button>
                      </Link>
                    )}
                    <div className="ml-auto flex gap-3">
                      <Link href="/roadmap">
                        <Button variant="outline" size="sm">
                          Back to Roadmap
                        </Button>
                      </Link>
                      {nextLesson && (
                        <Link href={`/lesson/${nextLesson.id}`}>
                          <Button variant="gradient" size="sm">
                            Next Lesson
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
