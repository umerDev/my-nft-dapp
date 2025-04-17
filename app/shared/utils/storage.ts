'use client';

import { Storage } from 'wagmi';

export const storage: Storage = {
  getItem: (key, defaultValue) => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : (defaultValue ?? null);
    }
    return defaultValue ?? null;
  },
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
  key: 'wagmi',
};
