// src/i18next.d.ts
import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    // Default type for translation keys
    defaultNS: 'translation';
    resources: {
      translation: {
        [key: string]: string; // Use a string index to allow any string key
      };
    };
  }
}
