
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
    persist(
        (set, get) => ({
            profile: {
                name: '',
                age: 22,
                gender: '',
                height: 170,
                weight: 70,
                bmi: 24.2,
                dailyLimit: 30,
                onboarded: false,
                avatar: '👤',
                activity: {
                    steps: 4500,
                    sleepHours: 7,
                },
                anonymousID: null 
            },
            history: [],
            totalToday: 0,
            streak: 3,
            loading: false,

            setProfile: async (updates) => {
                set((state) => ({
                    profile: { ...state.profile, ...updates }
                }));

                const state = get();
                if (updates.height || updates.weight) {
                    get().calculateBMI();
                }

               
                if (updates.onboarded && !state.profile.anonymousID) {
                    try {
                        const anonymousID = Math.random().toString(36).substr(2, 9);
                        const res = await fetch('/api/users', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                anonymousID,
                                age: state.profile.age,
                                bmi: state.profile.bmi
                            })
                        });
                        if (res.ok) {
                            const user = await res.json();
                            set(s => ({ profile: { ...s.profile, anonymousID: user.anonymousID } }));
                        }
                    } catch (error) {
                        console.error("Failed to create user in backend", error);
                    }
                }
            },

            calculateBMI: () => set((state) => {
                const heightMeters = state.profile.height / 100;
                const bmi = state.profile.weight / (heightMeters * heightMeters);
                return {
                    profile: { ...state.profile, bmi: parseFloat(bmi.toFixed(1)) }
                };
            }),

            addEntry: async (entry) => {
                
                set((state) => {
                    const newHistory = [entry, ...state.history];
                    const today = new Date().setHours(0, 0, 0, 0);
                    const total = newHistory
                        .filter(e => new Date(e.timestamp).setHours(0, 0, 0, 0) === today)
                        .reduce((acc, curr) => acc + curr.sugarGrams, 0);

                    return {
                        history: newHistory,
                        totalToday: total
                    };
                });

              
                const state = get();
                if (state.profile.anonymousID) {
                    try {
                      
                    } catch (e) {
                        console.error(e);
                    }
                }
                
            },

            
            syncWithBackend: async () => {
              
            },

            removeEntry: (id) => set((state) => {
                const newHistory = state.history.filter(e => e.id !== id);
                const today = new Date().setHours(0, 0, 0, 0);
                const total = newHistory
                    .filter(e => new Date(e.timestamp).setHours(0, 0, 0, 0) === today)
                    .reduce((acc, curr) => acc + curr.sugarGrams, 0);

                return {
                    history: newHistory,
                    totalToday: total
                };
            }),

            incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),

            resetProgress: () => set({
                history: [],
                totalToday: 0,
                streak: 0
            }),
        }),
        {
            name: 'beat-the-sugar-spike-storage',
        }
    )
);
