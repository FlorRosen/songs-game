'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GameSizeSelector from '@/components/GameSizeSelector';

export default function GameSizePage() {
  const router = useRouter();

  useEffect(() => {
    // Verificar que haya jugadores antes de mostrar esta página
    const players = localStorage.getItem('gamePlayers');
    if (!players) {
      router.push('/game/players');
    }
  }, [router]);

  const handleSelectSize = (size: number) => {
    localStorage.setItem('gameSize', size.toString());
  };

  return <GameSizeSelector onSelectSize={handleSelectSize} />;
}