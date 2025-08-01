'use client';

import { useState, useEffect } from 'react';
import songsData from '@/data/songs.json';
import ScoreCard from './ScoreCard';
import PlayerSelector from './PlayerSelector';

interface Song {
  lyric: string;
  next_lyric: string;
  song: string;
  artist: string;
}

interface GameCardProps {
  players: string[];
  onPlayerScore: (playerIndex: number) => void;
  scores: number[];
  onGameOver: () => void;
}

export default function GameCard({ players, onPlayerScore, scores, onGameOver }: GameCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [pressedPlayer, setPressedPlayer] = useState<number | null>(null);
  const [noOnePressed, setNoOnePressed] = useState(false);
  const [availableSongIndices, setAvailableSongIndices] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);


  // Function to reset available songs
  const resetAvailableSongs = () => {
    const indices = Array.from({ length: songsData.length }, (_, i) => i);
    setAvailableSongIndices(indices);
  };

  // Function to get a random song from available songs
  const getRandomSong = () => {
    // If no songs are available, end the game
    if (availableSongIndices.length === 0) {
      setIsGameOver(true);
      onGameOver();

      return null;
    }

    // Get a random index from available songs
    const randomAvailableIndex = Math.floor(Math.random() * availableSongIndices.length);
    const songIndex = availableSongIndices[randomAvailableIndex];

    // Remove the used index from available songs
    setAvailableSongIndices(prev => prev.filter((_, i) => i !== randomAvailableIndex));

    return songsData[songIndex];
  };

  // Initialize available songs
  useEffect(() => {
    resetAvailableSongs();
  }, []);

  // Set initial song after availableSongIndices is initialized
  useEffect(() => {
    if (availableSongIndices.length > 0 && !currentSong) {
      setCurrentSong(getRandomSong());
    }
  }, [availableSongIndices]);

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

  // Render game over screen
  if (isGameOver) {
    return <ScoreCard players={players} scores={scores} />;
  }

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
        <PlayerSelector
          players={players}
          onPlayerScore={handlePlayerScore}
          onNoOneGuessed={handleNoOneGuessed}
          pressedPlayer={pressedPlayer}
          noOnePressed={noOnePressed}
        />
      </div>
    );
  } 