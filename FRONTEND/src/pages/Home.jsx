import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Shield, Zap, ArrowRight, TrendingUp, Heart, MousePointer2, Sparkles } from 'lucide-react';

const Home = () => {
    
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    };

    const staggerContainer = {
        animate: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="relative overflow-hidden bg-[#060608] text-zinc-100">
          
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 pt-10 pb-20 space-y-32 relative z-10">

               
                <section className="flex flex-col items-center text-center py-24 md:py-40 relative">
                
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 mb-10 backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400">v2.0 Protocol Live</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] uppercase"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-600">
                            Control Your
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400 italic">
                            Energy Curve
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-14 leading-relaxed font-medium"
                    >
                        Visualize the invisible. Predict sugar spikes before they happen and maintain peak cognitive performance with AI-driven metabolic insights.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-6 z-10"
                    >
                        <Link to="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all"
                            >
                                Launch System <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                        <Link to="/about">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 bg-transparent text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all"
                            >
                                The Science
                            </motion.button>
                        </Link>
                    </motion.div>
                </section>

                
                <section className="grid md:grid-cols-2 gap-20 items-center">
                    <motion.div {...fadeInUp} className="order-2 md:order-1 relative group">
                        <div className="absolute -inset-4 bg-red-500/10 blur-3xl rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative aspect-square rounded-[48px] bg-zinc-900/30 border border-white/5 overflow-hidden flex flex-col items-center justify-center p-12 backdrop-blur-md">
                            <div className="absolute top-10 left-10 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Active Spike</span>
                            </div>

                          

                            <TrendingUp className="w-64 h-64 text-red-500/20 absolute -z-10" strokeWidth={0.5} />
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="text-9xl font-black text-red-500 tracking-tighter drop-shadow-lg"
                            >
                                165
                            </motion.div>
                            <div className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs">mg/dL • Warning Level</div>

                            <div className="mt-12 w-full space-y-4">
                                <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                    <span>Metabolic Stress</span>
                                    <span>84%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '84%' }}
                                        className="h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="order-1 md:order-2 space-y-8">
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
                            The Invisible <br />
                            <span className="text-zinc-700">Rollercoaster</span>
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                            Hidden sugars trigger a biological chain reaction: insulin surges, focus evaporates, and the "Post-Lunch Crash" begins. It’s not a lack of willpower—it's a lack of data.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {["Cognitive Fog", "Energy Crashes", "Sugar Cravings", "Chronic Fatigue"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-red-500/20 transition-all">
                                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                                    <span className="text-sm font-bold text-zinc-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                
                <section className="text-center relative py-20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

                    <motion.span {...fadeInUp} className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Capabilities</motion.span>
                    <motion.h2 {...fadeInUp} className="text-5xl md:text-7xl font-black text-white mb-20 uppercase tracking-tighter">Engineered For Clarity</motion.h2>

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {[
                            {
                                icon: <Shield className="w-8 h-8 text-emerald-400" />,
                                title: "Smart Shield",
                                desc: "Dynamic intake monitoring with real-time threshold warnings.",
                                bg: "from-emerald-500/10 to-transparent"
                            },
                            {
                                icon: <Activity className="w-8 h-8 text-blue-400" />,
                                title: "Analytics Engine",
                                desc: "Deep-dive into glucose history with frequency heatmap analysis.",
                                bg: "from-blue-500/10 to-transparent"
                            },
                            {
                                icon: <Zap className="w-8 h-8 text-yellow-400" />,
                                title: "XP Protocol",
                                desc: "Maintain consistency through gamified streaks and ranking.",
                                bg: "from-yellow-500/10 to-transparent"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                transition={{ delay: i * 0.1 }}
                                className={`p-10 rounded-[40px] bg-gradient-to-b ${feature.bg} border border-white/5 hover:border-white/20 backdrop-blur-md transition-all group text-left relative overflow-hidden`}
                            >
                                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/[0.02] rounded-full blur-3xl group-hover:bg-white/[0.05] transition-colors" />
                                <div className="w-16 h-16 rounded-[22px] bg-white/5 flex items-center justify-center mb-10 text-white group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-black tracking-tight mb-4 text-white uppercase">{feature.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

              
                <section className="bg-gradient-to-br from-zinc-900/40 to-black/60 rounded-[64px] p-12 md:p-24 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <Activity className="w-[500px] h-[500px] text-emerald-500" strokeWidth={0.5} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <motion.div {...fadeInUp} className="space-y-12">
                            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                                Operational <br />
                                <span className="text-emerald-500 italic">Workflow</span>
                            </h2>
                            <div className="space-y-12 relative">
                                <div className="absolute left-7 top-0 bottom-0 w-[1px] bg-white/5" />
                                {[
                                    { step: "01", title: "Data Input", desc: "Log glucose inputs from meals, snacks, or drinks in seconds." },
                                    { step: "02", title: "Live Tracking", desc: "Observe the real-time impact on your metabolic saturation meter." },
                                    { step: "03", title: "Active Recovery", desc: "Execute automated walk protocols to flatten the curve." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-12 group relative z-10">
                                        <span className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-xs font-black text-emerald-500 group-hover:border-emerald-500 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-500">
                                            {item.step}
                                        </span>
                                        <div>
                                            <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">{item.title}</h4>
                                            <p className="text-zinc-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="relative hidden md:block">
                            <div className="bg-black/80 rounded-[48px] p-10 border border-zinc-800 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-1000">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                                    </div>
                                    <div className="text-[10px] text-zinc-600 font-black tracking-widest uppercase">System.Protocol</div>
                                </div>
                                <div className="space-y-8">
                                    <div className="h-44 bg-emerald-500/5 rounded-[32px] border border-emerald-500/10 flex items-center justify-center">
                                        <Activity className="w-20 h-20 text-emerald-500 animate-pulse" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="p-6 bg-zinc-900 rounded-[32px] border border-zinc-800">
                                            <div className="text-[10px] font-black text-zinc-600 mb-1 uppercase tracking-widest">Streak</div>
                                            <div className="text-2xl font-black text-white">12</div>
                                        </div>
                                        <div className="p-6 bg-zinc-900 rounded-[32px] border border-zinc-800">
                                            <div className="text-[10px] font-black text-zinc-600 mb-1 uppercase tracking-widest">Rank</div>
                                            <div className="text-2xl font-black text-emerald-500">Top 5</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

              
                <section className="py-24 border-y border-white/5 bg-white/[0.01] backdrop-blur-sm -mx-4 px-4 overflow-hidden relative">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
                        {[
                            { val: "15k+", label: "Protocol Logs" },
                            { val: "2.4k", label: "Monthly Actives" },
                            { val: "100%", label: "System Uptime" }
                        ].map((stat, i) => (
                            <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }}>
                                <div className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">{stat.val}</div>
                                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em]">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

              
                <section className="text-center py-32 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/[0.05] blur-[150px] rounded-full" />
                    <motion.h2 {...fadeInUp} className="text-5xl md:text-9xl font-black text-white mb-14 uppercase tracking-tighter leading-none">
                        Enter The <br /><span className="text-emerald-400">Protocol</span>
                    </motion.h2>
                    <Link to="/auth?mode=register">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(16,185,129,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-16 py-8 bg-emerald-500 text-black rounded-[32px] font-black text-sm uppercase tracking-[0.4em] transition-all hover:bg-emerald-400"
                        >
                            Join Now
                        </motion.button>
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default Home;