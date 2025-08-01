'use client';

import { useState, useEffect } from 'react';
import songsData from '@/data/songs.json';

interface Song {
  lyric: string;
  next_lyric: string;
  song: string;
  artist: string;
}

interface GameCardProps {
  players: string[];
  onPlayerScore: (playerIndex: number) => void;
}

export default function GameCard({ players, onPlayerScore }: GameCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [pressedPlayer, setPressedPlayer] = useState<number | null>(null);
  const [noOnePressed, setNoOnePressed] = useState(false);

  // Function to get a random song
  const getRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songsData.length);
    return songsData[randomIndex];
  };

  // Initialize with a random song and load scores
  useEffect(() => {
    setCurrentSong(getRandomSong());
    
    // Load scores from localStorage
    const storedScores = localStorage.getItem('playerScores');
    
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    
    // Change to a new random song after the flip animation completes
    setTimeout(() => {
      setCurrentSong(getRandomSong());
    }, 350); // Half of the 700ms animation duration
  };

  const handlePlayerScore = (playerIndex: number) => {
    // Show pressed effect
    setPressedPlayer(playerIndex);
    
    // Call the parent function to update scores
    onPlayerScore(playerIndex);
    
    // Remove pressed effect after 500ms
    setTimeout(() => {
      setPressedPlayer(null);
    }, 500);
    
    // Move to next card after scoring
    setIsFlipped(!isFlipped);
    
    // Change to a new random song after the flip animation completes
    setTimeout(() => {
      setCurrentSong(getRandomSong());
    }, 350);
  };

  const handleNoOneGuessed = () => {
    // Show pressed effect
    setNoOnePressed(true);
    
    // Remove pressed effect after 500ms
    setTimeout(() => {
      setNoOnePressed(false);
    }, 500);
    
    // No points awarded, just move to next card
    setIsFlipped(!isFlipped);
    
    // Change to a new random song after the flip animation completes
    setTimeout(() => {
      setCurrentSong(getRandomSong());
    }, 350);
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
    <div className="flex flex-col items-center">
        {/* Game Card */}
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

                {/* Player Buttons - Always active */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-[#71697a] mb-3 text-center opacity-80">
            Who guessed it?
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {players.map((player, index) => (
              <button
                key={index}
                onClick={() => handlePlayerScore(index)}
                className={`py-2 px-3 rounded-lg transition-all duration-300 text-sm font-bold cursor-pointer transform hover:scale-105 ${
                  pressedPlayer === index
                    ? 'bg-gradient-to-r from-[#f2f6d0] to-[#d0e1d4] text-[#71697a] shadow-md scale-105'
                    : 'bg-gradient-to-r from-[#f2f6d0] to-[#d0e1d4] text-[#71697a]'
                }`}
              >
                <span title={player}>
                  {player.length > 12 ? `${player.slice(0, 12)}...` : player}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={handleNoOneGuessed}
            className={`w-full py-2 px-4 rounded-lg transition-all duration-300 border text-sm font-medium ${
              noOnePressed
                ? 'bg-white/50 text-[#71697a] shadow-md scale-105 border-white/40'
                : 'bg-white/30 hover:bg-white/40 text-[#71697a] border-white/20'
            }`}
          >
            No one guessed
          </button>
        </div>
    </div>
  );
} 