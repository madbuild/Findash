import React from 'react';
import { CreditCard, Send, Download, ArrowRight } from 'lucide-react';

export function MyCards() {
  return (
    <div className="bg-surface rounded-3xl p-6 border border-border-subtle transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-main">My Cards</h3>
        <button className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
          Show All <ArrowRight size={14} />
        </button>
      </div>

      <div className="relative h-52 w-full perspective-1000">
        {/* Background Card (Stacked Effect) */}
        <div className="absolute top-2 left-4 right-4 h-full rounded-2xl bg-gradient-to-br from-blue-600/40 to-purple-600/40 blur-[1px] transform translate-z-[-10px] scale-[0.98] opacity-50"></div>
        
        {/* Main Card */}
        <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 overflow-hidden shadow-2xl border border-white/10 group cursor-pointer transition-transform duration-500 hover:rotate-y-12">
          {/* Card Pattern */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-48 h-48 rounded-full bg-blue-500 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 rounded-full bg-purple-500 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs font-black text-white shadow-lg shadow-blue-500/40">F</div>
                <span className="text-base font-black text-white tracking-tight">Findash <span className="text-blue-400 font-normal text-[10px] ml-1">PLATINUM</span></span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <span className="text-xs font-mono text-white/80 ml-1">3456</span>
                </div>
                <span className="text-[8px] text-white/40 font-mono">VALID THRU 12/28</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">Total Balance</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl md:text-3xl font-black text-white tracking-tighter">$86,320.25</p>
                <p className="text-xs font-bold text-blue-400">USD</p>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <p className="text-xs font-medium text-white/70 uppercase tracking-widest">Jackob Gerrald</p>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-orange-500/80 border border-white/10"></div>
                <div className="w-6 h-6 rounded-full bg-yellow-500/80 border border-white/10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <button className="flex items-center justify-center gap-2 py-3.5 bg-bg border border-border-subtle rounded-2xl text-sm font-bold text-text-main hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all shadow-sm active:scale-95 group">
          <Send size={18} className="rotate-[-45deg] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          Send
        </button>
        <button className="flex items-center justify-center gap-2 py-3.5 bg-bg border border-border-subtle rounded-2xl text-sm font-bold text-text-main hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all shadow-sm active:scale-95 group">
          <Download size={18} className="group-hover:translate-y-1 transition-transform" />
          Request
        </button>
      </div>
    </div>
  );
}
