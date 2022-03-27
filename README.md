# Qin-Todo チーム I

## 技術選定

- React(Next.js)
- JavaScript
- TailwindCSS
- ESLint
- Prettier

## 環境構築手順

### 1. リポジトリのクローンを作成

```
git clone https://github.com/qin-todo-team-i/qin-todo-team-i
```

### 2. 必要なモジュールのインストール

```
yarn
```

or

```
npm install
```

### 3. ローカル環境の立ち上げ

```
yarn dev
```

or

```
npm run dev
```

## 開発手順

ブランチ名は feature/#[issue 番号]とする

### 0. 現在のブランチの確認とローカル環境の更新

```
git branch
```

- 基本的にブランチを作成する前は dev に移動し dev を最新状態にする

```
git checkout dev
```

      ↓

```
git pull origin dev
```

### 1. 作業ブランチの作成

- ブランチを作成する場合は必ず dev にいる状態から作成する(コンフリクトの原因になりやすいため)

```
git branch feature/#[issue番号]
```

### 2. 作成した作業ブランチへ移動

```
git checkout feature/#[issue番号]
```

### 3. 開発

通常通り開発をする
その後コミット、プッシュしてプルリクエスト

## その他

- PR を出す時は dev に向ける(デフォルトで設定されている)
- PR はタスクに関係のあるもののみをコミットする
- タスクに手が回らなくなった場合途中でいいのでプルリクエストを出す。その際プルリクエストの補足欄に完了していない機能などを記述。
- 部分的に手の空いてる人にバトンパス

## mock api の立ち上げ

```
yarn mock
```
