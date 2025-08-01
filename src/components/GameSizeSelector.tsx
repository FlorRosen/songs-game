'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import songsData from '@/data/songs.json';

interface GameSizeSelectorProps {
  onSelectSize: (size: number) => void;
}

export default function GameSizeSelector({ onSelectSize }: GameSizeSelectorProps) {
  const router = useRouter();
  const totalSongs = songsData.length;
  const halfSongs = Math.floor(totalSongs / 2);
  const quarterSongs = Math.floor(totalSongs / 4);

  const options = [
    { size: quarterSongs, label: 'Short Game' },
    { size: halfSongs, label: 'Medium Game' },
    { size: totalSongs, label: 'Full Game' },
  ];

  const handleSelect = (size: number) => {
    onSelectSize(size);
    router.push('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2f6d0] via-[#d0e1d4] to-[#d9d2b6] flex items-center justify-center px-4">
      <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#71697a] mb-8">
          Choose Game Size
        </h2>
        
        <div className="space-y-4">
          {options.map((option) => (
            <button
              key={option.size}
              onClick={() => handleSelect(option.size)}
              className="w-full py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-[#f2f6d0] to-[#d0e1d4] text-[#71697a] font-bold text-lg shadow-lg hover:shadow-xl"
            >
              <div className="flex flex-col items-center">
                <span>{option.label}</span>
                <span className="text-sm opacity-80 mt-1">
                  {option.size} {option.size === 1 ? 'card' : 'cards'}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/game/players"
            className="inline-block bg-white/30 hover:bg-white/40 text-[#71697a] font-medium py-2 px-6 rounded-full text-base transition-all duration-300 transform hover:scale-102 border border-white/20"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
}