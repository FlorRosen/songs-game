'use client';

interface PlayerSelectorProps {
  players: string[];
  onPlayerScore: (playerIndex: number) => void;
  onNoOneGuessed: () => void;
  pressedPlayer: number | null;
  noOnePressed: boolean;
}

export default function PlayerSelector({ 
  players, 
  onPlayerScore, 
  onNoOneGuessed, 
  pressedPlayer, 
  noOnePressed 
}: PlayerSelectorProps) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-[#71697a] mb-3 text-center opacity-80">
        Who guessed it?
      </h3>
      <div className="flex flex-wrap justify-center gap-2 mb-4 px-4">
        {players.map((player, index) => (
          <button
            key={index}
            onClick={() => onPlayerScore(index)}
            className={`w-24 py-2 px-3 rounded-lg transition-all duration-300 text-sm font-bold cursor-pointer transform hover:scale-105 ${
              pressedPlayer === index
                ? 'bg-gradient-to-r from-[#f2f6d0] to-[#d0e1d4] text-[#71697a] shadow-md scale-105'
                : 'bg-gradient-to-r from-[#f2f6d0] to-[#d0e1d4] text-[#71697a]'
            }`}
          >
            <span title={player} className="block truncate">
              {player}
            </span>
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={onNoOneGuessed}
          className={`w-48 py-2 px-4 rounded-lg transition-all duration-300 border text-sm font-medium ${
            noOnePressed
              ? 'bg-white/50 text-[#71697a] shadow-md scale-105 border-white/40'
              : 'bg-white/30 hover:bg-white/40 text-[#71697a] border-white/20'
          }`}
        >
          No one guessed
        </button>
      </div>
    </div>
  );
}