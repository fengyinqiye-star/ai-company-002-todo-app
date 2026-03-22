import React from 'react';
import { renderHook } from '@testing-library/react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeContext, type ThemeContextValue } from '@/contexts/ThemeContext';

describe('useTheme', () => {
  it('ThemeProvider外で使用するとエラーをthrowする', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');

    spy.mockRestore();
  });

  it('ThemeProvider内で使用するとコンテキスト値を返す', () => {
    const mockValue: ThemeContextValue = {
      theme: 'dark',
      toggleTheme: jest.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={mockValue}>{children}</ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
    expect(typeof result.current.toggleTheme).toBe('function');
  });
});
