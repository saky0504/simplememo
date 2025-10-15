# Simple Sticky Note Widget - 프로젝트 설정 가이드

## 프로젝트 개요
Windows용 Simple Sticky Note Widget - 뉴모피즘 디자인 스타일의 드래그 가능한 메모 애플리케이션

## 기술 스택

### 코어 프레임워크
- **React 18+** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구 (추정)

### 스타일링
- **Tailwind CSS v4.0** - 유틸리티 CSS 프레임워크
- **globals.css** - 커스텀 타이포그래피 및 뉴모피즘 토큰 정의
- ⚠️ **중요**: Tailwind v4.0을 사용하므로 `tailwind.config.js` 파일을 생성하지 마세요

### UI 컴포넌트 라이브러리
- **shadcn/ui** - `./components/ui/` 디렉토리에 설치됨
- **lucide-react** - 아이콘 라이브러리
- **re-resizable** - 리사이즈 기능
- **sonner@2.0.3** - 토스트 알림

### 데이터 저장
- **localStorage** - 브라우저 로컬 스토리지 (향후 Supabase 연동 예정)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 필수 패키지 설치

```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
npm install tailwindcss
npm install lucide-react
npm install re-resizable
npm install sonner@2.0.3
npm install clsx tailwind-merge
```

## 디자인 시스템

### 뉴모피즘 (Neumorphism) 스타일
- **배경색**: `#E5E5E5`
- **그림자**: 
  - 기본: `6px 6px 12px rgba(13, 39, 80, 0.05), -4px -4px 8px rgba(255, 255, 255, 0.3)`
  - 드래그/리사이즈 시: `12px 12px 24px rgba(13, 39, 80, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.5)`

### 색상 팔레트
```typescript
const COLORS = [
  '#FEFEFE', // 회색 (밝은 흰색)
  '#FFCC80', // 오렌지
  '#B8E6BA', // 초록
  '#90CAF9', // 파랑
  '#F8BBD0', // 핑크
];
```

### 타이포그래피
- `styles/globals.css`에 정의된 HTML 요소별 기본 스타일 사용
- ⚠️ **중요**: `text-2xl`, `font-bold`, `leading-none` 같은 Tailwind 클래스를 사용하지 마세요 (사용자가 요청하지 않는 한)

## 프로젝트 구조

```
├── App.tsx                      # 메인 애플리케이션 컴포넌트
├── components/
│   ├── StickyNote.tsx          # 개별 스티키 노트 컴포넌트
│   ├── HistoryViewer.tsx       # 편집 히스토리 뷰어
│   ├── SortingMenu.tsx         # 정렬 메뉴 (현재 미사용)
│   ├── ui/                     # shadcn/ui 컴포넌트
│   └── figma/                  # Figma 관련 유틸리티
└── styles/
    └── globals.css             # 전역 스타일 및 Tailwind 설정
```

## 주요 기능

### 1. 스티키 노트 (StickyNote.tsx)
- **드래그**: 헤더 영역을 드래그하여 이동
- **리사이즈**: 상단, 우측, 하단, 우하단 모서리에서 크기 조절 가능
- **색상 변경**: 5가지 색상 중 선택 (모든 색상 1px stroke, 선택된 색상 3px stroke)
- **삭제**: X 버튼으로 삭제
- **히스토리**: 헤더를 5번 더블클릭하면 24시간 편집 히스토리 표시
- **최상단 이동**: 메모 클릭 시 자동으로 최상단으로 이동 (z-index 조정)

### 2. 정렬 기능 (App.tsx)
- **Grid**: 화면에 균등하게 배치 (모바일: 1열, 데스크탑: 3열)
- **Stack**: 좌측 상단에 겹쳐서 배치
- **Cascade**: 계단식 배치 (20px 간격)

### 3. 반응형 디자인
- **모바일**: 
  - 네비게이션 항상 노출 (`opacity-100`)
  - Grid 정렬 시 1열 레이아웃
  - 화면 너비 최대 활용 (16px 여백)
- **데스크탑**: 
  - 네비게이션 hover 시 노출 (`opacity-0 hover:opacity-100`)
  - Grid 정렬 시 3열 레이아웃

### 4. 데이터 저장
- **localStorage**: 메모 데이터 자동 저장/복원
- **자동 저장**: 메모 내용, 위치, 크기, 색상 변경 시 즉시 저장
- **히스토리**: 24시간 동안의 편집 내역 저장

## 컴포넌트 상세

### App.tsx
```typescript
interface Note {
  id: string;
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  color: string;
  createdAt: number;
  zIndex: number;
  history: Array<{
    content: string;
    timestamp: number;
  }>;
}
```

**주요 함수:**
- `addNote()`: 새 메모 추가
- `deleteNote(id)`: 메모 삭제
- `updateNote(id, content)`: 메모 내용 업데이트 및 히스토리 저장
- `updatePosition(id, position)`: 메모 위치 업데이트
- `updateSize(id, size)`: 메모 크기 업데이트
- `updateColor(id, color)`: 메모 색상 업데이트
- `bringToFront(id)`: 메모를 최상단으로 이동
- `arrangeGrid()`: Grid 정렬
- `arrangeStack()`: Stack 정렬
- `arrangeCascade()`: Cascade 정렬

### StickyNote.tsx
**Props:**
```typescript
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
```

**헤더 버튼 레이아웃:**
- 왼쪽: `+` (새 메모 추가)
- 오른쪽: 정렬 (Grid3x3), 색상 (Palette), 닫기 (X)

**리사이즈 설정:**
```typescript
enable={{
  top: true,        // 상단 리사이즈 가능
  right: true,      // 우측 리사이즈 가능
  bottom: true,     // 하단 리사이즈 가능
  left: false,
  topRight: false,
  bottomRight: true, // 우하단 모서리 리사이즈 가능
  bottomLeft: false,
  topLeft: false,
}}
minWidth={200}
minHeight={150}
```

### HistoryViewer.tsx
- 헤더를 5번 연속 더블클릭하면 표시
- 24시간 이내의 편집 히스토리 표시
- 히스토리 항목 클릭 시 해당 내용으로 복원

## 개발 가이드라인

### Tailwind CSS 사용 규칙
1. **금지된 클래스** (사용자가 요청하지 않는 한):
   - Font size: `text-xl`, `text-2xl` 등
   - Font weight: `font-bold`, `font-semibold` 등
   - Line height: `leading-tight`, `leading-none` 등

2. **이유**: `globals.css`에 HTML 요소별 기본 타이포그래피가 정의되어 있음

### 컴포넌트 생성 규칙
1. 새 컴포넌트는 `/components` 디렉토리에 생성
2. 파일명: PascalCase (예: `MyComponent.tsx`)
3. Import 방식: `import { ComponentName } from "./components/component-name.tsx"`

### shadcn/ui 사용
- `/components/ui` 디렉토리의 컴포넌트만 사용
- 새로운 shadcn 컴포넌트를 추가하지 말 것
- Import 예시: `import { Button } from "./components/ui/button"`

### 이미지 처리
- 새 이미지 필요 시: `ImageWithFallback` 컴포넌트 사용
- Import: `import { ImageWithFallback } from './components/figma/ImageWithFallback'`

## 향후 개발 계획

### Phase 1: 현재 (완료)
- ✅ 기본 스티키 노트 기능
- ✅ 드래그 & 리사이즈
- ✅ 색상 변경
- ✅ 정렬 기능
- ✅ 히스토리 뷰어
- ✅ 모바일 반응형

### Phase 2: 계획 중
- 🔲 Supabase 연동 (모바일 버전과 데이터 동기화)
- 🔲 Windows 위젯 변환
- 🔲 추가 기능 (태그, 검색, 필터 등)

## 디버깅 팁

### localStorage 확인
```javascript
// 브라우저 콘솔에서 실행
console.log(JSON.parse(localStorage.getItem('stickyNotes')));
```

### localStorage 초기화
```javascript
localStorage.removeItem('stickyNotes');
location.reload();
```

## 브라우저 호환성
- Chrome/Edge: ✅ 완전 지원
- Firefox: ✅ 완전 지원
- Safari: ✅ 완전 지원 (iOS 포함)

## 성능 최적화
- 메모 개수가 많아질 경우 virtualization 고려
- 드래그/리사이즈 시 throttle/debounce 적용 가능

