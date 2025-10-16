# 🗒️ Simple Sticky Note Widget

A beautiful, minimalist sticky notes application with neumorphic design. Built with React and TypeScript for Windows, with planned mobile sync support.

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

## ✨ Features

### Core Functionality
- 📝 **Create & Edit Notes** - Unlimited sticky notes with rich text editing
- 🎨 **5 Beautiful Colors** - Choose from carefully selected color palette
- 🖱️ **Drag & Drop** - Move notes freely across your screen
- 📏 **Resizable** - Adjust note size from all edges (top, right, bottom, right-bottom corner)
- 🗑️ **Smart Deletion** - Delete notes with minimum one note guarantee

### Advanced Features
- 🕐 **24-Hour History** - Double-click header 5 times to view edit history
- 📐 **3 Layout Modes** 
  - **Grid** - Organized grid layout (3 columns on desktop, 1 column on mobile)
  - **Stack** - Layered notes in one place
  - **Cascade** - Diagonal waterfall arrangement
- 📱 **Fully Responsive** - Optimized for both desktop and mobile
- 💾 **Auto-Save** - All changes saved automatically to localStorage
- 🎯 **Bring to Front** - Click any note to bring it to the top

### Design
- 🌈 **Neumorphic Style** - Soft, elegant shadows and depth
- 🎨 **Color Palette**
  - Light Gray (#FEFEFE)
  - Orange (#FFCC80)
  - Green (#B8E6BA)
  - Blue (#81D4FA)
  - Pink (#F8BBD0)
- ✨ **Smooth Animations** - Enhanced visual feedback during drag/resize

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/simple-sticky-note-widget.git

# Navigate to project directory
cd simple-sticky-note-widget

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## 🎮 Usage

### Basic Operations
1. **Add Note** - Click the `+` button in any note header
2. **Delete Note** - Click the `X` button (disabled if only one note remains)
3. **Move Note** - Drag from the header area
4. **Resize Note** - Drag from top, right, bottom, or bottom-right corner
5. **Change Color** - Click the palette icon and select a color

### Layout Management
- **Grid Layout** - Click the grid icon for organized arrangement
- **Stack Layout** - Layer all notes in one location
- **Cascade Layout** - Create a diagonal waterfall effect

### Hidden Features
- **History Viewer** - Double-click note header 5 times within 2 seconds

### Mobile Support
- Headers are always visible on mobile
- Single-column grid layout for optimal screen usage
- Touch-optimized controls

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4.0** - Utility-first styling
- **shadcn/ui** - High-quality component library

### Key Libraries
- **re-resizable** - Resizable note functionality
- **lucide-react** - Beautiful icons
- **sonner** - Toast notifications

### Storage
- **localStorage** - Client-side data persistence
- **Planned: Supabase** - Future cloud sync for mobile

## 📱 Roadmap

- [x] Core sticky note functionality
- [x] Drag & resize support
- [x] Multiple color themes
- [x] Layout management (Grid/Stack/Cascade)
- [x] 24-hour edit history
- [x] Mobile responsive design
- [ ] Supabase integration
- [ ] Mobile app with data sync
- [ ] Tag & category system
- [ ] Search functionality
- [ ] Export notes (PDF, Markdown)
- [ ] Rich text formatting
- [ ] Dark mode

## 🎨 Design Philosophy

This project follows a **neumorphic design** approach, creating a soft, tactile interface that feels modern yet familiar. The carefully crafted shadows and subtle color palette provide a calm, distraction-free note-taking experience.

### Color Psychology
Each color is chosen for specific use cases:
- **Gray** - Neutral, for general notes
- **Orange** - Important, urgent items
- **Green** - Completed tasks, positive notes
- **Blue** - Ideas, brainstorming
- **Pink** - Personal, emotional content

## 📝 Development Notes

### Project Structure
```
├── App.tsx                   # Main application
├── components/
│   ├── StickyNote.tsx       # Individual note component
│   ├── HistoryViewer.tsx    # History modal
│   └── ui/                  # shadcn/ui components
├── styles/
│   └── globals.css          # Global styles & design tokens
└── guidelines/              # Development guidelines
```

### Styling Guidelines
- No font size/weight Tailwind classes (uses globals.css typography)
- Consistent neumorphic shadows across all components
- Mobile-first responsive design

For detailed setup instructions, see:
- [PROJECT_SETUP.md](./PROJECT_SETUP.md) - Complete development guide
- [CSS_SETUP.md](./CSS_SETUP.md) - CSS environment details
- [EXACT_GLOBALS_CSS.md](./EXACT_GLOBALS_CSS.md) - Full globals.css code

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Maintain the neumorphic design language
- Test on both desktop and mobile
- Update documentation as needed

## 🐛 Known Issues

- Resizing from top edge may occasionally cause position jumps (working on fix)
- Very long text may overflow on small note sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Amazing component library
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📧 Contact

Project Link: [https://github.com/yourusername/simple-sticky-note-widget](https://github.com/yourusername/simple-sticky-note-widget)

---

<p align="center">Made with ❤️ for productivity enthusiasts</p>
