'use client';

import Link from 'next/link';
import GameCard from '@/components/GameCard';

export default function GamePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-[#f2f6d0] via-[#d0e1d4] to-[#d9d2b6]">
      <div className="relative">
        <GameCard />

        {/* Back to Home Button */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-gray-100 font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 