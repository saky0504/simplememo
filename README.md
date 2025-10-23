# 🗒️ Simple Memo

A sticky notes application. Built with React and TypeScript.

![Simple Memo Screenshot](./screenshot.png)

## Features

- Create, edit, and delete notes
- Drag notes to reposition
- Resize from edges and corners
- Choose from 5 color options
- Grid, Stack, and Cascade layout modes
- 24-hour edit history
- Auto-save to localStorage
- Mobile responsive

## Tech Stack

- React 18.3
- TypeScript 5.7
- Tailwind CSS 4.1
- Vite 6.0
- re-resizable
- lucide-react

## Installation

```bash
git clone https://github.com/yourusername/simple_memo.git
cd simple_memo
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Usage

- Click `+` to add a note
- Click `X` to delete (minimum one note required)
- Drag header to move
- Drag edges/corners to resize
- Click palette icon to change color
- Click grid icon for layout options
- Double-click header 5 times to view history

## Mobile

- Touch areas enlarged for easier resizing
- Headers always visible
- Single-column grid layout

## Storage

Notes are saved to browser's localStorage. History entries older than 24 hours are automatically removed.

## License

MIT
