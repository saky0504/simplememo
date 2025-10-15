import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface HistoryEntry {
  timestamp: number;
  content: string;
  noteId: string;
}

interface HistoryViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  history: HistoryEntry[];
}

export function HistoryViewer({ open, onOpenChange, history }: HistoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter history from the last 24 hours and sort by timestamp
  const recentHistory = history
    .filter((entry) => Date.now() - entry.timestamp < 24 * 60 * 60 * 1000)
    .sort((a, b) => b.timestamp - a.timestamp);

  const currentEntry = recentHistory[currentIndex];

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return date.toLocaleString();
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, recentHistory.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>메모 히스토리 (최근 24시간)</DialogTitle>
          <DialogDescription>
            화살표 버튼으로 이전 버전을 확인하세요.
          </DialogDescription>
        </DialogHeader>

        {recentHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Clock className="w-12 h-12 mb-4 opacity-50" />
            <p>아직 히스토리가 없습니다</p>
            <p className="text-sm">메모를 수정하면 히스토리가 생성됩니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentIndex >= recentHistory.length - 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                이전
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} / {recentHistory.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentIndex <= 0}
              >
                다음
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Current entry */}
            {currentEntry && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {formatTime(currentEntry.timestamp)}
                </div>
                <ScrollArea className="h-64 w-full rounded-md border p-4">
                  <div className="whitespace-pre-wrap">{currentEntry.content}</div>
                </ScrollArea>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              히스토리는 24시간 후 자동으로 삭제됩니다
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
