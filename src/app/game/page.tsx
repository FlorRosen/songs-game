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
            className="inline-block bg-white/30 backdrop-blur-sm hover:bg-white/40 text-[#71697a] font-medium py-2 px-6 rounded-full text-base transition-all duration-300 transform hover:scale-102 border border-white/20"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 