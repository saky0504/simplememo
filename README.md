# 🗒️ Simple Memo

A beautiful, minimalist sticky notes application with neumorphic design and mobile optimization. Built with React and TypeScript.

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
</p>

## ✨ Features

### Core Functionality
- 📝 **Create & Edit Notes** - Unlimited sticky notes with auto-save
- 🎨 **5 Beautiful Colors** - Carefully selected color palette for different note types
- 🖱️ **Drag & Drop** - Move notes freely across your screen via header
- 📏 **Full Resize Control** - Resize from all 8 directions (edges & corners)
- 🗑️ **Smart Deletion** - Delete notes with minimum one note guarantee
- 💾 **Auto-Save** - All changes automatically saved to localStorage

### Advanced Features
- 🕐 **24-Hour History** - Double-click header 5 times to view edit history
- 📐 **3 Layout Modes**
  - **Grid** - Organized grid layout (auto columns on desktop, single column on mobile)
  - **Stack** - Layered notes in one place with 10px offset
  - **Cascade** - Diagonal waterfall arrangement with 40px spacing
- 🎯 **Z-Index Management** - Click any note to bring it to the front
- 📱 **Mobile Optimized**
  - Always-visible headers
  - Enlarged touch areas for resize (50px edges, 80px corners)
  - Touch-optimized controls with 0px button spacing
  - Single-column grid layout

### Design
- 🌈 **Neumorphic Style** - Soft shadows and elegant depth
- 🎨 **Color Palette**
  - Light Gray (#FEFEFE) - General notes
  - Orange (#FFCC80) - Important items
  - Green (#B8E6BA) - Completed tasks
  - Blue (#81D4FA) - Ideas, brainstorming
  - Pink (#F8BBD0) - Personal content
- ✨ **Smooth Animations** - Enhanced visual feedback during interactions
- 🎯 **Unified UI** - Menu backgrounds match note colors

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/simple_memo.git

# Navigate to project directory
cd simple_memo

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## 🎮 Usage

### Basic Operations
1. **Add Note** - Click the `+` button in any note header
2. **Delete Note** - Click the `X` button (disabled if only one note remains)
3. **Move Note** - Drag from the header area
4. **Resize Note** - Drag from any edge or corner
5. **Change Color** - Click the palette icon and select a color
6. **Edit Text** - Click anywhere on the note to start typing

### Layout Management
Access layout options via the grid icon in note header:
- **Grid Layout** - Organized arrangement with automatic columns
- **Stack Layout** - Layer all notes in one location
- **Cascade Layout** - Create a diagonal waterfall effect

### Resize Functionality
- **Desktop**: Hover over edges/corners to see resize handles
- **Mobile**: Large touch areas (50px edges, 80px corners) for easy resizing
- **8 Directions**: top, right, bottom, left, topRight, bottomRight, bottomLeft, topLeft

### Hidden Features
- **History Viewer** - Double-click note header 5 times within 2 seconds
  - View all edits from the past 24 hours
  - Timestamps for each change
  - Auto-cleanup of old entries

### Mobile-Specific Features
- Headers always visible (no hover required)
- Minimized button spacing for compact UI
- 18px icon size for optimal touch targets
- Enlarged resize areas for easy manipulation

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library with hooks
- **TypeScript 5.7** - Type safety and better DX
- **Tailwind CSS v4.1** - Utility-first styling
- **Vite 6.0** - Fast build tool and dev server

### Key Libraries
- **re-resizable 6.9** - Advanced resizable component
- **lucide-react 0.468** - Beautiful icon library
- **sonner 1.7** - Toast notifications
- **shadcn/ui** - High-quality component library

### Storage
- **localStorage** - Client-side data persistence
- Automatic 24-hour history cleanup
- JSON-based note storage

## 📝 Project Structure

```
simple_memo/
├── App.tsx                    # Main application logic
├── components/
│   ├── StickyNote.tsx        # Individual note component
│   ├── HistoryViewer.tsx     # History modal dialog
│   └── ui/                   # shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── scroll-area.tsx
│       ├── textarea.tsx
│       └── use-mobile.ts     # Mobile detection hook
├── styles/
│   └── globals.css           # Global styles & design tokens
├── main.tsx                  # App entry point
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## 🎨 Design Philosophy

This project follows a **neumorphic design** approach, creating a soft, tactile interface that feels modern yet familiar. The carefully crafted shadows and subtle color palette provide a calm, distraction-free note-taking experience.

### Key Design Principles
- **Simplicity** - Clean interface with no unnecessary elements
- **Accessibility** - Large touch targets and high contrast
- **Responsiveness** - Works seamlessly on desktop and mobile
- **Performance** - Optimized rendering and smooth animations

### Color Psychology
Each color is chosen for specific use cases:
- **Gray** - Neutral, for general notes
- **Orange** - Important, urgent items
- **Green** - Completed tasks, positive notes
- **Blue** - Ideas, brainstorming
- **Pink** - Personal, emotional content

## 🔧 Configuration

### Note Defaults
- Default size: 300x300px
- Minimum size: 200x150px
- Default color: Light Gray (#FEFEFE)
- Initial position: Screen center

### Mobile Breakpoint
- Defined in `use-mobile.ts`
- Default: 768px

### History Retention
- Duration: 24 hours
- Auto-cleanup on app load
- Stored in localStorage

## 🐛 Known Limitations

- Notes are stored locally (no cloud sync)
- History limited to 24 hours
- Maximum note size constrained by screen size

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Lucide Icons](https://lucide.dev/) - Icon set
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [re-resizable](https://github.com/bokuweb/re-resizable) - Resize functionality

---

<p align="center">Made with ❤️ for productivity</p>
