"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export function TourGuide() {

    const startTour = () => {
        const driverObj = driver({
            showProgress: true,
            steps: [
                {
                    element: '#sidebar',
                    popover: {
                        title: 'Navigation',
                        description: 'Use this sidebar to switch between your Dashboard, Timetable, and Goals.'
                    }
                },
                {
                    element: '#pomodoro-timer',
                    popover: {
                        title: 'Focus Timer',
                        description: 'Track your study sessions here. Includes a Zen Mode and notifications!'
                    }
                },
                {
                    element: '#goal-tracker',
                    popover: {
                        title: 'Goal Tracking',
                        description: 'Set your big "Macro Goals" and break them down into bite-sized steps.'
                    }
                },
                {
                    element: '#theme-switcher',
                    popover: {
                        title: 'Themes',
                        description: 'Customize your look! Try Cyberpunk or Pink mode.'
                    }
                }
            ]
        });

        driverObj.drive();
    };

    return (
        <Button variant="ghost" size="icon" onClick={startTour} title="Start Tour">
            <HelpCircle className="h-5 w-5" />
        </Button>
    );
}
