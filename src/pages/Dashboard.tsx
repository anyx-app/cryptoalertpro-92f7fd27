import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity, Bell, Zap, TrendingUp, Clock, Plus } from 'lucide-react';

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }: any) => (
  <div className="group relative p-6 rounded-2xl bg-[#151921]/60 border border-white/5 hover:border-[#FF9500]/30 transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(255,149,0,0.05)] overflow-hidden">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon className="w-24 h-24 transform translate-x-4 -translate-y-4" />
    </div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        </div>
      </div>
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
        <span className={`text-sm font-medium mb-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
    </div>
  </div>
);

const AlertRow = ({ symbol, type, condition, price, time, status }: any) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9500]/20 to-[#FF9500]/5 flex items-center justify-center text-[#FF9500] font-bold border border-[#FF9500]/20">
        {symbol.substring(0, 1)}
      </div>
      <div>
        <h4 className="font-bold text-white group-hover:text-[#FF9500] transition-colors">{symbol}</h4>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="uppercase bg-white/5 px-1.5 py-0.5 rounded text-[10px]">{type}</span>
          <span>•</span>
          <span>{condition}</span>
        </div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-white font-mono font-medium">{price}</div>
      <div className="text-xs text-slate-500">{time}</div>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Market Overview
          </h1>
          <p className="text-slate-400">
            Welcome back, Trader. You have <span className="text-[#FF9500] font-bold">3 active alerts</span> pending.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#FF9500] hover:bg-[#FF9500]/90 text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(255,149,0,0.3)] hover:shadow-[0_0_30px_rgba(255,149,0,0.5)] active:scale-95">
          <Plus className="w-5 h-5" />
          <span>New Alert</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Bitcoin Price" 
          value="$64,230.50" 
          change="+2.4%" 
          isPositive={true} 
          icon={Activity}
          color="text-[#FF9500]"
        />
        <StatCard 
          title="24h Volume" 
          value="$42.5B" 
          change="-1.2%" 
          isPositive={false} 
          icon={TrendingUp}
          color="text-blue-500"
        />
        <StatCard 
          title="Active Alerts" 
          value="12" 
          change="+3 New" 
          isPositive={true} 
          icon={Bell}
          color="text-purple-500"
        />
        <StatCard 
          title="Signals Today" 
          value="8" 
          change="High Volatility" 
          isPositive={true} 
          icon={Zap}
          color="text-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Placeholder for now) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#151921] border border-white/5 shadow-xl relative overflow-hidden min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <Activity className="w-5 h-5 text-[#FF9500]" />
                 BTC/USDT Performance
               </h3>
               <div className="flex gap-2">
                 {['1H', '4H', '1D', '1W'].map((tf) => (
                   <button key={tf} className="px-3 py-1 text-xs font-medium rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                     {tf}
                   </button>
                 ))}
               </div>
            </div>
            
            {/* Fake Chart Graphic */}
            <div className="w-full h-64 flex items-end justify-between gap-1 px-4 opacity-50">
               {[40, 60, 45, 70, 55, 80, 65, 90, 75, 50, 60, 85, 95, 80, 70, 60, 80, 100, 90, 85].map((h, i) => (
                 <div 
                   key={i} 
                   className="w-full bg-gradient-to-t from-[#FF9500]/10 to-[#FF9500] rounded-t-sm hover:opacity-100 transition-opacity cursor-crosshair"
                   style={{ height: `${h}%` }}
                 />
               ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#151921] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Recent Alerts Feed */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#151921] border border-white/5 shadow-xl h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FF9500]" />
                Recent Alerts
              </h3>
              <button className="text-xs text-[#FF9500] hover:text-[#FF9500]/80 font-medium">View All</button>
            </div>
            
            <div className="space-y-3">
              <AlertRow 
                symbol="BTC/USDT" 
                type="Price" 
                condition="> $64,000" 
                price="$64,230" 
                time="2m ago" 
              />
              <AlertRow 
                symbol="ETH/USDT" 
                type="Technical" 
                condition="RSI > 70" 
                price="$3,450" 
                time="15m ago" 
              />
              <AlertRow 
                symbol="SOL/USDT" 
                type="Price" 
                condition="< $140" 
                price="$138.50" 
                time="1h ago" 
              />
              <AlertRow 
                symbol="DOGE/USDT" 
                type="Volume" 
                condition="Spike > 500%" 
                price="$0.16" 
                time="3h ago" 
              />
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#FF9500]/20 to-transparent border border-[#FF9500]/20 text-center">
              <p className="text-sm text-slate-300 mb-3">Upgrade to Pro for unlimited alerts and SMS notifications.</p>
              <button className="w-full py-2 bg-[#FF9500] text-white rounded-lg text-sm font-bold hover:bg-[#FF9500]/90 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
