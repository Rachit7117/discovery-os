import type { UserProfile, UserProgress, ChatMessage } from '@/types';

const KEYS = {
  USER_PROFILE: 'discovery_os_profile',
  USER_PROGRESS: 'discovery_os_progress',
  CHAT_HISTORY: 'discovery_os_chat',
  ONBOARDED: 'discovery_os_onboarded',
} as const;

// ─── Profile ──────────────────────────────────────────────────────────────────

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
  localStorage.setItem(KEYS.ONBOARDED, 'true');
}

export function getUserProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEYS.USER_PROFILE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function isOnboarded(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(KEYS.ONBOARDED) === 'true';
}

// ─── Progress ─────────────────────────────────────────────────────────────────

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  lessonProgress: {},
  currentLesson: 'week-1-customer-problems',
  streak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalPoints: 0,
  quizScores: {},
};

export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  const raw = localStorage.getItem(KEYS.USER_PROGRESS);
  if (!raw) return DEFAULT_PROGRESS;
  try {
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) } as UserProgress;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.USER_PROGRESS, JSON.stringify(progress));
}

export function markLessonComplete(lessonId: string, quizScore?: number): void {
  const progress = getUserProgress();
  const today = new Date().toISOString().split('T')[0];

  // Update streak
  const lastActive = progress.lastActiveDate;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const newStreak =
    lastActive === today
      ? progress.streak
      : lastActive === yesterdayStr
        ? progress.streak + 1
        : 1;

  const updated: UserProgress = {
    ...progress,
    completedLessons: [...new Set([...progress.completedLessons, lessonId])],
    lessonProgress: {
      ...progress.lessonProgress,
      [lessonId]: {
        lessonId,
        status: 'completed',
        quizScore,
        completedAt: new Date().toISOString(),
      },
    },
    streak: newStreak,
    lastActiveDate: today,
    totalPoints: progress.totalPoints + 100 + (quizScore ? quizScore * 10 : 0),
    quizScores: quizScore !== undefined
      ? { ...progress.quizScores, [lessonId]: quizScore }
      : progress.quizScores,
  };

  saveUserProgress(updated);
}

export function updateLessonProgress(
  lessonId: string,
  patch: Partial<UserProgress['lessonProgress'][string]>
): void {
  const progress = getUserProgress();
  const existing = progress.lessonProgress[lessonId] ?? {
    lessonId,
    status: 'in-progress',
  };
  saveUserProgress({
    ...progress,
    lessonProgress: {
      ...progress.lessonProgress,
      [lessonId]: { ...existing, ...patch },
    },
  });
}

export function getCompletionPercentage(totalLessons: number): number {
  const progress = getUserProgress();
  if (totalLessons === 0) return 0;
  return Math.round((progress.completedLessons.length / totalLessons) * 100);
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export function getChatHistory(): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEYS.CHAT_HISTORY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ChatMessage[];
  } catch {
    return [];
  }
}

export function saveChatHistory(messages: ChatMessage[]): void {
  if (typeof window === 'undefined') return;
  // Keep last 100 messages
  const trimmed = messages.slice(-100);
  localStorage.setItem(KEYS.CHAT_HISTORY, JSON.stringify(trimmed));
}

export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}
