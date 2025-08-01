'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PlayerScore {
  name: string;
  score: number;
  index: number;
}

interface ScoreCardProps {
  players: string[];
  scores: number[];
}

export default function ScoreCard({ players, scores }: ScoreCardProps) {
  const [showWinnerAnimation, setShowWinnerAnimation] = useState(false);
  const ANIMATION_DELAY_PER_PLAYER = 400; // ms between each player's animation

  useEffect(() => {
    // Iniciar animación después de un breve delay
    setTimeout(() => setShowWinnerAnimation(true), 500);
  }, []);

  // Función para obtener jugadores ordenados por puntaje
  const getSortedPlayerScores = (): PlayerScore[] => {
    return players
      .map((name, index) => ({
        name,
        score: scores[index] || 0,
        index
      }))
      .sort((a, b) => b.score - a.score);
  };

  const sortedPlayers = getSortedPlayerScores();

  return (
    <div className="w-[32rem] mx-4 my-8 rounded-2xl shadow-2xl bg-gradient-to-br from-[#f2f6d0] to-[#d0e1d4] p-8">
      <h2 className="text-2xl font-bold text-center text-[#71697a] mb-8 opacity-0 animate-[fadeIn_0.5s_ease-out_0.2s_forwards]">
        ¡End of game!
      </h2>
      
      <div className="space-y-4">
        {sortedPlayers.map((player, index) => {
          const isWinner = index === 0;
          const delay = showWinnerAnimation ? 
            (sortedPlayers.length - index) * ANIMATION_DELAY_PER_PLAYER : 
            0;
          
          return (
            <div 
              key={player.index}
              className="opacity-0"
              style={{
                animation: showWinnerAnimation ? 
                  `fadeInUp 0.5s ease-out ${delay}ms forwards` : 
                  'none'
              }}
            >
              <div 
                className={`transform transition-all duration-500 ${
                  showWinnerAnimation && isWinner ? 'scale-110' : ''
                }`}
              >
                <div 
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    isWinner
                      ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 shadow-lg' 
                      : 'bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isWinner && (
                      <span 
                        className="text-2xl opacity-0"
                        style={{
                          animation: showWinnerAnimation ? 
                            `bounceIn 0.5s ease-out ${delay + 200}ms forwards, bounce 1s ease-in-out ${delay + 700}ms infinite` : 
                            'none'
                        }}
                      >
                        🏆
                      </span>
                    )}
                    <span className={`font-bold ${isWinner ? 'text-xl' : 'text-lg'} text-[#71697a]`}>
                      {player.name}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-[#71697a]">
                    {player.score} pts
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link 
          href="/game/players"
          className="inline-block bg-gradient-to-r from-[#f2f6d0] to-[#d0e1d4] hover:from-[#d0e1d4] hover:to-[#d9d2b6] text-[#71697a] font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl opacity-0"
          style={{
            animation: showWinnerAnimation ? 
              `fadeIn 0.5s ease-out ${(sortedPlayers.length + 1) * ANIMATION_DELAY_PER_PLAYER}ms forwards` : 
              'none'
          }}
        >
          Play again
        </Link>
      </div>
    </div>
  );
}