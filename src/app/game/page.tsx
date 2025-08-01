'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GameCard from '@/components/GameCard';

export default function GamePage() {
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const handlePlayerScore = (playerIndex: number) => {
    const newScores = [...scores];
    // Ensure the score is initialized to 0 if undefined
    if (typeof newScores[playerIndex] !== 'number') {
      newScores[playerIndex] = 0;
    }
    newScores[playerIndex] += 1;
    setScores(newScores);
    localStorage.setItem('playerScores', JSON.stringify(newScores));
  };

  // Load players and scores from localStorage
  useEffect(() => {
    const storedPlayers = localStorage.getItem('gamePlayers');
    const storedScores = localStorage.getItem('playerScores');
    
    if (storedPlayers) {
      const parsedPlayers = JSON.parse(storedPlayers);
      setPlayers(parsedPlayers);
      
      // Initialize scores array with zeros if no stored scores
      if (!storedScores) {
        const initialScores = new Array(parsedPlayers.length).fill(0);
        setScores(initialScores);
        localStorage.setItem('playerScores', JSON.stringify(initialScores));
      } else {
        setScores(JSON.parse(storedScores));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2f6d0] via-[#d0e1d4] to-[#d9d2b6] relative">
      {/* Scoreboard Toggle Button - Top right corner of entire view */}
      {!isGameOver && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setShowScoreboard(!showScoreboard)}
            className="bg-white/30 backdrop-blur-sm hover:bg-white/40 text-[#71697a] font-medium py-2 px-4 rounded-full text-sm transition-all duration-300 border border-white/20 shadow-lg"
          >
            {showScoreboard ? '📊 Hide Score' : '📊 View Score'}
          </button>

          {/* Score Display - Only show when toggled */}
          {showScoreboard && (
            <div className="absolute top-12 right-0 bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg min-w-64 z-20">
              <h3 className="text-lg font-bold text-[#71697a] mb-3 text-center">Score</h3>
              <div className="grid grid-cols-1 gap-2">
                {players.map((player, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/20 rounded-lg px-3 py-2">
                    <span className="text-sm font-medium text-[#71697a] truncate max-w-[150px]" title={player}>
                      {player.length > 15 ? `${player.slice(0, 15)}...` : player}
                    </span>
                    <span className="text-lg font-bold text-[#71697a] ml-2">{scores[index] || 0}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <GameCard 
            players={players}
            scores={scores}
            onPlayerScore={handlePlayerScore}
            onGameOver={() => setIsGameOver(true)}
          />
        </div>

        {/* Navigation Buttons - At the bottom */}
        <div className="text-center py-8">
          <Link 
            href="/game/players" 
            className="inline-block bg-gradient-to-r from-[#f2f6d0] to-[#d0e1d4] hover:from-[#d0e1d4] hover:to-[#d9d2b6] text-[#71697a] font-bold py-2 px-6 rounded-full text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mr-4"
          >
            New Game
          </Link>
          <Link 
            href="/" 
            className="inline-block bg-white/30 backdrop-blur-sm hover:bg-white/40 text-[#71697a] font-medium py-2 px-6 rounded-full text-base transition-all duration-300 transform hover:scale-102 border border-white/20"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 