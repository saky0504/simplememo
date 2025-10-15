import { useState, useEffect } from 'react';
import { StickyNote } from './components/StickyNote';
import { HistoryViewer } from './components/HistoryViewer';
import { Button } from './components/ui/button';
import { useIsMobile } from './components/ui/use-mobile';
import { toast } from 'sonner@2.0.3';

interface Note {
  id: string;
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  color: string;
  createdAt: number;
  zIndex: number;
}

interface HistoryEntry {
  timestamp: number;
  content: string;
  noteId: string;
}

const STORAGE_KEY = 'sticky-notes-data';
const HISTORY_KEY = 'sticky-notes-history';
const COLORS = ['#FEFEFE', '#FFCC80', '#B8E6BA', '#81D4FA', '#F8BBD0'];

function App() {
  const isMobile = useIsMobile();
  const [notes, setNotes] = useState<Note[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  // Load notes and history from localStorage
  useEffect(() => {
    let initialNotesCreated = false;
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        if (parsedNotes.length > 0) {
          // Ensure all notes have a zIndex property
          const notesWithZIndex = parsedNotes.map((note: Note, index: number) => ({
            ...note,
            zIndex: note.zIndex ?? index + 1,
          }));
          setNotes(notesWithZIndex);
          initialNotesCreated = true;
        }
      }
      
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        // Filter out entries older than 24 hours
        const recentHistory = parsedHistory.filter(
          (entry: HistoryEntry) => Date.now() - entry.timestamp < 24 * 60 * 60 * 1000
        );
        setHistory(recentHistory);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    
    // Create initial note if no notes exist
    if (!initialNotesCreated) {
      const initialNote: Note = {
        id: `note-${Date.now()}`,
        content: '',
        position: { x: 20, y: isMobile ? 20 : 90 },
        size: { width: 300, height: 300 },
        color: COLORS[0],
        createdAt: Date.now(),
        zIndex: 1,
      };
      setNotes([initialNote]);
    }
  }, [isMobile]);

  // Save notes to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes]);

  // Save history to localStorage and clean old entries
  useEffect(() => {
    if (history.length > 0) {
      const recentHistory = history.filter(
        (entry) => Date.now() - entry.timestamp < 24 * 60 * 60 * 1000
      );
      localStorage.setItem(HISTORY_KEY, JSON.stringify(recentHistory));
      if (recentHistory.length !== history.length) {
        setHistory(recentHistory);
      }
    }
  }, [history]);

  const addNote = () => {
    const noteWidth = 300;
    const noteHeight = 300;
    const padding = 20;
    const offsetStepX = 8;
    const offsetStepY = 32;
    
    // 툴바 공간을 고려한 영역 설정
    const topOffset = 90; // PC 모드 툴바 높이
    const effectiveTop = isMobile ? padding : topOffset;
    const effectiveRight = padding;
    const effectiveBottom = padding;
    
    // 메모가 배치될 수 있는 최대 영역 (오른쪽 및 하단 경계)
    const maxX = window.innerWidth - noteWidth - effectiveRight;
    const maxY = window.innerHeight - noteHeight - effectiveBottom;

    let x: number;
    let y: number;
    
    if (notes.length === 0) {
      // 첫 번째 메모는 좌측 상단 초기 위치에 배치
      x = padding;
      y = effectiveTop;
    } else {
      // 이전 메모의 위치에서 오프셋 적용
      const lastNote = notes[notes.length - 1];
      x = lastNote.position.x + offsetStepX;
      y = lastNote.position.y + offsetStepY;
      
      // 1. 오른쪽 경계 초과 확인
      if (x > maxX) {
        // 오른쪽을 초과하면 x를 초기 위치로 설정하고, y를 아래로 한 칸 내림
        x = padding;
        
        // 2. y축을 내리기 전에 하단 경계 초과 여부 확인
        // 만약 다음 줄로 내려갔을 때 하단 경계도 초과한다면, 초기 위치(padding, topOffset)로 리셋
        // (즉, 화면을 벗어날 경우 처음 위치부터 다시 겹쳐서 생성)
        if (y + offsetStepY > maxY) {
          y = effectiveTop;
        } else {
          y = lastNote.position.y + offsetStepY;
        }
      }
    }
    
    // 최종적으로 메모의 위치가 화면을 벗어나지 않도록 클리핑 (보장)
    x = Math.max(padding, Math.min(x, maxX));
    y = Math.max(effectiveTop, Math.min(y, maxY));
    
    const maxZIndex = notes.length > 0 ? Math.max(...notes.map(n => n.zIndex)) : 0;
    
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content: '',
      position: { x, y },
      size: { width: noteWidth, height: noteHeight },
      color: COLORS[0],
      createdAt: Date.now(),
      zIndex: maxZIndex + 1,
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, content: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, content } : note))
    );

    // Add to history
    const newHistoryEntry: HistoryEntry = {
      timestamp: Date.now(),
      content,
      noteId: id,
    };
    setHistory((prev) => [...prev, newHistoryEntry]);
  };

  const deleteNote = (id: string) => {
    // Prevent deleting the last note
    if (notes.length <= 1) {
      toast.error('최소 한 개의 메모는 유지되어야 합니다');
      return;
    }
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const updatePosition = (id: string, position: { x: number; y: number }) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, position } : note))
    );
  };

  const updateSize = (id: string, size: { width: number; height: number }) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, size } : note))
    );
  };

  const updateColor = (id: string, color: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, color } : note))
    );
  };

  const bringToFront = (id: string) => {
    setNotes((prev) => {
      const maxZIndex = Math.max(...prev.map(n => n.zIndex || 0));
      return prev.map((note) => 
        note.id === id ? { ...note, zIndex: maxZIndex + 1 } : note
      );
    });
  };

  const arrangeGrid = () => {
    const padding = 20;
    const noteWidth = 300;
    const noteHeight = 300;
    const topOffset = 90; // Space for top toolbar (button height + spacing)
    
    // Mobile: single column with maximum width
    if (isMobile) {
      const mobileNoteHeight = 60;
      const verticalSpacing = 20;
      const availableWidth = window.innerWidth - padding * 2;
      
      const updatedNotes = notes.map((note, index) => {
        const x = padding;
        const y = topOffset + index * (mobileNoteHeight + verticalSpacing);
        
        return {
          ...note,
          position: { x, y },
          size: { width: availableWidth, height: mobileNoteHeight },
          zIndex: note.zIndex,
        };
      });
      setNotes(updatedNotes);
      return;
    }
    
    // Desktop: maximize columns with minimal spacing
    const horizontalSpacing = 10; // Reduced spacing between columns
    const verticalSpacing = 20;
    const viewportWidth = window.innerWidth - padding * 2;
    const maxCols = Math.floor((viewportWidth + horizontalSpacing) / (noteWidth + horizontalSpacing));
    const cols = Math.max(1, maxCols);

    const updatedNotes = notes.map((note, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = padding + col * (noteWidth + horizontalSpacing);
      const y = topOffset + row * (noteHeight + verticalSpacing);
      
      return {
        ...note,
        position: { x, y },
        size: { width: noteWidth, height: noteHeight },
        zIndex: note.zIndex,
      };
    });
    
    setNotes(updatedNotes);
  };

  const arrangeStack = () => {
    const padding = 20;
    const noteWidth = 300;
    const noteHeight = 300;
    const topOffset = 90;
    const maxX = window.innerWidth - noteWidth - padding;
    const maxY = window.innerHeight - noteHeight - padding;
    
    // Mobile: align first note with grid layout
    let startX, startY;
    if (isMobile) {
      startX = padding;
      startY = topOffset;
    } else {
      startX = Math.min(Math.max(padding, (window.innerWidth - noteWidth) / 2), maxX);
      startY = Math.min(Math.max(topOffset + padding, (window.innerHeight - noteHeight) / 2), maxY);
    }

    const updatedNotes = notes.map((note, index) => {
      const x = startX + index * 10;
      const y = startY + index * 10;
      
      return {
        ...note,
        position: {
          x: Math.min(x, maxX),
          y: Math.min(y, maxY),
        },
        size: { width: noteWidth, height: noteHeight },
        zIndex: note.zIndex, // Preserve zIndex
      };
    });
    
    setNotes(updatedNotes);
  };

  const arrangeCascade = () => {
    const noteWidth = 300;
    const noteHeight = 300;
    const spacing = 40;
    const topOffset = 90;
    const padding = 20;
    
    const maxX = window.innerWidth - noteWidth - padding;
    const maxY = window.innerHeight - noteHeight - padding;
    
    const updatedNotes = notes.map((note, index) => {
      let x = padding + index * spacing;
      let y = topOffset + padding + index * spacing;
      
      // Wrap around if we go off screen
      if (x > maxX || y > maxY) {
        const wrapIndex = index % 5; // Start wrapping after 5 notes
        x = padding + wrapIndex * spacing;
        y = topOffset + padding + wrapIndex * spacing;
      }
      
      return {
        ...note,
        position: {
          x: Math.min(x, maxX),
          y: Math.min(y, maxY),
        },
        size: { width: noteWidth, height: noteHeight },
        zIndex: note.zIndex, // Preserve zIndex
      };
    });
    
    setNotes(updatedNotes);
  };

  const resizeAll = (size: 'small' | 'medium' | 'large') => {
    const sizeMap = {
      small: { width: 250, height: 250 },
      medium: { width: 300, height: 300 },
      large: { width: 400, height: 400 },
    };

    const updatedNotes = notes.map((note) => ({
      ...note,
      size: sizeMap[size],
      zIndex: note.zIndex, // Preserve zIndex
    }));
    
    setNotes(updatedNotes);
  };

  const handleDoubleClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    const timer = setTimeout(() => {
      setClickCount(0);
    }, 2000);

    setClickTimer(timer);

    if (clickCount + 1 === 5) {
      setShowHistory(true);
      setClickCount(0);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ backgroundColor: '#E5E5E5' }}>
      {/* Sticky Notes */}
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          id={note.id}
          content={note.content}
          position={note.position}
          size={note.size}
          color={note.color}
          zIndex={note.zIndex}
          availableColors={COLORS}
          isMobile={isMobile}
          isLastNote={notes.length === 1}
          onUpdate={updateNote}
          onDelete={deleteNote}
          onPositionChange={updatePosition}
          onSizeChange={updateSize}
          onColorChange={updateColor}
          onDoubleClick={handleDoubleClick}
          onBringToFront={bringToFront}
          onAddNote={addNote}
          onArrangeGrid={arrangeGrid}
          onArrangeStack={arrangeStack}
          onArrangeCascade={arrangeCascade}
        />
      ))}

      {/* History Viewer */}
      <HistoryViewer
        open={showHistory}
        onOpenChange={setShowHistory}
        history={history}
      />
    </div>
  );
}

export default App;
