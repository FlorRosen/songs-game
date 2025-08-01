import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-[#71697a] drop-shadow-lg">
          Songs Game
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-[#f2f6d0] via-[#d0e1d4] to-[#d9d2b6] mx-auto mb-8 rounded-full"></div>
        <p className="text-xl md:text-2xl text-[#71697a] opacity-80 max-w-md mx-auto mb-12">
          Welcome to the ultimate music gaming experience
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/game/players" 
            className="inline-block bg-gradient-to-r from-[#f2f6d0] to-[#d0e1d4] hover:from-[#d0e1d4] hover:to-[#d9d2b6] text-[#71697a] font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start playing
          </Link>
          
          <Link 
            href="/instructions" 
            className="inline-block bg-white/30 backdrop-blur-sm hover:bg-white/40 text-[#71697a] font-medium py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-102 border border-white/20"
          >
            Game Instructions
          </Link>
        </div>
      </div>
    </div>
  );
}
