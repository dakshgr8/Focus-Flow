"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

import { useStore } from "@/lib/store";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function AnalyticsChart() {
    const { dailyFocusHistory } = useStore();

    const data = DAYS.map(day => ({
        name: day,
        hours: parseFloat(((dailyFocusHistory?.[day] || 0) / 60).toFixed(1))
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}h`}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    formatter={(value: any) => [`${value}h`, 'Focus Time']}
                />
                <Bar
                    dataKey="hours"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                    fill="currentColor"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
