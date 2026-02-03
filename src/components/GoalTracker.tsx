"use client";

import { useState } from "react";
import { Plus, CheckCircle2, Circle, Trophy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useStore } from "@/lib/store";
import { Goal, Task } from "@/lib/types";
import { cn } from "@/lib/utils";

export function GoalTracker() {
    const { goals, addGoal, addTaskToGoal, toggleTaskCompletion, removeGoal } = useStore();
    const [newGoalTitle, setNewGoalTitle] = useState("");
    const [newTaskTitle, setNewTaskTitle] = useState<Record<string, string>>({});

    const handleAddGoal = () => {
        if (!newGoalTitle.trim()) return;
        const goal: Goal = {
            id: Math.random().toString(36).substr(2, 9),
            title: newGoalTitle,
            tasks: [],
            progress: 0
        };
        addGoal(goal);
        setNewGoalTitle("");
    };

    const handleAddTask = (goalId: string) => {
        const title = newTaskTitle[goalId];
        if (!title || !title.trim()) return;

        addTaskToGoal(goalId, title);
        setNewTaskTitle({ ...newTaskTitle, [goalId]: "" });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold tracking-tight">Goals & Habits</h2>
                <p className="text-muted-foreground">Break down your big dreams into small steps.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="md:col-span-1 border-indigo-200 dark:border-indigo-900 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-amber-500" />
                            Create New Macro Goal
                        </CardTitle>
                        <CardDescription>What do you want to achieve?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="e.g., Master React.js"
                                value={newGoalTitle}
                                onChange={(e) => setNewGoalTitle(e.target.value)}
                            />
                            <Button onClick={handleAddGoal}>Create</Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {goals.length === 0 && (
                        <div className="text-center p-8 border rounded-xl border-dashed text-muted-foreground">
                            No goals set yet. Start by creating one!
                        </div>
                    )}

                    {goals.map(goal => (
                        <Card key={goal.id} className="transition-all hover:border-emerald-500/50">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="w-full">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg">{goal.title}</CardTitle>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-muted-foreground hover:text-red-500"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeGoal(goal.id);
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <div className="text-sm text-muted-foreground">{goal.progress}% Completed</div>
                                            {goal.progress === 100 && <CheckCircle2 className="text-emerald-500 h-5 w-5" />}
                                        </div>
                                    </div>
                                </div>
                                <Progress value={goal.progress} className="h-2 mt-2" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Micro Steps</p>
                                        {goal.tasks.length === 0 && (
                                            <p className="text-xs text-muted-foreground italic">No steps added yet.</p>
                                        )}
                                        {goal.tasks.map(task => (
                                            <div
                                                key={task.id}
                                                className="flex items-center gap-2 text-sm cursor-pointer group"
                                                onClick={() => toggleTaskCompletion(goal.id, task.id)}
                                            >
                                                <div className={cn("h-4 w-4 shrink-0 rounded-full border flex items-center justify-center transition-colors", task.isCompleted ? "bg-emerald-500 border-emerald-500" : "border-slate-300 group-hover:border-emerald-400")}>
                                                    {task.isCompleted && <CheckCircle2 className="h-3 w-3 text-white" />}
                                                </div>
                                                <span className={cn(task.isCompleted && "line-through text-muted-foreground")}>{task.title}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add a step..."
                                            className="h-8 text-sm"
                                            value={newTaskTitle[goal.id] || ""}
                                            onChange={(e) => setNewTaskTitle({ ...newTaskTitle, [goal.id]: e.target.value })}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleAddTask(goal.id);
                                            }}
                                        />
                                        <Button size="sm" variant="outline" className="h-8" onClick={() => handleAddTask(goal.id)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
