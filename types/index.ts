// ─── User Profile ────────────────────────────────────────────────────────────

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  name: string;
  experienceLevel: ExperienceLevel;
  weeklyTime: number; // hours per week
  goal: string;
  createdAt: string;
}

// ─── Progress ────────────────────────────────────────────────────────────────

export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  quizScore?: number;
  completedAt?: string;
  reflectionAnswer?: string;
  exerciseAnswer?: string;
  tabsVisited?: string[];
}

export interface UserProgress {
  completedLessons: string[];
  lessonProgress: Record<string, LessonProgress>;
  currentLesson?: string;
  streak: number;
  lastActiveDate: string;
  totalPoints: number;
  quizScores: Record<string, number>;
}

// ─── Content ─────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  week: number;
  title: string;
  subtitle: string;
  duration: number; // minutes
  difficulty: ExperienceLevel;
  concept: {
    title: string;
    body: string;
    keyPoints: string[];
  };
  example: {
    title: string;
    company: string;
    story: string;
    insight: string;
  };
  exercise: {
    title: string;
    description: string;
    prompt: string;
    hint: string;
  };
  reflection: {
    question: string;
    context: string;
  };
  quiz: QuizQuestion[];
  keyTakeaways: string[];
  resources?: string[];
}

export interface Module {
  id: string;
  week: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  lessons: string[]; // lesson IDs
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
