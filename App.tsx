import React, { useState } from 'react';
import OracleApp from './components/OracleApp';
import StrategyGuide from './components/StrategyGuide';
import { AppView } from './types';
import { BookOpen, Home } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);

  // Simple background effect
  const Background = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/30 rounded-full blur-[100px]"></div>
    </div>
  );

  return (
    <div className="min-h-screen text-white relative">
      <Background />
      
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 font-bold text-purple-400 cursor-pointer"
            onClick={() => setView(AppView.LANDING)}
          >
            <Home size={20} />
            <span>AI Studio Pro</span>
          </div>
          
          <nav className="flex gap-4">
            <button 
              onClick={() => setView(AppView.STRATEGY)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${view === AppView.STRATEGY ? 'text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <BookOpen size={16} />
              <span className="hidden sm:inline">収益化戦略ガイド</span>
            </button>
            <button 
              onClick={() => setView(AppView.APP)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${view === AppView.APP ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              アプリ起動
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 px-4 pb-12 max-w-4xl mx-auto">
        {view === AppView.LANDING && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Gemini AI <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Monetization Prototype
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              「2週間の自由時間」で収益化を目指すあなたへの提案。<br/>
              このプロトタイプは、市場性の高い「占い・診断ジャンル」の実装例と、<br/>
              具体的な開発・マーケティング戦略レポートを含んでいます。
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <button 
                onClick={() => setView(AppView.APP)}
                className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                デモアプリを試す
              </button>
              <button 
                onClick={() => setView(AppView.STRATEGY)}
                className="px-8 py-4 bg-slate-800 text-white rounded-full font-bold text-lg border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                戦略レポートを読む
              </button>
            </div>
          </div>
        )}

        {view === AppView.STRATEGY && <StrategyGuide onBack={() => setView(AppView.APP)} />}
        
        {view === AppView.APP && <OracleApp />}
      </main>
    </div>
  );
};

export default App;