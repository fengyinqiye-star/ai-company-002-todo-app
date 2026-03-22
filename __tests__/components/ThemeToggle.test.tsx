import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import { ThemeContext, type ThemeContextValue } from '@/contexts/ThemeContext';

// lucide-react のモック
jest.mock('lucide-react', () => ({
  Sun: () => <span data-testid="sun-icon">Sun</span>,
  Moon: () => <span data-testid="moon-icon">Moon</span>,
}));

function renderWithContext(ctx: ThemeContextValue) {
  return render(
    <ThemeContext.Provider value={ctx}>
      <ThemeToggle />
    </ThemeContext.Provider>
  );
}

describe('ThemeToggle', () => {
  it('ライトモード時に「ダークモードに切り替え」ボタンが表示される', () => {
    const ctx: ThemeContextValue = { theme: 'light', toggleTheme: jest.fn() };
    renderWithContext(ctx);

    expect(screen.getByLabelText('ダークモードに切り替え')).toBeInTheDocument();
  });

  it('ダークモード時に「ライトモードに切り替え」ボタンが表示される', () => {
    const ctx: ThemeContextValue = { theme: 'dark', toggleTheme: jest.fn() };
    renderWithContext(ctx);

    expect(screen.getByLabelText('ライトモードに切り替え')).toBeInTheDocument();
  });

  it('ライトモード時にSunアイコンが表示される', () => {
    const ctx: ThemeContextValue = { theme: 'light', toggleTheme: jest.fn() };
    renderWithContext(ctx);

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('ダークモード時にMoonアイコンが表示される', () => {
    const ctx: ThemeContextValue = { theme: 'dark', toggleTheme: jest.fn() };
    renderWithContext(ctx);

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('クリックでtoggleThemeが呼ばれる', async () => {
    const toggleTheme = jest.fn();
    const ctx: ThemeContextValue = { theme: 'light', toggleTheme };
    renderWithContext(ctx);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('ダークモードに切り替え'));

    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
