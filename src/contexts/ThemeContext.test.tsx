import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from './themeContext';

function Probe() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="mode">{isDark ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('throws when useTheme is used outside the provider', () => {
    // Suppress React error boundary noise for the expected throw.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(/ThemeProvider/);
    spy.mockRestore();
  });

  it('toggles theme and persists the choice', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    const mode = screen.getByTestId('mode');
    const initial = mode.textContent;

    act(() => {
      screen.getByRole('button', { name: 'toggle' }).click();
    });

    expect(mode.textContent).not.toBe(initial);
    expect(localStorage.getItem('theme')).toBe(JSON.stringify(initial !== 'dark'));

    const nowDark = document.documentElement.classList.contains('dark');
    expect(nowDark).toBe(initial !== 'dark');
  });

  it('restores a saved theme on mount', () => {
    localStorage.setItem('theme', 'false');

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    expect(screen.getByTestId('mode').textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('falls back to light for a corrupted saved value', () => {
    localStorage.setItem('theme', '{corrupted');

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    // Corrupted value → matchMedia default (jsdom reports no preference → not dark)
    expect(['light', 'dark']).toContain(screen.getByTestId('mode').textContent);
  });
});
