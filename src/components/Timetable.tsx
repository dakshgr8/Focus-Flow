"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { TimeBlock, TimeBlockStatus } from "@/lib/types";

// 8 AM to 11 PM (23:00)
const HOURS = Array.from({ length: 16 }, (_, i) => i + 8);
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function Timetable() {
    const { timeBlocks, addTimeBlock, updateTimeBlockStatus, removeTimeBlock } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBlock, setNewBlock] = useState<Partial<TimeBlock>>({
        day: "Mon",
        startTime: "09:00",
        endTime: "10:00",
        type: "study",
        status: "upcoming",
    });

    const handleAddBlock = () => {
        if (newBlock.title && newBlock.day && newBlock.startTime && newBlock.endTime) {
            addTimeBlock({
                id: Math.random().toString(36).substr(2, 9),
                ...newBlock as any, // Cast for simple mock
            });
            setIsModalOpen(false);
            setNewBlock({
                day: "Mon",
                startTime: "09:00",
                endTime: "10:00",
                type: "study",
                status: "upcoming",
                title: ""
            });
        }
    };

    const statusColors = {
        done: "bg-emerald-100 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300",
        missed: "bg-red-100 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300",
        "in-progress": "bg-amber-100 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300",
        upcoming: "bg-indigo-100 border-indigo-200 text-indigo-800 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300"
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Weekly Schedule</h2>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Class/Session
                </Button>
            </div>

            <div className="rounded-xl border bg-card shadow overflow-x-auto">
                <div className="min-w-[800px]">
                    <div className="grid grid-cols-8 border-b">
                        <div className="p-4 font-semibold text-muted-foreground">Time</div>
                        {DAYS.map((day) => (
                            <div key={day} className="p-4 font-semibold text-center border-l">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-8">
                        {HOURS.map(hour => (
                            <div key={hour} className="contents">
                                <div className="p-4 text-xs text-muted-foreground border-b border-r text-right pr-4 align-top h-20">
                                    {hour}:00
                                </div>
                                {DAYS.map(day => {
                                    // Find blocks that start at this hour (simple mock logic)
                                    const blocks = timeBlocks.filter(b => b.day === day && parseInt(b.startTime.split(':')[0]) === hour);

                                    return (
                                        <div key={`${day}-${hour}`} className="border-b border-l relative h-20 group">
                                            {blocks.map(block => (
                                                <div
                                                    key={block.id}
                                                    className={cn(
                                                        "absolute inset-x-1 top-1 bottom-1 rounded-md border p-2 text-xs font-medium cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md z-10 flex flex-col justify-between group/block",
                                                        statusColors[block.status]
                                                    )}
                                                    onClick={() => {
                                                        const nextStatus = block.status === 'upcoming' ? 'in-progress' : block.status === 'in-progress' ? 'done' : 'upcoming';
                                                        updateTimeBlockStatus(block.id, nextStatus as TimeBlockStatus);
                                                    }}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <span>{block.title}</span>
                                                        <button
                                                            className="opacity-0 group-hover/block:opacity-100 hover:text-red-600 transition-opacity p-0.5"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeTimeBlock(block.id);
                                                            }}
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                    <span className="text-[10px] opacity-70 uppercase tracking-wider">{block.type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Add Session</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    placeholder="Math Class"
                                    value={newBlock.title || ""}
                                    onChange={e => setNewBlock({ ...newBlock, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Day</label>
                                    <select
                                        className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                        value={newBlock.day}
                                        onChange={e => setNewBlock({ ...newBlock, day: e.target.value })}
                                    >
                                        {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Start Time</label>
                                    <select
                                        className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                        value={newBlock.startTime}
                                        onChange={e => setNewBlock({ ...newBlock, startTime: e.target.value })}
                                    >
                                        {HOURS.map(h => <option key={h} value={`${h}:00`}>{h}:00</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button onClick={handleAddBlock}>Create Block</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
