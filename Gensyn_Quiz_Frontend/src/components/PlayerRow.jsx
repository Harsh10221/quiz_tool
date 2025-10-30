import React from 'react';

export default function PlayerRow({ player, index }) {
    return (
        <div className="flex items-center p-3 bg-white/5 rounded-lg animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="w-8 text-center text-gray-300 font-semibold">{player.rank}</div>
            <div className="flex items-center flex-grow mx-4">
                <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full" />
                <p className="ml-4 font-medium text-white">{player.name}</p>
            </div>
            <div className="text-amber-300 font-bold">{player.score.toLocaleString()}</div>
        </div>
    );
};

