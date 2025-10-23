import { useState, useRef, useEffect } from 'react';
import { Resizable } from 're-resizable';
import { X, Palette, Plus, Grid3x3, Layers, ChevronsRight, Check } from 'lucide-react';
// import { Button } from './ui/button';
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
  isLastNote?: boolean;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onSizeChange: (id: string, size: { width: number; height: number }) => void;
  onColorChange: (id: string, color: string) => void;
  onDoubleClick: () => void;
  onBringToFront: (id: string) => void;
  onAddNote: (sourceNoteId?: string) => void;
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
  isLastNote = false,
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
  const [isHovered, setIsHovered] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Bring to front on any interaction
    onBringToFront(id);
    
    // 메뉴 버튼이나 메뉴 자체가 아닌 곳을 클릭하면 메뉴 닫기
    const target = e.target as HTMLElement;
    const isMenuButton = target.closest('button[data-menu-button]');
    const isMenuContent = target.closest('[data-menu-content]');
    
    if (!isMenuButton && !isMenuContent) {
      setShowColorPicker(false);
      setShowSortingMenu(false);
    }
    
    // Only start dragging if clicking on the header
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      // 드래그 시작 시 현재 위치를 정확히 캡처
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Bring to front on any interaction
    onBringToFront(id);
    
    // 메뉴 버튼이나 메뉴 자체가 아닌 곳을 터치하면 메뉴 닫기
    const target = e.target as HTMLElement;
    const isMenuButton = target.closest('button[data-menu-button]');
    const isMenuContent = target.closest('[data-menu-content]');
    
    if (!isMenuButton && !isMenuContent) {
      setShowColorPicker(false);
      setShowSortingMenu(false);
    }
    
    // Only start dragging if touching the header
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      const touch = e.touches[0];
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setIsDragging(true);
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // 마우스 위치에서 오프셋을 뺀 새로운 위치
        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;
        
        // 화면 경계 계산
        const minX = 0;
        const minY = 0;
        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - size.height;
        
        // 경계를 벗어나면 경계선에 고정
        if (newX < minX) newX = minX;
        if (newX > maxX) newX = maxX;
        if (newY < minY) newY = minY;
        if (newY > maxY) newY = maxY;
        
        onPositionChange(id, {
          x: newX,
          y: newY,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        e.preventDefault(); // 스크롤 방지
        const touch = e.touches[0];
        
        // 터치 위치에서 오프셋을 뺀 새로운 위치
        let newX = touch.clientX - dragOffset.x;
        let newY = touch.clientY - dragOffset.y;
        
        // 화면 경계 계산
        const minX = 0;
        const minY = 0;
        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - size.height;
        
        // 경계를 벗어나면 경계선에 고정
        if (newX < minX) newX = minX;
        if (newX > maxX) newX = maxX;
        if (newY < minY) newY = minY;
        if (newY > maxY) newY = maxY;
        
        onPositionChange(id, {
          x: newX,
          y: newY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset, id, onPositionChange, size.width, size.height]);

  // 윈도우 리사이즈 시 메모가 화면 안으로 자동 조정
  useEffect(() => {
    const handleResize = () => {
      const maxX = window.innerWidth - size.width;
      const maxY = window.innerHeight - size.height;
      
      if (position.x > maxX || position.y > maxY) {
        const clampedX = Math.max(0, Math.min(position.x, maxX));
        const clampedY = Math.max(0, Math.min(position.y, maxY));
        onPositionChange(id, { x: clampedX, y: clampedY });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position, size, id, onPositionChange]);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = 'touches' in event ? event.touches[0].target : event.target;
      if (noteRef.current && !noteRef.current.contains(target as Node)) {
        setShowColorPicker(false);
        setShowSortingMenu(false);
      }
    };

    // capture phase에서 이벤트를 먼저 처리하여 stopPropagation보다 먼저 실행되도록 함
    document.addEventListener('mousedown', handleClickOutside as EventListener, true);
    document.addEventListener('touchstart', handleClickOutside as EventListener, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as EventListener, true);
      document.removeEventListener('touchstart', handleClickOutside as EventListener, true);
    };
  }, []);

  return (
    <Resizable
      className="hide-resize-handles"
      size={{ width: size.width, height: size.height }}
      enableUserSelectHack={false}
      onResizeStart={() => {
        setIsResizing(true);
        onBringToFront(id);
      }}
      onResize={(_e, direction, ref, d) => {
        // 왼쪽/상단 리사이즈 시 우측/하단 가장자리를 고정하기 위해 직접 style 조작
        const newWidth = size.width + d.width;
        const newHeight = size.height + d.height;
        
        // direction은 'left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight' 중 하나
        const isLeft = direction === 'left' || direction === 'topLeft' || direction === 'bottomLeft';
        const isTop = direction === 'top' || direction === 'topLeft' || direction === 'topRight';
        
        if (isLeft) {
          // 왼쪽 리사이즈: 우측 가장자리 고정
          const offsetX = newWidth - size.width;
          ref.style.left = `${position.x - offsetX}px`;
        }
        
        if (isTop) {
          // 상단 리사이즈: 하단 가장자리 고정
          const offsetY = newHeight - size.height;
          ref.style.top = `${position.y - offsetY}px`;
        }
      }}
      onResizeStop={(_e, direction, _ref, d) => {
        setIsResizing(false);
        
        // 1. 최종 크기 계산
        const newWidth = size.width + d.width;
        const newHeight = size.height + d.height;
        
        // 최소/최대 크기 제한
        const clampedWidth = Math.max(200, Math.min(newWidth, window.innerWidth));
        const clampedHeight = Math.max(150, Math.min(newHeight, window.innerHeight));
        
        // 2. 최종 위치 계산 (리사이즈 방향에 따른 위치 보정)
        let newX = position.x;
        let newY = position.y;

        // direction 확인
        const isLeft = direction === 'left' || direction === 'topLeft' || direction === 'bottomLeft';
        const isTop = direction === 'top' || direction === 'topLeft' || direction === 'topRight';

        // 왼쪽 리사이즈 시 (left, topLeft, bottomLeft)
        // 리사이즈 전 너비(size.width)와 리사이즈 후 너비(clampedWidth)의 차이만큼 X 위치가 이동해야 합니다.
        if (isLeft) {
            // 늘어난 너비(d.width)만큼 X 좌표를 왼쪽(음수)으로 이동시켜야 합니다.
            // re-resizable의 d.width는 늘어난 길이(양수)를 반환하는 경향이 있으므로,
            // (새 너비 - 원래 너비)만큼 X를 빼줍니다. 
            newX = position.x - (clampedWidth - size.width);
        }
        
        // 상단 리사이즈 시 (top, topLeft, topRight)
        // 늘어난 높이(d.height)만큼 Y 좌표를 위쪽(음수)으로 이동시켜야 합니다.
        if (isTop) {
            newY = position.y - (clampedHeight - size.height);
        }
        
        // 3. 경계 조건 재확인 (위치가 화면 밖으로 나가지 않도록)
        newX = Math.max(0, newX);
        newY = Math.max(0, newY);

        // 4. 상태 업데이트
        onPositionChange(id, { x: newX, y: newY });
        onSizeChange(id, {
          width: clampedWidth,
          height: clampedHeight,
        });
      }}
      minWidth={200}
      minHeight={150}
      enable={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      handleStyles={{
        top: { 
          height: isMobile ? '15px' : '15px', 
          top: isMobile ? '-10px' : '0', 
          left: isMobile ? '80px' : '30px', 
          width: isMobile ? 'calc(100% - 160px)' : 'calc(100% - 60px)',
          backgroundColor: 'transparent',
          cursor: 'ns-resize',
          zIndex: 100,
          touchAction: 'none'
        },
        right: { 
          width: isMobile ? '50px' : '15px', 
          right: isMobile ? '-10px' : '-7.5px', 
          top: '36px', 
          height: 'calc(100% - 36px)',
          backgroundColor: 'transparent',
          cursor: 'ew-resize',
          zIndex: 100,
          touchAction: 'none'
        },
        bottom: { 
          height: isMobile ? '50px' : '15px', 
          bottom: isMobile ? '-10px' : '-7.5px', 
          left: isMobile ? '50px' : '15px', 
          width: isMobile ? 'calc(100% - 100px)' : 'calc(100% - 30px)',
          backgroundColor: 'transparent',
          cursor: 'ns-resize',
          zIndex: 100,
          touchAction: 'none'
        },
        left: { 
          width: isMobile ? '50px' : '15px', 
          left: isMobile ? '-10px' : '-7.5px', 
          top: '36px', 
          height: 'calc(100% - 36px)',
          backgroundColor: 'transparent',
          cursor: 'ew-resize',
          zIndex: 100,
          touchAction: 'none'
        },
        topRight: { 
          width: isMobile ? '80px' : '30px', 
          height: '36px', 
          top: '0', 
          right: isMobile ? '-20px' : '-15px',
          backgroundColor: 'transparent',
          cursor: 'ne-resize',
          zIndex: 100,
          touchAction: 'none'
        },
        bottomLeft: { 
          width: isMobile ? '80px' : '30px', 
          height: isMobile ? '80px' : '30px', 
          bottom: isMobile ? '-20px' : '-15px', 
          left: isMobile ? '-20px' : '-15px',
          backgroundColor: 'transparent',
          cursor: 'sw-resize',
          zIndex: 100,
          touchAction: 'none'
        },
        topLeft: { 
          width: isMobile ? '80px' : '30px', 
          height: '36px', 
          top: '0', 
          left: isMobile ? '-20px' : '-15px',
          backgroundColor: 'transparent',
          cursor: 'nw-resize',
          zIndex: 100,
          touchAction: 'none'
        },
        bottomRight: { 
          width: isMobile ? '80px' : '30px', 
          height: isMobile ? '80px' : '30px', 
          bottom: isMobile ? '-20px' : '-15px', 
          right: isMobile ? '-20px' : '-15px',
          backgroundColor: 'transparent',
          cursor: 'se-resize',
          zIndex: 100,
          touchAction: 'none'
        },
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
        onMouseDown={(e) => {
          // 메모를 클릭하면 항상 가장 위로 올림
          onBringToFront(id);
          
          // 메뉴 버튼이나 메뉴 자체가 아닌 곳을 클릭하면 메뉴 닫기
          const target = e.target as HTMLElement;
          const isMenuButton = target.closest('button[data-menu-button]');
          const isMenuContent = target.closest('[data-menu-content]');
          
          if (!isMenuButton && !isMenuContent) {
            setShowColorPicker(false);
            setShowSortingMenu(false);
          }
          
          // 헤더가 아닌 영역에서는 드래그 방지 (하지만 버튼 클릭은 허용)
          if (!(e.target as HTMLElement).closest('.drag-handle') && 
              !(e.target as HTMLElement).closest('button')) {
            e.preventDefault();
            e.stopPropagation();
            
            // 헤더나 버튼이 아닌 영역을 클릭하면 textarea에 포커스
            if (textareaRef.current) {
              textareaRef.current.focus();
            }
          }
        }}
        onTouchStart={(e) => {
          // 모바일에서 메모를 터치하면 항상 가장 위로 올림
          onBringToFront(id);
          
          // 메뉴 버튼이나 메뉴 자체가 아닌 곳을 터치하면 메뉴 닫기
          const target = e.target as HTMLElement;
          const isMenuButton = target.closest('button[data-menu-button]');
          const isMenuContent = target.closest('[data-menu-content]');
          
          if (!isMenuButton && !isMenuContent) {
            setShowColorPicker(false);
            setShowSortingMenu(false);
          }
          
          // 헤더나 버튼이 아닌 영역을 터치하면 textarea에 포커스
          if (!(e.target as HTMLElement).closest('.drag-handle') && 
              !(e.target as HTMLElement).closest('button') &&
              textareaRef.current) {
            textareaRef.current.focus();
          }
        }}
        onClick={(e) => {
          // 헤더나 버튼이 아닌 영역을 클릭하면 textarea에 포커스 (추가 보장)
          if (!(e.target as HTMLElement).closest('.drag-handle') && 
              !(e.target as HTMLElement).closest('button') &&
              textareaRef.current) {
            textareaRef.current.focus();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'visible',
          backgroundColor: color,
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: (isDragging || isResizing)
            ? '12px 12px 24px rgba(13, 39, 80, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.08)'
            : '6px 6px 12px rgba(13, 39, 80, 0.05), -4px -4px 8px rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.06)',
          transition: (isDragging || isResizing) ? 'none' : 'box-shadow 0.2s ease',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        {/* Header - hover 시 표시 */}
        <div
          className="drag-handle cursor-move relative"
          style={{ 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: (isHovered || isMobile || showColorPicker || showSortingMenu) ? 1 : 0,
            zIndex: 200,
            backgroundColor: 'transparent',
            borderRadius: '8px 8px 0 0',
            padding: '6px 8px',
            minHeight: '36px',
            width: '100%',
            flexShrink: 0,
            overflow: 'visible',
            boxSizing: 'border-box',
            transition: 'opacity 0.2s ease',
            position: 'relative'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onDoubleClick={onDoubleClick}
        >
          {/* 왼쪽: 추가 버튼 */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
            {/* 추가 버튼 */}
            <button
              type="button"
              style={{
                border: 'none',
                background: 'transparent',
                padding: isMobile ? '6px' : '0',
                margin: '0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: isMobile ? '32px' : 'auto',
                minHeight: isMobile ? '32px' : 'auto'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onAddNote(id);
              }}
              aria-label="메모 추가"
            >
              <Plus style={{ width: isMobile ? '18px' : '14px', height: isMobile ? '18px' : '14px', color: '#6B7280' }} />
            </button>
          </div>
          
          {/* 오른쪽: 정렬, 색상, 삭제 버튼 */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: isMobile ? '0' : '12px' }}>
            {/* 정렬 메뉴 버튼 */}
            <button
              type="button"
              data-menu-button="sorting"
              style={{
                border: 'none',
                background: 'transparent',
                padding: '0',
                margin: '0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowSortingMenu(!showSortingMenu);
                setShowColorPicker(false);
              }}
              aria-label="정렬 메뉴"
            >
              <Grid3x3 style={{ width: isMobile ? '18px' : '14px', height: isMobile ? '18px' : '14px', color: '#6B7280' }} />
            </button>

            {/* 색상 선택 버튼 */}
            <button
              type="button"
              data-menu-button="color"
              style={{
                border: 'none',
                background: 'transparent',
                padding: '0',
                margin: '0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(!showColorPicker);
                setShowSortingMenu(false);
              }}
              aria-label="색상 선택"
            >
              <Palette style={{ width: isMobile ? '18px' : '14px', height: isMobile ? '18px' : '14px', color: '#6B7280' }} />
            </button>

            {/* 삭제 버튼 */}
            <button
              type="button"
              style={{
                border: 'none',
                background: 'transparent',
                padding: '0',
                margin: '0',
                cursor: isLastNote ? 'not-allowed' : 'pointer',
                opacity: isLastNote ? 0.3 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!isLastNote) onDelete(id);
              }}
              disabled={isLastNote}
              aria-label="메모 삭제"
            >
              <X style={{ width: isMobile ? '18px' : '14px', height: isMobile ? '18px' : '14px', color: isLastNote ? '#9CA3AF' : '#6B7280' }} />
            </button>
          </div>
          
          {/* 정렬 메뉴 팝업 */}
          {showSortingMenu && (
            <div 
              data-menu-content="sorting"
              style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '4px',
                padding: '4px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                zIndex: 10000,
                backgroundColor: color,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                minWidth: '120px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => {
                  onArrangeGrid();
                  setShowSortingMenu(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Grid3x3 style={{ width: isMobile ? '18px' : '14px', height: isMobile ? '18px' : '14px', color: '#6B7280', flexShrink: 0 }} />
                <span style={{ color: '#374151', fontWeight: '500' }}>Grid</span>
              </button>
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => {
                  onArrangeStack();
                  setShowSortingMenu(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Layers style={{ width: isMobile ? '18px' : '14px', height: isMobile ? '18px' : '14px', color: '#6B7280', flexShrink: 0 }} />
                <span style={{ color: '#374151', fontWeight: '500' }}>Stack</span>
              </button>
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => {
                  onArrangeCascade();
                  setShowSortingMenu(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <ChevronsRight style={{ width: isMobile ? '18px' : '14px', height: isMobile ? '18px' : '14px', color: '#6B7280', flexShrink: 0 }} />
                <span style={{ color: '#374151', fontWeight: '500' }}>Cascade</span>
              </button>
            </div>
          )}
          
          {/* 색상 선택 팝업 */}
          {showColorPicker && (
            <div 
              data-menu-content="color"
              style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '4px',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                zIndex: 10000,
                backgroundColor: color,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                flexWrap: 'nowrap'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {availableColors.map((availableColor) => (
                <button
                  type="button"
                  key={availableColor}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: '1px solid rgba(0, 0, 0, 0.15)',
                    backgroundColor: availableColor,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    margin: '0',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease'
                  }}
                  onClick={() => {
                    onColorChange(id, availableColor);
                    setShowColorPicker(false);
                  }}
                  aria-label={`색상 ${availableColor} 선택`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {color === availableColor && (
                    <Check 
                      className="h-4 w-4" 
                      style={{ 
                        color: '#374151',
                        strokeWidth: 3
                      }} 
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div 
          style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            width: '100%',
            minHeight: 0,
            position: 'relative',
            zIndex: 10
          }}
          onMouseDown={(e) => {
            // Textarea 영역 클릭 시 메뉴 닫기
            setShowColorPicker(false);
            setShowSortingMenu(false);
            // Textarea 영역에서는 드래그 방지
            e.stopPropagation();
          }}
        >
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onUpdate(id, e.target.value)}
            className="resize-none border-none focus-visible:ring-0 bg-transparent"
            style={{ 
              width: '100%',
              height: '100%',
              minHeight: 0,
              maxHeight: '100%',
              color: '#374151',
              fontSize: isMobile ? '16px' : '14px',
              lineHeight: '1.5',
              paddingLeft: isMobile ? '12px' : '16px',
              paddingRight: isMobile ? '12px' : '16px',
              paddingTop: '8px',
              paddingBottom: isMobile ? '12px' : '16px',
              backgroundColor: 'transparent',
              outline: 'none',
              border: 'none',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              pointerEvents: 'auto',
              overflow: 'auto',
              resize: 'none',
              WebkitUserSelect: 'text',
              userSelect: 'text',
              touchAction: 'pan-y'
            }}
            placeholder="write something"
            onMouseDown={(e) => {
              // Textarea 클릭 시 메뉴 닫기
              setShowColorPicker(false);
              setShowSortingMenu(false);
              // Textarea 클릭 시 메모를 가장 위로 올림
              onBringToFront(id);
              // 드래그 이벤트 방지
              e.stopPropagation();
            }}
            onTouchStart={(e) => {
              // Textarea 터치 시 메뉴 닫기
              setShowColorPicker(false);
              setShowSortingMenu(false);
              // Textarea 터치 시 메모를 가장 위로 올림
              onBringToFront(id);
            }}
            onFocus={() => {
              // Textarea 포커스 시 메뉴 닫기
              setShowColorPicker(false);
              setShowSortingMenu(false);
              // Textarea 포커스 시 메모를 가장 위로 올림
              onBringToFront(id);
            }}
          />
        </div>
      </div>
    </Resizable>
  );
}
