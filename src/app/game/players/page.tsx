'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PlayersPage() {
  const [players, setPlayers] = useState(['', '', '', '', '', '']);
  const [numPlayers, setNumPlayers] = useState(2);
  const router = useRouter();

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleStartGame = () => {
    const validPlayers = players.slice(0, numPlayers).filter(name => name.trim() !== '');
    if (validPlayers.length === numPlayers) {
      // Store players in localStorage
      localStorage.setItem('gamePlayers', JSON.stringify(validPlayers));
      localStorage.setItem('playerScores', JSON.stringify(validPlayers.map(() => 0)));
      router.push('/game/size');
    }
  };

  const canStartGame = players.slice(0, numPlayers).every(name => name.trim() !== '');

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-[#f2f6d0] via-[#d0e1d4] to-[#d9d2b6]">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#71697a] drop-shadow-lg">
          Configure Players
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-[#f2f6d0] via-[#d0e1d4] to-[#d9d2b6] mx-auto mb-8 rounded-full"></div>
        
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 shadow-lg">
          <div className="mb-6">
            <label className="block text-lg font-semibold text-[#71697a] mb-3">
              Number of players:
            </label>
            <div className="flex justify-center gap-2">
              {[2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setNumPlayers(num)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    numPlayers === num
                      ? 'bg-gradient-to-r from-[#f2f6d0] to-[#d0e1d4] text-[#71697a] font-bold shadow-lg'
                      : 'bg-white/30 text-[#71697a] hover:bg-white/40'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#71697a] mb-4">
              Player names:
            </h2>
            {players.slice(0, numPlayers).map((player, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-sm font-medium text-[#71697a] mb-1 text-left">
                  Player {index + 1}:
                </label>
                <input
                  type="text"
                  value={player}
                  onChange={(e) => handlePlayerChange(index, e.target.value)}
                  placeholder={`Player ${index + 1} name`}
                  className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 backdrop-blur-sm text-[#71697a] placeholder-[#71697a]/60 focus:outline-none focus:ring-2 focus:ring-[#d0e1d4] focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleStartGame}
            disabled={!canStartGame}
            className={`inline-block font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
              canStartGame
                ? 'bg-gradient-to-r from-[#f2f6d0] to-[#d0e1d4] hover:from-[#d0e1d4] hover:to-[#d9d2b6] text-[#71697a] cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Start game
          </button>
          
          <Link 
            href="/" 
            className="inline-block bg-white/30 backdrop-blur-sm hover:bg-white/40 text-[#71697a] font-medium py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-102 border border-white/20"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 