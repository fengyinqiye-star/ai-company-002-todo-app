import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/organisms/Header';
import { ThemeContext, type ThemeContextValue } from '@/contexts/ThemeContext';

// lucide-react のモック
jest.mock('lucide-react', () => ({
  Sun: () => <span data-testid="sun-icon">Sun</span>,
  Moon: () => <span data-testid="moon-icon">Moon</span>,
}));

function renderWithTheme(theme: 'light' | 'dark' = 'light') {
  const ctx: ThemeContextValue = { theme, toggleTheme: jest.fn() };
  return render(
    <ThemeContext.Provider value={ctx}>
      <Header />
    </ThemeContext.Provider>
  );
}

describe('Header', () => {
  it('Todoタイトルが表示される', () => {
    renderWithTheme();

    expect(screen.getByText('Todo')).toBeInTheDocument();
  });

  it('テーマ切り替えボタンが表示される', () => {
    renderWithTheme();

    expect(screen.getByLabelText('ダークモードに切り替え')).toBeInTheDocument();
  });

  it('h1要素が存在する', () => {
    renderWithTheme();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Todo');
  });
});
