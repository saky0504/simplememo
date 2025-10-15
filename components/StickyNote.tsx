import { useState, useRef, useEffect } from 'react';
import { Resizable } from 're-resizable';
import { X, Palette, Plus, Grid3x3, Layers, ChevronsRight } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface StickyNoteProps {
  id: string;
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  color: string;
  zIndex: number;
  availableColors: string[];
  isMobile?: boolean;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onSizeChange: (id: string, size: { width: number; height: number }) => void;
  onColorChange: (id: string, color: string) => void;
  onDoubleClick: () => void;
  onBringToFront: (id: string) => void;
  onAddNote: () => void;
  onArrangeGrid: () => void;
  onArrangeStack: () => void;
  onArrangeCascade: () => void;
}

export function StickyNote({
  id,
  content,
  position,
  size,
  color,
  zIndex,
  availableColors,
  isMobile = false,
  onUpdate,
  onDelete,
  onPositionChange,
  onSizeChange,
  onColorChange,
  onDoubleClick,
  onBringToFront,
  onAddNote,
  onArrangeGrid,
  onArrangeStack,
  onArrangeCascade,
}: StickyNoteProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSortingMenu, setShowSortingMenu] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Bring to front on any interaction
    onBringToFront(id);
    
    // Only start dragging if clicking on the header
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onPositionChange(id, {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, id, onPositionChange]);

  return (
    <Resizable
      size={{ width: size.width, height: size.height }}
      onResizeStart={() => {
        setIsResizing(true);
        onBringToFront(id);
      }}
      onResize={(e, direction, ref, d) => {
        // Update position when resizing from top
        if (direction === 'top' || direction === 'topRight' || direction === 'topLeft') {
          onPositionChange(id, {
            x: position.x,
            y: position.y - d.height,
          });
        }
      }}
      onResizeStop={(e, direction, ref, d) => {
        setIsResizing(false);
        onSizeChange(id, {
          width: size.width + d.width,
          height: size.height + d.height,
        });
      }}
      minWidth={200}
      minHeight={150}
      enable={{
        top: true,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: isDragging || isResizing ? 9999 : zIndex,
      }}
    >
      <div
        ref={noteRef}
        className="h-full flex flex-col rounded-xl overflow-hidden"
        onMouseDown={() => onBringToFront(id)}
        style={{ 
          backgroundColor: color,
          boxShadow: (isDragging || isResizing)
            ? '12px 12px 24px rgba(13, 39, 80, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.5)'
            : '6px 6px 12px rgba(13, 39, 80, 0.05), -4px -4px 8px rgba(255, 255, 255, 0.3)',
          transition: (isDragging || isResizing) ? 'none' : 'box-shadow 0.2s ease',
        }}
      >
        {/* Header */}
        <div
          className={isMobile 
            ? "drag-handle flex items-center justify-between px-3 py-1 cursor-move opacity-100 transition-opacity relative"
            : "drag-handle flex items-center justify-between px-3 py-1 cursor-move opacity-0 hover:opacity-100 transition-opacity relative"
          }
          onMouseDown={handleMouseDown}
          onDoubleClick={onDoubleClick}
        >
          <div className="flex items-center gap-1">
            <button
              className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors border-none bg-transparent cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onAddNote();
              }}
            >
              <Plus className="h-4 w-4" style={{ color: '#9CA3AF' }} />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors border-none bg-transparent cursor-pointer relative"
              onClick={(e) => {
                e.stopPropagation();
                setShowSortingMenu(!showSortingMenu);
              }}
            >
              <Grid3x3 className="h-4 w-4" style={{ color: '#9CA3AF' }} />
            </button>
            <button
              className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors border-none bg-transparent cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(!showColorPicker);
              }}
            >
              <Palette className="h-4 w-4" style={{ color: '#9CA3AF' }} />
            </button>
            <button
              className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors border-none bg-transparent cursor-pointer"
              onClick={() => onDelete(id)}
            >
              <X className="h-4 w-4" style={{ color: '#9CA3AF' }} />
            </button>
          </div>
          
          {/* Sorting Menu */}
          {showSortingMenu && (
            <div 
              className="absolute top-full left-0 mt-1 p-2 rounded-lg flex flex-col gap-1 z-50"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer text-sm whitespace-nowrap"
                onClick={() => {
                  onArrangeGrid();
                  setShowSortingMenu(false);
                }}
              >
                <Grid3x3 className="h-4 w-4" style={{ color: '#6B7280' }} />
                <span style={{ color: '#374151' }}>Grid</span>
              </button>
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer text-sm whitespace-nowrap"
                onClick={() => {
                  onArrangeStack();
                  setShowSortingMenu(false);
                }}
              >
                <Layers className="h-4 w-4" style={{ color: '#6B7280' }} />
                <span style={{ color: '#374151' }}>Stack</span>
              </button>
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer text-sm whitespace-nowrap"
                onClick={() => {
                  onArrangeCascade();
                  setShowSortingMenu(false);
                }}
              >
                <ChevronsRight className="h-4 w-4" style={{ color: '#6B7280' }} />
                <span style={{ color: '#374151' }}>Cascade</span>
              </button>
            </div>
          )}
          
          {/* Color Picker */}
          {showColorPicker && (
            <div 
              className="absolute top-full right-0 mt-1 p-2 rounded-lg flex gap-2 z-50"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {availableColors.map((availableColor) => (
                <button
                  key={availableColor}
                  className="w-8 h-8 rounded-full cursor-pointer transition-all hover:scale-110"
                  style={{
                    backgroundColor: availableColor,
                    border: color === availableColor ? '3px solid #374151' : '1px solid #D1D5DB',
                  }}
                  onClick={() => {
                    onColorChange(id, availableColor);
                    setShowColorPicker(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-4 overflow-hidden" style={{ paddingLeft: '0px', paddingRight: '2px' }}>
          <Textarea
            value={content}
            onChange={(e) => onUpdate(id, e.target.value)}
            className="w-full h-full resize-none border-none focus-visible:ring-0 bg-transparent text-gray-700 placeholder:text-gray-400 text-sm"
            placeholder="write something"
            style={{ paddingRight: '6px' }}
          />
        </div>
      </div>
    </Resizable>
  );
}
