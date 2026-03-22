# シンプルなタスク管理アプリ（Todo App）

シンプルかつモダンなデザインのタスク管理Webアプリケーションです。直感的な操作と心地よいアニメーションで、日常のタスク管理をサポートします。

## 技術スタック

| レイヤー | 技術 | バージョン |
|----------|------|-----------|
| フレームワーク | Next.js (App Router) | 14.1.0 |
| 言語 | TypeScript | 5.3.3 |
| スタイリング | Tailwind CSS | 3.4.1 |
| アニメーション | Framer Motion | 11.0.0 |
| UIプリミティブ | Radix UI | 1.0.4 |
| アイコン | Lucide React | 0.344.0 |
| 状態管理 | React Context + useReducer | - |
| データ永続化 | localStorage | - |
| テスト | Jest + React Testing Library | 30.x |

## 機能一覧

| ID | 機能名 | 状態 |
|----|--------|------|
| F-001 | タスク追加（Enterキー / ボタンクリック、バリデーション付き） | 実装済み |
| F-002 | タスク完了 / 未完了の切り替え（チェックボックス） | 実装済み |
| F-003 | タスク削除（ホバー時に削除ボタン表示） | 実装済み |
| F-004 | フィルタリング（すべて / 未完了 / 完了） | 実装済み |
| F-005 | 残タスク数表示（フッターに「残り X 件」） | 実装済み |
| F-006 | データ永続化（localStorage、ページリロード後も保持） | 実装済み |
| F-007 | ダークモード対応（OS連動 + 手動切り替え） | 実装済み |
| F-008 | ドラッグ&ドロップ並び替え（「すべて」フィルタ時に有効） | 実装済み |
| F-009 | 完了タスクの一括削除 | 実装済み |

## セットアップガイド

### 前提条件

- Node.js 18.17.0 以上
- npm 9.0.0 以上

### インストール手順

```bash
# 1. リポジトリをクローン（または成果物ディレクトリに移動）
cd src/002-todo-app

# 2. 依存パッケージをインストール
npm install

# 3. 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:3000` を開くとアプリが表示されます。

### 環境変数

本アプリはサーバーサイド処理を一切使用しない静的SPA（クライアントサイド完結）です。`.env` ファイルは不要です。

## ビルドとデプロイ

### プロダクションビルド

```bash
# ビルド実行
npm run build

# ビルド成果物の動作確認
npm run start
```

### Vercel へのデプロイ

本アプリは Vercel へのデプロイを想定しています。

#### GUI経由でのデプロイ

1. [Vercel](https://vercel.com) にアクセスしてアカウントを作成
2. 「New Project」からGitHubリポジトリをインポート
3. 「Root Directory」に `src/002-todo-app` を設定
4. 「Deploy」をクリック

#### CLIでのデプロイ

```bash
# Vercel CLI のインストール（初回のみ）
npm install -g vercel

# プロジェクトディレクトリに移動
cd src/002-todo-app

# デプロイ実行
vercel

# 本番環境へのデプロイ
vercel --prod
```

## プロジェクト構造

```
src/002-todo-app/
├── __tests__/                    # テストファイル
│   ├── components/               # コンポーネントテスト
│   │   ├── EmptyState.test.tsx
│   │   ├── FilterTabs.test.tsx
│   │   ├── Footer.test.tsx
│   │   ├── Header.test.tsx
│   │   ├── TaskInput.test.tsx
│   │   ├── TaskItem.test.tsx
│   │   ├── TaskList.test.tsx
│   │   ├── ThemeToggle.test.tsx
│   │   └── TodoApp.test.tsx
│   ├── hooks/                    # フックテスト
│   │   ├── useTasks.test.tsx
│   │   └── useTheme.test.tsx
│   └── reducers/                 # Reducerテスト
│       └── taskReducer.test.ts
├── coverage/                     # カバレッジレポート（git管理外）
├── public/                       # 静的ファイル
├── src/
│   ├── animations/
│   │   └── variants.ts           # Framer Motion アニメーション定義（全集約）
│   ├── app/
│   │   ├── globals.css           # グローバルスタイル
│   │   ├── layout.tsx            # ルートレイアウト
│   │   └── page.tsx              # エントリーポイント
│   ├── components/
│   │   ├── atoms/                # 最小UIパーツ（状態なし）
│   │   │   ├── Badge.tsx         # バッジ（タスク件数表示）
│   │   │   ├── Button.tsx        # 汎用ボタン
│   │   │   ├── Checkbox.tsx      # チェックボックス（Radix UI）
│   │   │   ├── EmptyState.tsx    # 空状態表示
│   │   │   ├── IconButton.tsx    # アイコンボタン
│   │   │   └── TextInput.tsx     # テキスト入力（IME対応）
│   │   ├── molecules/            # 複合UIパーツ
│   │   │   ├── FilterTabs.tsx    # フィルタタブ（すべて/未完了/完了）
│   │   │   ├── TaskInput.tsx     # タスク入力フォーム
│   │   │   ├── TaskItem.tsx      # タスク1件のカード
│   │   │   └── ThemeToggle.tsx   # ダークモード切替ボタン
│   │   ├── organisms/            # 機能ブロック
│   │   │   ├── Footer.tsx        # フッター（件数・一括削除）
│   │   │   ├── Header.tsx        # ヘッダー（タイトル・テーマ切替）
│   │   │   └── TaskList.tsx      # タスクリスト
│   │   └── templates/
│   │       └── TodoApp.tsx       # ページテンプレート（全体レイアウト）
│   ├── contexts/
│   │   ├── TaskContext.tsx       # タスク状態管理Context
│   │   └── ThemeContext.tsx      # テーマ状態管理Context
│   ├── hooks/
│   │   ├── useTasks.ts           # タスクContextアクセスフック
│   │   └── useTheme.ts           # テーマContextアクセスフック
│   ├── lib/
│   │   ├── constants.ts          # 定数（MAX_TASKS等）
│   │   └── storage.ts            # localStorage操作ユーティリティ
│   ├── reducers/
│   │   └── taskReducer.ts        # タスク状態管理Reducer
│   └── types/
│       └── index.ts              # 型定義（Task, TaskState, TaskAction）
├── jest.config.js                # Jest設定
├── jest.setup.tsx                # Jestセットアップ（モック設定）
├── next.config.js                # Next.js設定
├── package.json
├── postcss.config.js
├── tailwind.config.ts            # Tailwind設定（カスタムカラー・タイポグラフィ）
└── tsconfig.json
```

## テスト実行

```bash
# 全テストを実行
npm test

# カバレッジレポートを生成
npm run test:coverage
```

### テスト結果

| 指標 | 結果 |
|------|------|
| テストスイート | 13 passed / 13 total |
| テストケース | 100 passed / 100 total |
| Statements カバレッジ | 97.86% |
| Branches カバレッジ | 90.4% |
| Functions カバレッジ | 97.77% |
| Lines カバレッジ | 98.65% |

## Lintチェック

```bash
npm run lint
```

## データ仕様

本アプリはサーバーを持たず、データはすべてブラウザの localStorage に保存されます。

| キー | 型 | 説明 |
|------|----|------|
| `todo-app-tasks` | `Task[]` (JSON) | タスクデータの配列 |
| `todo-app-theme` | `'light' \| 'dark'` | ユーザーが選択したテーマ |

### Task 型定義

```typescript
interface Task {
  id: string;          // UUID v4（crypto.randomUUID()）
  title: string;       // タスクタイトル（1〜200文字）
  completed: boolean;  // 完了状態
  createdAt: string;   // ISO 8601 形式の作成日時
  order: number;       // 並び順
}
```

## ブラウザ対応

| ブラウザ | 対応バージョン |
|----------|--------------|
| Chrome | 最新2バージョン |
| Firefox | 最新2バージョン |
| Safari | 最新2バージョン |
| Edge | 最新2バージョン |
| モバイルSafari | iOS 16以上 |
| Chrome for Android | 最新 |

## ライセンス

MIT License

Copyright (c) 2026 AI Company

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
