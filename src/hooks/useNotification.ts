"use client";

import { useState, useEffect, useCallback } from "react";

export function useNotification() {
    const [permission, setPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = useCallback(async () => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result;
        }
        return 'denied';
    }, []);

    const showNotification = useCallback((title: string, options?: NotificationOptions) => {
        if (typeof window !== 'undefined' && 'Notification' in window && permission === 'granted') {
            new Notification(title, options);
        }
    }, [permission]);

    return { permission, requestPermission, showNotification };
}
