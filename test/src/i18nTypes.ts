import en from './locales/en.json';
import hi from './locales/hi.json';

// Define a type for the keys in the translation files
export type TranslationKeys = keyof typeof en;

// Optionally, export your translation objects for better type safety
export const translations = {
  en,
  hi,
} as const;
