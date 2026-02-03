"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

import { useStore } from "@/lib/store";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function AnalyticsChart() {
    const { dailyFocusHistory } = useStore();

    const data = DAYS.map(day => {
        // Find date for this day in the current week (simple approach: just check if we have data for 'day' matches? No, we need actual dates)
        // Better: Just show the last 7 days dynamically or map specific weekdays if we want fixed axis.
        // Let's stick to "Last 7 Days" logic for analytics which is more useful.
        // But the UI labels are Mon, Tue... 

        // Let's implement a helper to get data for the most recent occurrence of this weekday
        // Or simplified: iterate through history, find entry where date corresponds to this weekday and is within last 7 days.

        // Simpler approach for now: Map last 7 days relative to today.
        // If we want to keep the Mon-Sun axis:

        const today = new Date();
        const currentDay = today.getDay(); // 0-6 Sun-Sat
        // We want to find the date for "Mon", "Tue" of the CURRENT week.
        // This is a bit complex to do perfectly in one line.

        // Alternative: Just sum up any data that matches this weekday name (aggregating history? No that's bad).

        // Let's use "Last 7 Days" instead of fixed Mon-Sun axis? 
        // User saw Mon-Sun before.
        // Let's reconstruct the current week's minutes.

        // Find the date of the "Mon" of current week.
        const d = new Date();
        const dayIdx = d.getDay() || 7; // make Sun=7
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - dayIdx + 1); // Monday

        // Now d is Monday.
        const weekDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(d);
            date.setDate(d.getDate() + i);
            return date.toISOString().split('T')[0];
        });

        // DAYS array is Mon...Sun
        const dateStr = weekDates[DAYS.indexOf(day)];
        const minutes = dailyFocusHistory[dateStr] || 0;

        return {
            name: day,
            hours: parseFloat((minutes / 60).toFixed(1))
        };
    });

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
