import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Onboarding } from '../components/Onboarding';
import { BentoGrid, BentoItem } from '../components/BentoGrid';
import { SugarEntry } from '../components/SugarEntry';
import { SugarShield } from '../components/SugarShield';
import { Leaderboard } from '../components/Leaderboard';
import SugarHeatmap from '../components/SugarHeatmap';
import { generateInsight } from '../services/insightService';
import {
    Activity, Flame, History, Trophy, Zap, Trash2, Droplet,
    Coffee, Cookie, Apple, ChevronDown, ChevronUp, Sparkles, Wind, X, Target
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const { profile, history, totalToday, streak, removeEntry, addEntry, initializeData, notification, getXPStats, leaderboard } = useStore();
    const [mounted, setMounted] = useState(false);
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);

    useEffect(() => {
        let interval;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        } else if (timerActive && timeLeft === 0) {
            completeAction('Walk', true);
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const completeAction = (type, isRec = false) => {
        addEntry({
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            foodName: type === 'Walk' ? '10-min Walk' : type,
            sugarGrams: 0,
            category: 'exercise',
            method: 'Auto-Log',
            isRecommendation: isRec
        });
        setTimerActive(false);
        setTimeLeft(600);
    };

    const handleRecommendationClick = (rec) => {
        if (rec.type === 'activity') setTimerActive(true);
        else completeAction(rec.action, true);
    };

    useEffect(() => {
        setMounted(true);
        initializeData();
    }, []);

    if (!mounted) return null;

    const { xpToday, xpMonth } = getXPStats ? getXPStats() : { xpToday: 0, xpMonth: 0 };
    const percentage = Math.min((totalToday / (profile.dailyLimit || 30)) * 100, 100) || 0;
    const statusColor = percentage > 90 ? '#ef4444' : percentage > 70 ? '#fb923c' : '#10b981';
    const statusColorTailwind = percentage > 90 ? 'text-red-500' : percentage > 70 ? 'text-orange-400' : 'text-emerald-400';

    const insight = generateInsight(profile, history);

    const quickActions = [
        { label: 'Soda', grams: 39, icon: <Droplet className="w-4 h-4" />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Coffee', grams: 5, icon: <Coffee className="w-4 h-4" />, color: 'text-amber-600', bg: 'bg-amber-600/10' },
        { label: 'Snack', grams: 12, icon: <Cookie className="w-4 h-4" />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
        { label: 'Fruit', grams: 15, icon: <Apple className="w-4 h-4" />, color: 'text-red-400', bg: 'bg-red-400/10' },
    ];

    const chartData = [...history].slice(0, 8).reverse().map(e => ({
        time: new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        grams: e.sugarGrams
    }));

    return (
        <div className="pb-44 pt-4 px-4 max-w-7xl mx-auto space-y-6 selection:bg-emerald-500/30">
            <AnimatePresence>
                {!profile.onboarded && <Onboarding />}
            </AnimatePresence>

            
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-[24px] backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
                        <Activity className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black tracking-widest text-zinc-500 uppercase">System Status: <span className="text-white">Active</span></h1>
                        <div className="flex gap-3 text-[10px] font-bold text-zinc-500 mt-0.5">
                            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-blue-400" /> {xpToday} XP TODAY</span>
                            <span className="flex items-center gap-1"><Target className="w-3 h-3 text-purple-400" /> {profile.points || 0} TOTAL</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                    <History className="w-4 h-4 text-zinc-600" />
                    <span className="text-[10px] font-black text-zinc-400 tracking-tighter uppercase">{profile.name || 'GUEST'}</span>
                </div>
            </header>

            <BentoGrid>
                
                <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                    
                    <BentoItem className="md:col-span-2 p-8 bg-gradient-to-br from-zinc-900/40 to-black/20 relative overflow-hidden group">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="w-44 h-44 relative shrink-0">
                                <SugarShield total={totalToday} limit={profile.dailyLimit} color={statusColor} />
                                <div className="absolute inset-0 rounded-full blur-[50px] opacity-10 -z-10" style={{ backgroundColor: statusColor }} />
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Metabolic Saturation</p>
                                <motion.h2 key={totalToday} className={`text-6xl font-black ${statusColorTailwind} tracking-tighter`}>
                                    {totalToday.toFixed(1)}<span className="text-2xl ml-1 text-zinc-600 font-bold uppercase">g</span>
                                </motion.h2>
                                <div className="mt-4 flex items-center gap-3">
                                    <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} className="h-full" style={{ backgroundColor: statusColor }} />
                                    </div>
                                    <span className="text-[10px] font-black text-zinc-500">{percentage.toFixed(0)}%</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center md:items-end gap-2 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                                <div className="p-3 bg-yellow-400/10 rounded-2xl border border-yellow-400/20">
                                    <Flame className="w-6 h-6 text-yellow-500" fill="currentColor" />
                                </div>
                                <span className="text-3xl font-black text-white">{streak}</span>
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Day Streak</span>
                            </div>
                        </div>
                    </BentoItem>

                    
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        <BentoItem className="md:col-span-2 p-6 bg-zinc-950/40 border-l-4 border-l-emerald-500">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/10 rounded-xl"><Wind className="w-5 h-5 text-emerald-500" /></div>
                                <div className="flex-1">
                                    <h3 className="text-md font-black text-white leading-tight mb-1">{insight.text}</h3>
                                    <p className="text-xs text-zinc-500 font-medium leading-relaxed mb-4">{insight.why}</p>

                                    {insight.recommendation && (
                                        <div className="bg-blue-500/5 border border-blue-500/10 p-3 rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Activity className="w-4 h-4 text-blue-400" />
                                                <span className="text-[10px] font-bold text-white uppercase">{insight.recommendation.action}</span>
                                            </div>
                                            <button onClick={() => handleRecommendationClick(insight.recommendation)} className="text-[9px] font-black bg-blue-500 px-3 py-1.5 rounded-lg text-white hover:bg-blue-400 transition-colors">START</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </BentoItem>

                        
                        <BentoItem className="p-6">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Express</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {quickActions.map((action) => (
                                    <button key={action.label} onClick={() => addEntry({
                                        id: Math.random().toString(36).substr(2, 9),
                                        timestamp: Date.now(),
                                        foodName: action.label,
                                        sugarGrams: action.grams,
                                        method: 'Manual'
                                    })} className="flex flex-col items-center p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all group">
                                        <div className={`${action.color} group-hover:scale-110 transition-transform`}>{action.icon}</div>
                                        <span className="text-[8px] font-black text-zinc-500 mt-1 uppercase">{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        </BentoItem>
                    </div>

                    
                    <BentoItem className="md:col-span-1 p-6 h-[400px] flex flex-col">
                        <div className="flex items-center gap-2 mb-6"><History className="w-4 h-4 text-zinc-500" /><h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Logs</h3></div>
                        <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
                            {history.map(entry => (
                                <div key={entry.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-black text-white">{entry.foodName}</div>
                                    <div className="text-[10px] font-bold text-emerald-500">{entry.sugarGrams}g</div>
                                </div>
                            ))}
                        </div>
                    </BentoItem>

                    <BentoItem className="md:col-span-1 p-6 h-[400px]">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6">Metabolic Flow</h3>
                        <div className="w-full h-full pb-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <Area type="stepAfter" dataKey="grams" stroke={statusColor} strokeWidth={2} fillOpacity={0.05} fill={statusColor} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </BentoItem>
                </div>

                
                <div className="md:col-span-4 flex flex-col gap-6">
                    <BentoItem className="flex-1 min-h-[600px] bg-zinc-950/20 border-white/5 p-2">
                        <Leaderboard />
                    </BentoItem>

                    <BentoItem className="p-6 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
                        <div className="flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-purple-400" />
                            <div>
                                <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Global Rank</p>
                                <p className="text-xl font-black text-white italic">
                                    {leaderboard.findIndex(u => u._id === profile.mongoId) !== -1
                                        ? `#${leaderboard.findIndex(u => u._id === profile.mongoId) + 1}`
                                        : (leaderboard.length > 0 ? '> #10' : '#--')}
                                </p>
                            </div>
                        </div>
                    </BentoItem>
                </div>

                
                <BentoItem className="md:col-span-12 p-8 bg-black/40">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="shrink-0 text-center md:text-left">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">History Map</h3>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">Yearly Frequency</p>
                        </div>
                        <div className="w-full overflow-x-auto pb-2"><SugarHeatmap userId={profile.mongoId} /></div>
                    </div>
                </BentoItem>
            </BentoGrid>

           
            <AnimatePresence>
                {notification && (
                    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-zinc-900 border-2 border-yellow-400/50 p-6 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center gap-6">
                        <div className="bg-yellow-400 p-3 rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.4)]"><Trophy className="w-8 h-8 text-black" /></div>
                        <div>
                            <h4 className="text-2xl font-black text-white">+{notification.points} XP</h4>
                            <p className="text-xs text-yellow-400 font-black uppercase tracking-widest">{notification.messages[0]}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            
            <SugarEntry />

            <AnimatePresence>
                {timerActive && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6">
                        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-9xl font-black text-white tabular-nums tracking-tighter mb-12">
                            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                        </motion.div>
                        <h2 className="text-2xl font-black text-emerald-400 uppercase tracking-[0.5em] mb-8">Burn Mode Active</h2>
                        <button onClick={() => completeAction('Walk', true)} className="px-12 py-5 bg-emerald-500 text-black font-black text-xl rounded-full hover:scale-105 transition-all">CLAIM XP</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;