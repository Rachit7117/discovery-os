'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserProgress, LessonStatus } from '@/types';
import {
  getUserProgress,
  saveUserProgress,
  markLessonComplete,
  updateLessonProgress,
  getCompletionPercentage,
} from '@/lib/storage';
import { TOTAL_LESSONS } from '@/lib/lesson-data';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const p = getUserProgress();
    setProgress(p);
    setIsLoaded(true);
  }, []);

  const refreshProgress = useCallback(() => {
    setProgress(getUserProgress());
  }, []);

  const completeLesson = useCallback(
    (lessonId: string, quizScore?: number) => {
      markLessonComplete(lessonId, quizScore);
      refreshProgress();
    },
    [refreshProgress]
  );

  const updateLesson = useCallback(
    (lessonId: string, patch: Partial<{ status: LessonStatus; reflectionAnswer: string; exerciseAnswer: string }>) => {
      updateLessonProgress(lessonId, patch);
      refreshProgress();
    },
    [refreshProgress]
  );

  const isLessonCompleted = useCallback(
    (lessonId: string) => {
      return progress?.completedLessons.includes(lessonId) ?? false;
    },
    [progress]
  );

  const getLessonScore = useCallback(
    (lessonId: string) => {
      return progress?.quizScores[lessonId] ?? null;
    },
    [progress]
  );

  const completionPercentage = isLoaded
    ? getCompletionPercentage(TOTAL_LESSONS)
    : 0;

  return {
    progress,
    isLoaded,
    completionPercentage,
    completeLesson,
    updateLesson,
    isLessonCompleted,
    getLessonScore,
    refreshProgress,
  };
}
