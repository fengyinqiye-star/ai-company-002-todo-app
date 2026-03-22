import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/atoms/EmptyState';

describe('EmptyState', () => {
  it('メッセージが表示される', () => {
    render(<EmptyState message="タスクを追加してみましょう" />);

    expect(screen.getByText('タスクを追加してみましょう')).toBeInTheDocument();
  });

  it('アイコンが渡された場合に表示される', () => {
    render(
      <EmptyState
        message="テスト"
        icon={<span data-testid="test-icon">icon</span>}
      />
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('アイコンが渡されない場合はアイコン部分が表示されない', () => {
    const { container } = render(<EmptyState message="テスト" />);

    // mb-4クラスを持つdiv(アイコンラッパー)が存在しないことを確認
    expect(container.querySelector('.mb-4')).toBeNull();
  });
});
