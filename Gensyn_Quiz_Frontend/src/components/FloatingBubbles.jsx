import React from 'react';
import { leaderboardData } from '../data.js';

export default function FloatingBubbles() {
    const top10 = leaderboardData?.slice(0, 10);
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
            {top10.map((player) => {
                const style = { left: `${Math.random() * 90}%`, animationDuration: `${15 + Math.random() * 15}s`, animationDelay: `${Math.random() * 10}s`, transform: `scale(${0.6 + Math.random() * 0.5})` };
                return (
                    <div key={player.rank} className="absolute bottom-0 animate-float-up" style={style}>
                        <div className="flex flex-col items-center p-2 bg-white/10 rounded-full shadow-lg backdrop-blur-sm">
                            <img src={player.avatar.replace('40x40', '60x60').replace('80x80', '60x60')} alt={player.name} className="w-12 h-12 rounded-full" />
                            <p className="text-xs text-white mt-1 font-medium">{player.name}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

