import Link from 'next/link';

export default function InstructionsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-[#f2f6d0] via-[#d0e1d4] to-[#d9d2b6]">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#71697a] drop-shadow-lg">
          Game Instructions
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-[#f2f6d0] via-[#d0e1d4] to-[#d9d2b6] mx-auto mb-8 rounded-full"></div>
        
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 shadow-lg">
          <div className="text-left space-y-6 text-[#71697a]">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-center mb-6">How to play?</h2>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  <strong>Number of players:</strong> The game is designed for a group of <strong>2 to 6 people</strong>.
                </p>
                
                <p>
                  <strong>Game mechanics:</strong> Each participant must take the device and read aloud the first line of lyrics that appears on screen.
                </p>
                
                <p>
                  <strong>Objective:</strong> The participant who correctly guesses which line follows the one shown will get <strong>one point</strong>.
                </p>
                
                <p>
                  <strong>Victory:</strong> Whoever gets the most points at the end of the game will be the <strong>winner</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/game/players" 
            className="inline-block bg-gradient-to-r from-[#f2f6d0] to-[#d0e1d4] hover:from-[#d0e1d4] hover:to-[#d9d2b6] text-[#71697a] font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Playing!
          </Link>
          
          <Link 
            href="/" 
            className="inline-block bg-white/30 backdrop-blur-sm hover:bg-white/40 text-[#71697a] font-medium py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-102 border border-white/20"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 