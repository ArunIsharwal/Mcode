import React, { useEffect, useState } from "react";
import { useStore } from "./store/useStore";
import { Onboarding } from "./components/Onboarding";
import { BentoGrid, BentoItem } from "./components/BentoGrid";
import { SugarEntry } from "./components/SugarEntry";
import { SugarShield } from "./components/SugarShield";
import SugarHeatmap from "./components/SugarHeatmap";
import GlobalPulse from "./components/GlobalPulse";
import { generateInsight } from "./services/insightService";

import {
  Flame,
  History,
  Trash2,
  Droplet,
  Coffee,
  Cookie,
  Sparkles
} from "lucide-react";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

const App = () => {
  const { profile, history, totalToday, streak, removeEntry, addEntry } =
    useStore();

  const [mounted, setMounted] = useState(false);
  const [showInsight, setShowInsight] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const percentage = Math.min(
    (totalToday / profile.dailyLimit) * 100,
    100
  );

  const statusColor =
    percentage > 90
      ? "text-red-500"
      : percentage > 70
      ? "text-orange-400"
      : "text-emerald-400";

  const insight = generateInsight(profile, history);

  const quickActions = [
    { label: "Soda", grams: 39, icon: <Droplet />, category: "soda" },
    { label: "Coffee", grams: 5, icon: <Coffee />, category: "coffee" },
    { label: "Snack", grams: 12, icon: <Cookie />, category: "snack" },
    { label: "Dessert", grams: 25, icon: <Sparkles />, category: "dessert" }
  ];

  const handleQuickAdd = (action) => {
    addEntry({
      id: Math.random().toString(36).slice(2),
      timestamp: Date.now(),
      foodName: action.label,
      sugarGrams: action.grams,
      category: action.category,
      method: "Manual"
    });
  };

  const chartData = history
    .slice(-8)
    .map((e) => ({
      grams: e.sugarGrams
    }));

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 p-4">
      {!profile.onboarded && <Onboarding />}

     
      <div className="flex justify-between items-center max-w-6xl mx-auto py-6">
        <h1 className="font-black text-xl">BEAT THE SPIKE</h1>
        <History className="text-zinc-400" />
      </div>

      <BentoGrid>
      
        <BentoItem className="md:col-span-2 flex flex-col items-center">
          <SugarShield
            total={totalToday}
            limit={profile.dailyLimit}
          />
          <h2 className={`text-5xl font-black mt-4 ${statusColor}`}>
            {totalToday.toFixed(1)}g
          </h2>
        </BentoItem>

     
        <BentoItem className="text-center">
          <Flame className="mx-auto text-yellow-400 mb-2" />
          <h3 className="font-bold text-xl">{streak} Days</h3>
          <p className="text-xs text-zinc-500">Streak</p>
        </BentoItem>

       
        <BentoItem>
          <SugarHeatmap userId={profile.anonymousID} />
        </BentoItem>

       
        <BentoItem className="md:col-span-2">
          <h3 className="font-bold text-yellow-400 mb-2">
            {insight.text}
          </h3>

          <button
            onClick={() => setShowInsight(!showInsight)}
            className="text-xs text-zinc-400"
          >
            View insight
          </button>

          {showInsight && (
            <p className="text-sm text-zinc-400 mt-2">
              {insight.why}
            </p>
          )}
        </BentoItem>

     
        <BentoItem className="md:col-span-2">
          <h3 className="text-xs text-zinc-500 mb-3">
            Instant Log
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleQuickAdd(action)}
                className="p-4 bg-white/5 rounded-xl"
              >
                {action.icon}
                <p className="text-sm font-bold mt-2">
                  {action.label}
                </p>
                <span className="text-xs text-zinc-500">
                  {action.grams}g
                </span>
              </button>
            ))}
          </div>
        </BentoItem>

        {/* CHART */}
        <BentoItem className="md:col-span-2">
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={chartData}>
              <Area dataKey="grams" stroke="#10b981" />
            </AreaChart>
          </ResponsiveContainer>
        </BentoItem>

        {/* TIMELINE */}
        <BentoItem className="md:col-span-4">
          <h3 className="font-bold mb-4">Timeline</h3>

          {history.length === 0 ? (
            <p className="text-zinc-500 text-sm">
              No logs yet
            </p>
          ) : (
            history.map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between bg-white/5 p-3 rounded-xl mb-2"
              >
                <div>
                  <p className="font-bold">{entry.foodName}</p>
                  <p className="text-xs text-zinc-500">
                    {new Date(
                      entry.timestamp
                    ).toLocaleTimeString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span>{entry.sugarGrams}g</span>
                  <button
                    onClick={() => removeEntry(entry.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </BentoItem>
      </BentoGrid>

      <SugarEntry />
      <GlobalPulse />
    </div>
  );
};

export default App;
