import React, { useEffect, useState } from "react";
import { useStore } from "./store/useStore";
import { BentoGrid, BentoItem } from "./components/BentoGrid";
import { SugarEntry } from "./components/SugarEntry";
import { SugarShield } from "./components/SugarShield";
import SugarHeatmap from "./components/SugarHeatmap";
import GlobalPulse from "./components/GlobalPulse";
import { Onboarding } from "./components/Onboarding";

import { Flame, History, Trash2, Droplet, Coffee, Cookie } from "lucide-react";

const App = () => {
  const { profile, history, totalToday, streak, removeEntry, addEntry } =
    useStore();

  const [mounted, setMounted] = useState(false);

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

  const quickActions = [
    { label: "Soda", grams: 39, icon: <Droplet />, category: "soda" },
    { label: "Coffee", grams: 5, icon: <Coffee />, category: "coffee" },
    { label: "Snack", grams: 12, icon: <Cookie />, category: "snack" },
  ];

  const handleQuickAdd = (action) => {
    addEntry({
      id: Math.random().toString(36).slice(2),
      timestamp: Date.now(),
      foodName: action.label,
      sugarGrams: action.grams,
      category: action.category,
      method: "Manual",
    });
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white p-4">
      {!profile.onboarded && <Onboarding />}

      {/* HEADER */}
      <div className="max-w-6xl mx-auto py-6 flex justify-between items-center">
        <h1 className="font-black text-xl">BEAT THE SPIKE</h1>
        <History className="text-zinc-400" />
      </div>

      <BentoGrid>
        {/* SHIELD */}
        <BentoItem className="md:col-span-2 flex flex-col items-center">
          <SugarShield total={totalToday} limit={profile.dailyLimit} />
          <h2 className={`text-4xl font-black mt-4 ${statusColor}`}>
            {totalToday.toFixed(1)}g
          </h2>
        </BentoItem>

        {/* STREAK */}
        <BentoItem className="text-center">
          <Flame className="mx-auto text-yellow-400" />
          <h3 className="text-xl font-bold">{streak} Days</h3>
          <p className="text-xs text-zinc-500">Streak</p>
        </BentoItem>

        {/* HEATMAP */}
        <BentoItem>
          <SugarHeatmap userId={profile.anonymousID} />
        </BentoItem>

        {/* QUICK ACTIONS */}
        <BentoItem className="md:col-span-2">
          <h3 className="text-xs mb-3 text-zinc-500">Quick Add</h3>

          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => handleQuickAdd(a)}
                className="p-4 bg-white/5 rounded-xl"
              >
                {a.icon}
                <p className="text-sm font-bold mt-2">{a.label}</p>
              </button>
            ))}
          </div>
        </BentoItem>

        {/* TIMELINE */}
        <BentoItem className="md:col-span-4">
          <h3 className="font-bold mb-4">Timeline</h3>

          {history.length === 0 ? (
            <p className="text-zinc-500 text-sm">No logs yet</p>
          ) : (
            history.map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between bg-white/5 p-3 rounded-xl mb-2"
              >
                <div>
                  <p className="font-bold">{entry.foodName}</p>
                  <p className="text-xs text-zinc-500">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span>{entry.sugarGrams}g</span>
                  <button onClick={() => removeEntry(entry.id)}>
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
