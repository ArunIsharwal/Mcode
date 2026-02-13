import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown } from 'lucide-react';

export const Leaderboard = () => {
    const { leaderboard, fetchLeaderboard, profile } = useStore();
    const [timeframe, setTimeframe] = useState('daily');

    useEffect(() => {
        fetchLeaderboard(timeframe);
    }, [timeframe]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-white">Leaderboard</h3>
                </div>

                <div className="flex bg-white/5 rounded-lg p-1">
                    {['daily', 'monthly'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTimeframe(t)}
                            className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${timeframe === t
                                    ? 'bg-yellow-400 text-black shadow-lg'
                                    : 'text-zinc-500 hover:text-white'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                <AnimatePresence mode="wait">
                    {leaderboard.map((user, index) => {
                        const isMe = user._id === profile.mongoId;
                        return (
                            <motion.div
                                key={user._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${isMe
                                        ? 'bg-yellow-400/10 border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.1)]'
                                        : 'bg-white/[0.02] border-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 flex items-center justify-center font-black rounded-lg ${index === 0 ? 'bg-yellow-400 text-black' :
                                            index === 1 ? 'bg-zinc-400 text-black' :
                                                index === 2 ? 'bg-orange-700 text-white' :
                                                    'bg-white/5 text-zinc-500'
                                        }`}>
                                        {index === 0 ? <Crown size={14} /> : index + 1}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-bold ${isMe ? 'text-yellow-400' : 'text-white'}`}>
                                            {user.username || 'Anonymous'} {isMe && '(You)'}
                                        </p>
                                        <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">{user.name || 'Warrior'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-black text-white">{user.xp} XP</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {leaderboard.length === 0 && (
                    <div className="text-center py-10 text-zinc-500 text-xs font-medium">
                        No warriors yet today. <br /> Be the first!
                    </div>
                )}
            </div>
        </div>
    );
};