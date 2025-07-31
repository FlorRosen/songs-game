'use client';

import { useState } from 'react';

interface GameCardProps {
  lyric: string;
  nextLyric: string;
  song: string;
  artist: string;
}

export default function GameCard({ lyric, nextLyric, song, artist }: GameCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`w-80 h-96 rounded-2xl shadow-2xl cursor-pointer transition-transform duration-700 transform-style-preserve-3d perspective-1000 ${
        isFlipped ? 'rotate-y-180' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Front of Card */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl p-8 flex flex-col justify-between backface-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-30"></div>
        
        {/* Content */}
        <div className="relative z-10 text-gray-100 space-y-6">
          {/* LYRIC Section */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
              LYRIC
            </h2>
            <p className="text-lg leading-relaxed">
              "{lyric}"
            </p>
          </div>

          {/* NEXT LYRIC Section */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
              NEXT LYRIC
            </h2>
            <p className="text-lg leading-relaxed">
              "{nextLyric}"
            </p>
          </div>

          {/* SONG Section */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
              SONG
            </h2>
            <p className="text-lg leading-relaxed">
              "{song}" by {artist}
            </p>
          </div>
        </div>
      </div>

      {/* Back of Card */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-400 rounded-2xl p-8 flex flex-col justify-between backface-hidden rotate-y-180">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-30"></div>
        
        {/* Content */}
        <div className="relative z-10 text-gray-100 space-y-6">
          {/* LYRIC Section */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
              LYRIC
            </h2>
            <p className="text-lg leading-relaxed">
              "{lyric}"
            </p>
          </div>

          {/* NEXT LYRIC Section */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
              NEXT LYRIC
            </h2>
            <p className="text-lg leading-relaxed">
              "{nextLyric}"
            </p>
          </div>

          {/* SONG Section */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
              SONG
            </h2>
            <p className="text-lg leading-relaxed">
              "{song}" by {artist}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 