import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type ThemeContextType } from './themeContext';

function getInitialDark(): boolean {
  try {
    const saved = localStorage.getItem('theme');
    if (saved !== null) {
      return JSON.parse(saved) === true;
    }
  } catch {
    // Corrupted value — fall through to system preference.
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(getInitialDark);

  useEffect(() => {
    try {
      localStorage.setItem('theme', JSON.stringify(isDark));
    } catch {
      // Storage unavailable — theme still applies for this session.
    }
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const value: ThemeContextType = { isDark, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
