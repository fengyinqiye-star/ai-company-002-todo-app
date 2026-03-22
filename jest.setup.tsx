import React from 'react';
import '@testing-library/jest-dom';

// crypto.randomUUID のモック
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => {
      // テスト用の固定的だがユニークなUUID生成
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    },
  },
});

// framer-motion のモック
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { variants, initial, animate, exit, transition, layout, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    span: ({ children, ...props }: any) => {
      const { variants, initial, animate, exit, transition, ...rest } = props;
      return <span {...rest}>{children}</span>;
    },
    path: (props: any) => {
      const { variants, initial, animate, ...rest } = props;
      return <path {...rest} />;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  Reorder: {
    Group: ({ children, ...props }: any) => {
      const { axis, values, onReorder, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    Item: ({ children, ...props }: any) => {
      const { value, dragListener, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
}));

// matchMedia のモック
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
