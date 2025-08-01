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
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [noOnePressed, setNoOnePressed] = useState(false);
  const [availableSongIndices, setAvailableSongIndices] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentCardNumber, setCurrentCardNumber] = useState(1);
  const [maxCards, setMaxCards] = useState(songsData.length);


  // Function to reset available songs
  const resetAvailableSongs = () => {
    const indices = Array.from({ length: songsData.length }, (_, i) => i);
    setAvailableSongIndices(indices);
  };

  // Function to get a random song from available songs
  const getRandomSong = () => {
    // If no more songs available, end game
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

  // Initialize available songs and game size
  useEffect(() => {
    const gameSize = localStorage.getItem('gameSize');
    if (gameSize) {
      setMaxCards(parseInt(gameSize));
    }
    resetAvailableSongs();
  }, []);

  // Set initial song after availableSongIndices is initialized
  useEffect(() => {
    if (availableSongIndices.length > 0 && !currentSong) {
      setCurrentSong(getRandomSong());
    }
  }, [availableSongIndices]);


  const handlePlayerSelect = (playerIndex: number) => {
    setSelectedPlayer(playerIndex);
    setShowNextButton(true);
    setNoOnePressed(false); // Reset "no one guessed" state when selecting a player
  };

  const handleNextCard = () => {
    // Only update score if a player was selected (not for "no one guessed")
    if (selectedPlayer !== null && !noOnePressed) {
      onPlayerScore(selectedPlayer);
    }
    
    // Reset states
    setSelectedPlayer(null);
    setShowNextButton(false);
    setNoOnePressed(false);
    
    // Move to next card
    setIsFlipped(!isFlipped);
    
    // Change to a new random song after the flip animation completes
    setTimeout(() => {
      const nextCardNumber = currentCardNumber + 1;
      if (nextCardNumber > maxCards) {
        setIsGameOver(true);
        onGameOver();
      } else {
        setCurrentCardNumber(nextCardNumber);
        setCurrentSong(getRandomSong());
      }
    }, 350);
  };

  const handleNoOneGuessed = () => {
    setNoOnePressed(true);
    setShowNextButton(true);
    setSelectedPlayer(null); // Reset player selection when "no one guessed" is pressed
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
        {/* Progress indicator */}
        <div className="mb-4 text-center">
          <span className="text-[#71697a] font-medium">
            Card {currentCardNumber} of {maxCards}
          </span>
        </div>

        {/* Game Card */}
        <div 
          className={`w-80 h-96 rounded-2xl shadow-2xl transition-transform duration-700 transform-style-preserve-3d perspective-1000 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}

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
        <div className="flex flex-col items-center gap-4">
          <PlayerSelector
            players={players}
            onPlayerScore={handlePlayerSelect}
            onNoOneGuessed={handleNoOneGuessed}
            pressedPlayer={selectedPlayer}
            noOnePressed={noOnePressed}
          />
          
          {/* Next Card button container with fixed height */}
          <div className="h-12 flex items-center justify-center">
            {showNextButton && (
              <button
                onClick={handleNextCard}
                className="bg-gradient-to-r from-[#71697a] to-[#d9d2b6] text-white font-medium py-2 px-6 rounded-full text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                Next Card →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } 