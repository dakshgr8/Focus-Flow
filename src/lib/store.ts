import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type Task, type Goal, type TimeBlock } from './types';

interface User {
    name: string;
    email: string;
}

interface AppState {
    // Auth
    isAuthenticated: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;

    // Data
    goals: Goal[];
    timeBlocks: TimeBlock[];
    isZenMode: boolean;
    totalFocusTime: number; // in minutes
    dailyFocusHistory: Record<string, number>; // { 'Mon': 30, 'Tue': 60 } (minutes)

    // Actions
    toggleZenMode: () => void;
    addGoal: (goal: Goal) => void;
    updateGoalProgress: (id: string, progress: number) => void;
    removeGoal: (id: string) => void;
    addTaskToGoal: (goalId: string, taskTitle: string) => void;
    toggleTaskCompletion: (goalId: string, taskId: string) => void;
    addTimeBlock: (block: TimeBlock) => void;
    updateTimeBlockStatus: (id: string, status: TimeBlock['status']) => void;
    removeTimeBlock: (id: string) => void;
    addFocusTime: (minutes: number) => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            // Auth
            isAuthenticated: false,
            user: null,
            login: (user) => set({ isAuthenticated: true, user }),
            logout: () => set({ isAuthenticated: false, user: null }),

            // Data
            goals: [],
            timeBlocks: [],
            isZenMode: false,
            totalFocusTime: 0,
            dailyFocusHistory: {},

            toggleZenMode: () => set((state) => ({ isZenMode: !state.isZenMode })),

            addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),

            updateGoalProgress: (id, progress) => set((state) => ({
                goals: state.goals.map((g) => g.id === id ? { ...g, progress } : g)
            })),

            addTimeBlock: (block) => set((state) => ({ timeBlocks: [...state.timeBlocks, block] })),

            updateTimeBlockStatus: (id, status) => set((state) => ({
                timeBlocks: state.timeBlocks.map((b) => b.id === id ? { ...b, status } : b)
            })),

            removeTimeBlock: (id: string) => set((state) => ({
                timeBlocks: state.timeBlocks.filter((b) => b.id !== id)
            })),

            addTaskToGoal: (goalId: string, taskTitle: string) => set((state) => ({
                goals: state.goals.map(g => {
                    if (g.id !== goalId) return g;
                    const newTask: Task = {
                        id: Math.random().toString(36).substr(2, 9),
                        title: taskTitle,
                        isCompleted: false
                    };
                    return { ...g, tasks: [...g.tasks, newTask], progress: Math.floor((g.tasks.filter(t => t.isCompleted).length / (g.tasks.length + 1)) * 100) };
                })
            })),

            removeGoal: (id: string) => set((state) => ({
                goals: state.goals.filter((g) => g.id !== id)
            })),

            toggleTaskCompletion: (goalId: string, taskId: string) => set((state) => ({
                goals: state.goals.map(g => {
                    if (g.id !== goalId) return g;
                    const updatedTasks = g.tasks.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t);
                    const completedCount = updatedTasks.filter(t => t.isCompleted).length;
                    return { ...g, tasks: updatedTasks, progress: Math.floor((completedCount / updatedTasks.length) * 100) };
                })
            })),

            addFocusTime: (minutes) => set((state) => {
                const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
                const currentDaily = state.dailyFocusHistory?.[today] || 0;

                return {
                    totalFocusTime: state.totalFocusTime + minutes,
                    dailyFocusHistory: {
                        ...state.dailyFocusHistory,
                        [today]: currentDaily + (minutes / 60) // Store in hours for chart, or minutes and convert later. Let's store minutes for precision and convert in UI.
                    }
                };
            }),
        }),
        {
            name: 'student-dashboard-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
