"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const SOUNDS = [
    { id: 'lofi', label: 'Lofi', icon: Music, file: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3' }, // Chill lofi
];

export function FocusAudio() {
    const [playing, setPlaying] = useState<string | null>(null);
    const [volume, setVolume] = useState([0.5]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggleSound = (soundId: string) => {
        if (playing === soundId) {
            audioRef.current?.pause();
            setPlaying(null);
            return;
        }

        if (audioRef.current) {
            audioRef.current.src = SOUNDS.find(s => s.id === soundId)?.file || '';
            audioRef.current.volume = volume[0];
            audioRef.current.loop = true;
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            setPlaying(soundId);
        }
    };

    const handleVolumeChange = (value: number[]) => {
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value[0];
        }
    };

    return (
        <Card className="border-indigo-100 dark:border-indigo-900 shadow-sm">
            <CardContent className="p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        Focus Sounds
                    </h3>
                    {playing && (
                        <span className="text-xs text-indigo-500 animate-pulse font-medium">
                            Playing {SOUNDS.find(s => s.id === playing)?.label}
                        </span>
                    )}
                </div>

                <div className="flex gap-2 justify-between">
                    {SOUNDS.map((sound) => (
                        <Button
                            key={sound.id}
                            variant={playing === sound.id ? "default" : "outline"}
                            size="sm"
                            className={cn(
                                "flex-1 transition-all",
                                playing === sound.id && "bg-indigo-600 hover:bg-indigo-700 text-white"
                            )}
                            onClick={() => toggleSound(sound.id)}
                        >
                            <sound.icon className="h-4 w-4 mr-2" />
                            {sound.label}
                        </Button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Slider
                        value={volume}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                        className="flex-1"
                    />
                </div>

                {/* Hidden Audio Element */}
                <audio ref={audioRef} className="hidden" />
            </CardContent>
        </Card>
    );
}
