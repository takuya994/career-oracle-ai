import React, { useState } from 'react';
import { UserInput, OracleResponse } from '../types';
import { generateCareerAdvice, generateVisionImage } from '../services/geminiService';
import { Sparkles, ArrowRight, Loader2, Share2, Lock } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const OracleApp: React.FC = () => {
  const [input, setInput] = useState<UserInput>({ jobTitle: '', concern: '', goal: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OracleResponse | null>(null);
  const [visionImage, setVisionImage] = useState<string | null>(null);
  const [step, setStep] = useState<'input' | 'result'>('input');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.jobTitle || !input.concern) return;

    setLoading(true);
    try {
      const adviceData = await generateCareerAdvice(input);
      setResult(adviceData);
      
      // Parallel image generation for better perceived performance
      generateVisionImage(input, adviceData.advice)
        .then(img => setVisionImage(img))
        .catch(err => console.error("Image gen failed", err));

      setStep('result');
    } catch (error) {
      console.error(error);
      alert("予言の受信に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse"></div>
          <Loader2 size={48} className="text-purple-400 animate-spin relative z-10" />
        </div>
        <p className="text-lg text-purple-200 font-medium animate-pulse">
          星の配置を読み解いています...<br/>
          <span className="text-sm text-slate-400">Gemini 2.5 Flash Thinking...</span>
        </p>
      </div>
    );
  }

  if (step === 'result' && result) {
    return (
      <div className="space-y-8 animate-fadeIn pb-20">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-xs border border-purple-700">
            鑑定完了
          </span>
          <h2 className="text-2xl font-bold text-white">あなたのキャリア運勢</h2>
        </div>

        {/* Score Chart */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={100} />
          </div>
          <div className="h-48 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                innerRadius="80%" 
                outerRadius="100%" 
                barSize={10} 
                data={[{ name: 'Score', value: result.careerScore, fill: '#a855f7' }]} 
                startAngle={180} 
                endAngle={0}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={30} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <span className="text-slate-400 text-sm">キャリア運気</span>
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                {result.careerScore}
              </span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-3 rounded-lg text-center border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-1">ラッキーカラー</div>
              <div className="font-bold text-white">{result.luckyColor}</div>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-lg text-center border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-1">アクション</div>
              <div className="font-bold text-white text-sm">{result.luckyAction}</div>
            </div>
          </div>
        </div>

        {/* Main Advice */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
            <Sparkles size={18} /> 星からの啓示
          </h3>
          <p className="text-slate-200 leading-relaxed text-justify">
            {result.advice}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {result.tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Vision Card (Image) */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 flex flex-col items-center text-center">
           <h3 className="text-lg font-bold text-purple-300 mb-4">未来のビジョンカード</h3>
           {visionImage ? (
             <img src={visionImage} alt="Future Vision" className="w-64 h-64 rounded-xl shadow-lg shadow-purple-500/20 object-cover mb-4 transition-all hover:scale-105 duration-500" />
           ) : (
             <div className="w-64 h-64 bg-slate-900 rounded-xl flex items-center justify-center mb-4 animate-pulse">
               <Loader2 className="animate-spin text-slate-600" />
             </div>
           )}
           <p className="text-xs text-slate-500">※Gemini AIが生成したあなたの未来の抽象画です</p>
        </div>

        {/* Monetization / CTA Area */}
        <div className="space-y-4 pt-4">
           <button 
             onClick={() => alert("SNSシェア用の画像生成フローをここに実装します（Canvas API等を使用）")}
             className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 hover:opacity-90 transition-opacity"
            >
             <Share2 size={18} /> 結果をシェアしてお祓いする
           </button>

           <div className="relative group cursor-pointer" onClick={() => alert("ここにStripe決済リンク等を埋め込みます。\n例: 500円で3000文字の詳細鑑定レポート")}>
             <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-200"></div>
             <div className="relative bg-slate-900 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                    <Lock size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-yellow-500">深層鑑定レポートを見る</div>
                    <div className="text-xs text-slate-400">仕事運・金運・転職時期を詳細分析</div>
                  </div>
                </div>
                <ArrowRight size={18} className="text-slate-500" />
             </div>
           </div>

           <button onClick={() => { setStep('input'); setVisionImage(null); }} className="w-full text-slate-500 text-sm py-2">
             もう一度占う
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
          Career Oracle AI
        </h1>
        <p className="text-slate-400 text-sm">
          あなたのキャリアの運命をAIが予言します
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">現在の職業・役割</label>
          <input
            type="text"
            required
            placeholder="例: 営業職、Webエンジニア、事務..."
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-slate-500 transition-all"
            value={input.jobTitle}
            onChange={(e) => setInput({ ...input, jobTitle: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">現在の最大の悩み</label>
          <textarea
            required
            rows={3}
            placeholder="例: 上司と合わない、給料が上がらない、将来が不安..."
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-slate-500 transition-all"
            value={input.concern}
            onChange={(e) => setInput({ ...input, concern: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">将来の目標（漠然とでもOK）</label>
          <input
            type="text"
            required
            placeholder="例: 年収1000万、海外移住、起業..."
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-slate-500 transition-all"
            value={input.goal}
            onChange={(e) => setInput({ ...input, goal: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-bold text-lg shadow-lg shadow-purple-900/50 hover:shadow-purple-900/70 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="animate-pulse" /> 運命を占う
        </button>
        
        <p className="text-xs text-center text-slate-500 mt-4">
          ※AIによる予測です。エンターテイメントとしてお楽しみください。
        </p>
      </form>
    </div>
  );
};

export default OracleApp;