export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-[#71697a] drop-shadow-lg">
          Songs Game
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-[#f2f6d0] via-[#d0e1d4] to-[#d9d2b6] mx-auto mb-8 rounded-full"></div>
        <p className="text-xl md:text-2xl text-[#71697a] opacity-80 max-w-md mx-auto">
          Welcome to the ultimate music gaming experience
        </p>
      </div>
    </div>
  );
}
