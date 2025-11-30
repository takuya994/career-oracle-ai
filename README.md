# Career Oracle AI (キャリア予言AI)

Gemini 2.5 Flashを活用した、キャリア相談と占いを融合させたWebアプリケーションプロトタイプです。
収益化を想定した戦略ガイド（Strategy Guide）機能も内包しています。

## 機能

- **AIキャリア予言**: 職業・悩み・目標を入力すると、Gemini 2.5 Flashが具体的かつスピリチュアルなアドバイスを生成。
- **ビジョンカード生成**: アドバイス内容に基づいた抽象画をGemini 2.5 Flash Imageで生成。
- **収益化戦略ガイド**: アプリ内に実装された、開発者向けのマネタイズ戦略レポート。

## 技術スタック

- **Frontend**: React, Tailwind CSS, Recharts
- **AI**: Google Gemini API (@google/genai)
  - `gemini-2.5-flash`: テキスト生成
  - `gemini-2.5-flash-image`: 画像生成

## セットアップ (ローカル開発)

1. リポジトリをクローン
2. 依存関係をインストール
   ```bash
   npm install
   ```
3. APIキーの設定
   環境変数 `API_KEY` に Google Gemini APIキーを設定してください。

4. 起動
   ```bash
   npm run dev
   ```

## ライセンス

MIT
