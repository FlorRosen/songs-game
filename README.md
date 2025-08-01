# Songs Game

An engaging and interactive music trivia game built with Next.js where players test their knowledge of song lyrics.

## Game Overview

Songs Game is a multiplayer music trivia game where players compete to guess the next line of popular song lyrics. Perfect for parties, gatherings, or any music-loving group!

### How to Play

- **Players**: 2-6 players
- **Game Flow**: Players take turns reading aloud the displayed lyrics and guessing what comes next
- **Scoring**: One point is awarded for each correct guess
- **Winner**: The player with the most points at the end of the game wins

## Features

- 🎮 Interactive multiplayer gameplay
- 🎵 Curated collection of popular song lyrics
- 🎨 Beautiful, modern UI with smooth transitions
- 📱 Fully responsive design for all devices
- ⚡ Fast and seamless performance with Next.js
- 🎯 Real-time score tracking

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (via Google Fonts)

## Color Palette

The project features a carefully selected color palette that creates a warm and inviting atmosphere:
- Primary: `#f2f6d0` (Light cream)
- Secondary: `#d0e1d4` (Mint green)
- Accent: `#d9d2b6` (Warm beige)
- Warm: `#e4be9e` (Peach)
- Dark: `#71697a` (Muted purple)

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to start playing!

## Project Structure

```
src/
├── app/               # Next.js app directory
│   ├── game/         # Game-related pages
│   ├── instructions/ # Game instructions
│   ├── globals.css   # Global styles
│   └── layout.tsx    # Root layout
├── components/       # Reusable components
│   ├── GameCard     # Main game interface
│   ├── ScoreCard    # Player scoring
│   └── ...
└── data/            # Game data and configuration
```

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.