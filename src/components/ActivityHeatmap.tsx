"use client";

import { ActivityCalendar } from 'react-activity-calendar';
// Note: If build fails with no default export, try:
// import { ActivityCalendar } from 'react-activity-calendar';
// But usually it is default. The error said "does not contain a default export".
// Let's try named import as the error suggested implicity? No, error said "imported as ActivityCalendar" which is default import syntax. 
// I will try named import now.

import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export function ActivityHeatmap() {
    const { dailyFocusHistory } = useStore();
    const [data, setData] = useState<Array<{ date: string; count: number; level: number }>>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Transform dailyFocusHistory Record<string, number> where number is minutes
        const transformedData = Object.entries(dailyFocusHistory || {}).map(([date, minutes]) => {
            const hours = Math.round((minutes / 60) * 10) / 10;

            // Level 0-4
            let level = 0;
            if (hours >= 4) level = 4;
            else if (hours >= 2) level = 3;
            else if (hours >= 1) level = 2;
            else if (hours > 0) level = 1;

            return {
                date,
                count: minutes,
                level
            };
        });

        // Ensure at least one entry exists to render the calendar correctly
        if (transformedData.length === 0) {
            const today = new Date().toISOString().split('T')[0];
            setData([{ date: today, count: 0, level: 0 }]);
        } else {
            setData(transformedData);
        }

    }, [dailyFocusHistory]);

    if (!mounted) return null;

    return (
        <div className="w-full flex justify-center p-4">
            <ActivityCalendar
                data={data}
                theme={{
                    light: ['#e2e8f0', '#c7d2fe', '#818cf8', '#4f46e5', '#312e81'],
                    dark: ['#1e293b', '#312e81', '#4f46e5', '#818cf8', '#c7d2fe'],
                }}
                labels={{
                    legend: {
                        less: 'Less',
                        more: 'More',
                    },
                    months: [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                    ],
                    totalCount: '{{count}} mins focused in {{year}}',
                    weekdays: [
                        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
                    ]
                }}
                colorScheme="light"
                showWeekdayLabels
            />
        </div>
    );
}
