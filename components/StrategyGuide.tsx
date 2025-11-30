import React from 'react';
import { Target, Smartphone, Share2, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';

const StrategyGuide: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-slate-200 space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          2週間で収益化するための戦略レポート
        </h2>
        <button 
          onClick={onBack}
          className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
        >
          アプリに戻る
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Section 1: Target Device */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
              <Smartphone size={24} />
            </div>
            <h3 className="text-xl font-bold">1. 想定端末：モバイル・ファースト (Web App)</h3>
          </div>
          <p className="text-slate-400 leading-relaxed mb-4">
            サラリーマンの通勤時間や昼休みなどの「スキマ時間」を狙います。
            2週間という短期間では、審査のあるネイティブアプリ(iOS/Android)はリスクが高すぎます。
            PWA対応のWebアプリとして公開し、SNSから直リンクで流入させるのが最適解です。
          </p>
          <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
            <li>縦型UIデザインを徹底する</li>
            <li>会員登録なしで結果が見れるようにする（離脱防止）</li>
          </ul>
        </div>

        {/* Section 2: Platform */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold">2. 公開場所：Vercel / Netlify</h3>
          </div>
          <p className="text-slate-400 leading-relaxed mb-4">
            コストゼロで高速なホスティングが可能なVercel等を推奨します。
            独自ドメイン（お名前.com等で数百円）を取得すると信頼性が上がります。
          </p>
        </div>

        {/* Section 3: Promotion */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400">
              <Share2 size={24} />
            </div>
            <h3 className="text-xl font-bold">3. 認知獲得：ショート動画 × シェア機能</h3>
          </div>
          <p className="text-slate-400 leading-relaxed mb-4">
            予算がない場合、広告よりも「診断結果のシェア」が最強の広告です。
            TikTokやYouTube Shortsで「AIに私のキャリア占わせたらヤバかったｗ」のような動画を作成し、アプリへのリンクを貼ります。
          </p>
          <div className="bg-slate-900/50 p-3 rounded text-sm text-pink-300">
             重要：診断結果を「画像」として保存・シェアしやすくするUIが必須です。
          </div>
        </div>

        {/* Section 4: Genre */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold">4. 狙い目ジャンル：診断・占い系</h3>
          </div>
          <p className="text-slate-400 leading-relaxed">
            チャットbotはレッドオーシャンです。「悩み相談 × 占い」や「辛口キャリア診断」など、
            <strong>入力→結果表示</strong>のシンプルな構造が2週間で作れ、かつSNSでバズりやすいです。
            ユーザー自身のことを語ってくれるコンテンツは承認欲求を満たすため、強い拡散力を持ちます。
          </p>
        </div>

        {/* Section 5: Monetization */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
              <DollarSign size={24} />
            </div>
            <h3 className="text-xl font-bold">マネタイズの設計図</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-white mb-2">フェーズ1: 広告モデル</h4>
              <p className="text-slate-400 text-sm">
                最初はGoogle AdSense（審査あり）やnendなどのクリック報酬型広告を配置。
                「結果を見る」ボタンの直下などがクリック率が高いです。
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">フェーズ2: マイクロペイメント</h4>
              <p className="text-slate-400 text-sm">
                「簡易診断は無料、詳細な深掘りアドバイスは100円」というモデル。
                StripeのPayment Linkを使えば、コードを書かずに決済リンクを発行できます。
                このアプリの「プレミアム鑑定」ボタンがその例です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyGuide;