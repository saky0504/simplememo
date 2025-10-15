import { Grid3x3, Layers, Maximize2, LayoutGrid } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface SortingMenuProps {
  onArrangeGrid: () => void;
  onArrangeStack: () => void;
  onArrangeCascade: () => void;
  isMobile?: boolean;
}

export function SortingMenu({
  onArrangeGrid,
  onArrangeStack,
  onArrangeCascade,
  isMobile = false,
}: SortingMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={isMobile 
            ? "h-16 w-16 rounded-full border-none flex items-center justify-center cursor-pointer transition-all hover:scale-105"
            : "h-14 w-14 rounded-full border-none flex items-center justify-center cursor-pointer transition-all hover:scale-105"
          }
          style={{
            backgroundColor: '#E5E5E5',
            boxShadow: '16px 16px 32px rgba(13, 39, 80, 0.12), -12px -12px 24px rgba(255, 255, 255, 0.6)',
          }}
        >
          <LayoutGrid className={isMobile ? "h-6 w-6" : "h-5 w-5"} style={{ color: '#4B5563' }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 z-[10001]">
        <DropdownMenuItem onClick={onArrangeGrid}>
          <Grid3x3 className="mr-2 h-4 w-4" />
          Grid
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onArrangeStack}>
          <Layers className="mr-2 h-4 w-4" />
          Stack
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onArrangeCascade}>
          <Maximize2 className="mr-2 h-4 w-4" />
          Cascade
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
