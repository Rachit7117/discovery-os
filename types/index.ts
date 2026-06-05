// ─── User Profile ────────────────────────────────────────────────────────────

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  name: string;
  experienceLevel: ExperienceLevel;
  weeklyTime: number; // hours per week
  goal: string;
  createdAt: string;
}

// ─── Assessment ───────────────────────────────────────────────────────────────

export interface AssessmentAnswer {
  questionId: string;
  selectedOption: number;
  correct: boolean;
  points: number;
}

export type MaturityLevel = 'beginner' | 'intermediate' | 'advanced';

export interface AssessmentResult {
  score: number;          // 0–100
  maturityLevel: MaturityLevel;
  answers: AssessmentAnswer[];
  completedAt: string;
  breakdown: Record<string, number>; // topic → score %
}

// ─── Mentor Personas ──────────────────────────────────────────────────────────

export type MentorPersonaId = 'teresa' | 'marty' | 'founder';

export interface MentorPersona {
  id: MentorPersonaId;
  name: string;
  title: string;
  avatar: string;         // emoji
  gradient: string;
  description: string;
  style: string;          // teaching style label
  systemPrompt: string;
}

// ─── Progress ─────────────────────────────────────────────────────────────────

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
  totalStudyMinutes: number;
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
  level: ExperienceLevel;
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  personaId?: MentorPersonaId;
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  discoveryScore: number | null;
  lessonsCompleted: number;
  totalLessons: number;
  quizAccuracy: number | null;  // average quiz score %
  streak: number;
  estimatedMinutes: number;
  totalPoints: number;
  maturityLevel: MaturityLevel | null;
}
