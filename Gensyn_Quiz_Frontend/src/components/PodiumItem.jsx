import React from 'react';
import { CrownIcon } from './Icons.jsx';

export default function PodiumItem({ player, rank }) {
    const rankStyles = {
        1: { container: 'sm:translate-y-0', image: 'w-20 h-20 sm:w-24 sm:h-24 border-amber-300 shadow-amber-300/50', name: 'text-base sm:text-lg' },
        2: { container: 'translate-y-2 sm:translate-y-4', image: 'w-16 h-16 sm:w-20 sm:h-20 border-slate-300 shadow-slate-300/50', name: 'text-sm sm:text-base' },
        3: { container: 'translate-y-2 sm:translate-y-4', image: 'w-16 h-16 sm:w-20 sm:h-20 border-amber-600 shadow-amber-600/50', name: 'text-sm sm:text-base' },
    };
    const style = rankStyles[rank];

    return (
        <div className={`flex flex-col items-center transform ${style.container}`}>
            {rank === 1 && <CrownIcon />}
            <img src={player.avatar.replace('80x80', '120x120')} alt={player.name} className={`${style.image} rounded-full border-4 shadow-lg`} />
            <p className={`mt-2 font-bold text-white ${style.name}`}>{player.name}</p>
            <p className="text-amber-300 font-semibold text-sm sm:text-base">{player.score.toLocaleString()}</p>
        </div>
    );
};

