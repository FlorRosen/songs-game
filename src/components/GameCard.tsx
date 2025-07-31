'use client';

import { useState, useEffect } from 'react';
import songsData from '@/data/songs.json';

interface Song {
  lyric: string;
  next_lyric: string;
  song: string;
  artist: string;
}

export default function GameCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  // Function to get a random song
  const getRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songsData.length);
    return songsData[randomIndex];
  };

  // Initialize with a random song
  useEffect(() => {
    setCurrentSong(getRandomSong());
  }, []);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    
    // Change to a new random song after the flip animation completes
    setTimeout(() => {
      setCurrentSong(getRandomSong());
    }, 350); // Half of the 700ms animation duration
  };

  // Don't render until we have a song
  if (!currentSong) {
    return (
      <div className="w-80 h-96 rounded-2xl shadow-2xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

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
              &ldquo;{currentSong.lyric}&rdquo;
            </p>
          </div>

          {/* NEXT LYRIC Section */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
              NEXT LYRIC
            </h2>
            <p className="text-lg leading-relaxed">
              &ldquo;{currentSong.next_lyric}&rdquo;
            </p>
          </div>

          {/* SONG Section */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
              SONG
            </h2>
            <p className="text-lg leading-relaxed">
              &ldquo;{currentSong.song}&rdquo; by {currentSong.artist}
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
              &ldquo;{currentSong.lyric}&rdquo;
            </p>
          </div>

          {/* NEXT LYRIC Section */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
              NEXT LYRIC
            </h2>
            <p className="text-lg leading-relaxed">
              &ldquo;{currentSong.next_lyric}&rdquo;
            </p>
          </div>

          {/* SONG Section */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">
              SONG
            </h2>
            <p className="text-lg leading-relaxed">
              &ldquo;{currentSong.song}&rdquo; by {currentSong.artist}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 