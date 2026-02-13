import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Brain, Activity, Dna, ArrowRight, FlaskConical, Microscope } from 'lucide-react';

const About = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-24 relative overflow-hidden">
           
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/[0.03] blur-[120px] rounded-full pointer-events-none -z-10" />

           
            <section className="text-center py-12 md:py-20 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase mb-6">
                        The Mission
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] uppercase">
                        Decoding <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 italic">Metabolic Truth</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium"
                >
                    Health isn't a game of willpower—it's a game of data. By making the invisible visible, we provide the blueprints to rewrite your biological destiny.
                </motion.p>
            </section>

            
            <section className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-3 text-center mb-6">
                    <h2 className="text-[10px] font-black text-zinc-500 tracking-[0.4em] uppercase">Core Biological Principles</h2>
                    <p className="text-2xl font-black text-white mt-2 uppercase tracking-tighter">Glycemic Variability</p>
                </div>

                {[
                    {
                        title: "The Fuel",
                        desc: "Glucose is raw energy. But flooding your engine causes oxidative stress. Stability is the key to mental longevity.",
                        icon: <Activity className="w-6 h-6 text-emerald-400" />,
                        accent: "bg-emerald-500/20",
                        border: "hover:border-emerald-500/30"
                    },
                    {
                        title: "The Spike",
                        desc: "Rapid rises trigger insulin floods and immediate inflammation. It is the primary signal for fat storage.",
                        icon: <Target className="w-6 h-6 text-red-400" />,
                        accent: "bg-red-500/20",
                        border: "hover:border-red-500/30"
                    },
                    {
                        title: "The Crash",
                        desc: "The post-spike drop creates reactive hypoglycemia, killing focus and mood. This is the root of the 'slump'.",
                        icon: <Brain className="w-6 h-6 text-blue-400" />,
                        accent: "bg-blue-500/20",
                        border: "hover:border-blue-500/30"
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        {...fadeInUp}
                        transition={{ delay: i * 0.1 }}
                        className={`p-10 rounded-[32px] bg-zinc-900/20 border border-white/5 backdrop-blur-md ${item.border} transition-all duration-500 group relative overflow-hidden`}
                    >
                        <div className={`absolute -top-10 -right-10 w-24 h-24 ${item.accent} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                        <p className="text-zinc-500 leading-relaxed text-sm font-medium">{item.desc}</p>
                    </motion.div>
                ))}
            </section>

           
            <section className="grid md:grid-cols-2 gap-8 items-center bg-white/[0.01] border border-white/5 p-8 md:p-16 rounded-[48px] backdrop-blur-sm">
                <motion.div {...fadeInUp}>
                    <div className="flex items-center gap-2 mb-4">
                        <FlaskConical className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">The Protocol</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Data Over Dogma</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-medium">
                        We don't preach specific diets. We focus on <span className="text-white font-bold">your response</span> to food. Our optimization loop is purely technical:
                    </p>
                    <div className="space-y-4">
                        {[
                            { label: "Measure", desc: "Log inputs and observe the saturation.", icon: <Activity size={14} /> },
                            { label: "Analyze", desc: "Identify personal metabolic triggers.", icon: <Microscope size={14} /> },
                            { label: "Optimize", desc: "Neutralize spikes via active movement.", icon: <Dna size={14} /> }
                        ].map((step, i) => (
                            <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-black/40 border border-white/5 hover:bg-white/5 transition-colors group">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-bold shadow-lg shadow-emerald-500/10 group-hover:rotate-6 transition-transform">
                                    {step.icon}
                                </div>
                                <div>
                                    <span className="text-sm font-black text-white uppercase tracking-wider block">{step.label}</span>
                                    <span className="text-zinc-500 text-[11px] font-bold uppercase">{step.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
                <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="relative">
                    <div className="aspect-square rounded-[40px] bg-zinc-950 border border-white/5 overflow-hidden flex items-center justify-center relative group">
                        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Dna className="w-64 h-64 text-zinc-900 group-hover:text-emerald-500/10 transition-colors duration-1000" />
                        <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                            <blockquote className="text-2xl font-black text-white italic leading-tight">
                                "If you cannot measure it, <br /> you cannot <span className="text-emerald-500">improve</span> it."
                            </blockquote>
                        </div>
                    </div>
                </motion.div>
            </section>

            
            <section className="max-w-4xl mx-auto py-12">
                <div className="text-center mb-16">
                    <h2 className="text-[10px] font-black text-zinc-500 tracking-[0.4em] uppercase mb-2">Transparency</h2>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Common Questions</h2>
                </div>
                <div className="grid gap-4">
                    {[
                        { q: "Do I need a sensor (CGM)?", a: "No. While CGMs offer deeper resolution, our system uses predictive algorithms based on verified glycemic loads to estimate your metabolic stress." },
                        { q: "Is this medical advice?", a: "Negative. This is a technical wellness tool for lifestyle optimization. Always consult a physician for clinical health matters." },
                        { q: "Why gamify metabolic health?", a: "Because dopamine drives behavior. We use the same neuro-psychology that fuels gaming to make health consistency a default state." }
                    ].map((faq, i) => (
                        <motion.div
                            key={i}
                            {...fadeInUp}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all group"
                        >
                            <h3 className="text-lg font-black text-white mb-3 flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {faq.q}
                            </h3>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium pl-4 border-l border-white/10">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;