'use client';

import { useState, useEffect } from 'react';
import type { UserProfile } from '@/types';
import { getUserProfile, saveUserProfile, isOnboarded } from '@/lib/storage';

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [onboarded, setOnboarded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const p = getUserProfile();
    const o = isOnboarded();
    setProfile(p);
    setOnboarded(o);
    setIsLoaded(true);
  }, []);

  const saveProfile = (p: UserProfile) => {
    saveUserProfile(p);
    setProfile(p);
    setOnboarded(true);
  };

  return { profile, onboarded, isLoaded, saveProfile };
}
