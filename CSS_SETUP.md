# CSS 환경 설정 완벽 가이드

## 1. Tailwind CSS 버전 및 설정

### 사용 버전
- **Tailwind CSS v4.0** (최신 버전)

### ⚠️ 중요: tailwind.config.js 파일을 생성하지 마세요
Tailwind v4.0은 CSS 파일 내에서 직접 설정합니다.

## 2. globals.css 전체 코드

파일 위치: `/styles/globals.css`

```css
@import "tailwindcss";

/* Root variables */
:root {
  --background: #E5E5E5;
  --foreground: #1a1a1a;
}

/* Dark mode variables (optional - 현재 미사용) */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #1a1a1a;
    --foreground: #ededed;
  }
}

/* Base styles */
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background);
  color: var(--foreground);
}

/* Typography defaults */
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-weight: 600;
}

p {
  margin: 0;
  line-height: 1.6;
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Utility classes */
.neumorphic {
  box-shadow: 6px 6px 12px rgba(13, 39, 80, 0.05), -4px -4px 8px rgba(255, 255, 255, 0.3);
}

.neumorphic-active {
  box-shadow: 12px 12px 24px rgba(13, 39, 80, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.5);
}
```

## 3. Tailwind 설정 (CSS 내부)

### 임포트 방식
```css
@import "tailwindcss";
```

### 커스텀 유틸리티 추가 (필요시)
```css
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## 4. 컴포넌트별 인라인 스타일 상세

### App.tsx
```typescript
// 배경 스타일
style={{ backgroundColor: '#E5E5E5' }}
```

### StickyNote.tsx

#### 메인 컨테이너 (Resizable)
```typescript
style={{
  position: 'absolute',
  left: position.x,
  top: position.y,
  zIndex: isDragging || isResizing ? 9999 : zIndex,
}}
```

#### 메모 카드
```typescript
style={{ 
  backgroundColor: color, // COLORS 배열의 색상
  boxShadow: (isDragging || isResizing)
    ? '12px 12px 24px rgba(13, 39, 80, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.5)'
    : '6px 6px 12px rgba(13, 39, 80, 0.05), -4px -4px 8px rgba(255, 255, 255, 0.3)',
  transition: (isDragging || isResizing) ? 'none' : 'box-shadow 0.2s ease',
}}
```

#### 아이콘 색상
```typescript
style={{ color: '#9CA3AF' }} // 모든 아이콘 (Plus, Grid3x3, Palette, X, Layers, ChevronsRight)
```

#### 색상 선택기 팝업
```typescript
style={{
  backgroundColor: '#FFFFFF',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}}
```

#### 색상 버튼
```typescript
style={{
  backgroundColor: availableColor, // 각 색상
  border: color === availableColor 
    ? '3px solid #374151'  // 선택된 색상
    : '1px solid #D1D5DB', // 기본 색상
}}
```

#### 정렬 메뉴 팝업
```typescript
style={{
  backgroundColor: '#FFFFFF',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}}
```

#### 정렬 메뉴 아이콘
```typescript
style={{ color: '#6B7280' }} // Grid3x3, Layers, ChevronsRight
```

#### 정렬 메뉴 텍스트
```typescript
style={{ color: '#374151' }} // 'Grid', 'Stack', 'Cascade'
```

#### Textarea 스타일
```typescript
style={{ paddingRight: '6px' }}

// 그리고 wrapper div
style={{ paddingLeft: '0px', paddingRight: '2px' }}
```

### HistoryViewer.tsx

#### 오버레이
```typescript
style={{
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
}}
```

#### 모달 컨테이너
```typescript
style={{
  backgroundColor: '#FFFFFF',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
}}
```

### SortingMenu.tsx (현재 미사용이지만 코드 존재)

#### 버튼 스타일
```typescript
style={{
  backgroundColor: '#E5E5E5',
  boxShadow: '16px 16px 32px rgba(13, 39, 80, 0.12), -12px -12px 24px rgba(255, 255, 255, 0.6)',
}}
```

#### 아이콘 색상
```typescript
style={{ color: '#4B5563' }}
```

## 5. 색상 팔레트 전체

### 메인 배경
```typescript
'#E5E5E5' // 뉴모피즘 배경
```

### 메모 색상 (COLORS 배열)
```typescript
const COLORS = [
  '#FEFEFE', // 회색 (밝은 흰색)
  '#FFCC80', // 오렌지
  '#B8E6BA', // 초록
  '#90CAF9', // 파랑 (코드에서는 #81D4FA로 변경됨)
  '#F8BBD0', // 핑크
];
```

### UI 색상
```typescript
'#9CA3AF' // 아이콘 기본 색상 (회색)
'#6B7280' // 정렬 메뉴 아이콘
'#374151' // 선택된 색상 테두리, 정렬 메뉴 텍스트
'#D1D5DB' // 기본 색상 테두리
'#4B5563' // 정렬 버튼 아이콘
'#FFFFFF' // 팝업 배경
```

### 투명도/오버레이
```typescript
'rgba(0, 0, 0, 0.5)'   // 히스토리 오버레이
'rgba(0, 0, 0, 0.15)'  // 팝업 그림자
'rgba(0, 0, 0, 0.2)'   // 모달 그림자, 스크롤바
'rgba(0, 0, 0, 0.3)'   // 스크롤바 hover
'rgba(255, 255, 255, 0.1)' // 스크롤바 track
```

## 6. 그림자(Box Shadow) 정의

### 뉴모피즘 그림자

#### 기본 상태
```css
box-shadow: 6px 6px 12px rgba(13, 39, 80, 0.05), -4px -4px 8px rgba(255, 255, 255, 0.3);
```

#### 활성 상태 (드래그/리사이즈)
```css
box-shadow: 12px 12px 24px rgba(13, 39, 80, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.5);
```

#### 큰 버튼 (정렬 메뉴)
```css
box-shadow: 16px 16px 32px rgba(13, 39, 80, 0.12), -12px -12px 24px rgba(255, 255, 255, 0.6);
```

### 일반 그림자

#### 팝업/드롭다운
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
```

#### 모달
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
```

## 7. Tailwind 클래스 사용 규칙

### ✅ 사용 가능한 클래스들

#### 레이아웃
```
h-screen, w-screen, h-full, w-full
flex, flex-col, flex-row
items-center, justify-between, justify-center
gap-1, gap-2, gap-3, gap-4
p-2, p-3, p-4, px-3, py-1
absolute, fixed, relative
```

#### 크기
```
h-4, w-4 (아이콘)
h-6, w-6 (버튼)
h-14, w-14 (데스크탑 큰 버튼)
h-16, w-16 (모바일 큰 버튼)
```

#### 스타일링
```
rounded-full, rounded-lg, rounded-xl
border-none, border-2
bg-transparent, bg-black/5, bg-gray-100
overflow-hidden, overflow-auto
```

#### 상태
```
hover:bg-black/5
hover:bg-gray-100
hover:scale-105
hover:scale-110
cursor-pointer
cursor-move
cursor-not-allowed
opacity-0, opacity-30, opacity-100
transition-opacity
transition-colors
transition-transform
transition-all
```

#### 텍스트
```
text-gray-700
text-gray-400
text-sm
placeholder:text-gray-400
whitespace-nowrap
```

#### z-index
```
z-50
z-[10000]
z-[10001]
```

### ❌ 사용 금지 클래스 (사용자 요청 시에만 사용)
```
text-xl, text-2xl, text-3xl (폰트 크기)
font-bold, font-semibold (폰트 굵기)
leading-tight, leading-none (라인 높이)
```

## 8. 스크롤바 커스텀 스타일

```css
/* 스크롤바 너비/높이 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* 스크롤바 트랙 */
::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

/* 스크롤바 Thumb */
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

/* 스크롤바 Thumb Hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
```

## 9. 트랜지션 설정

### Box Shadow 트랜지션
```typescript
transition: (isDragging || isResizing) ? 'none' : 'box-shadow 0.2s ease'
```

### Tailwind 트랜지션 클래스
```
transition-opacity    // opacity 변화
transition-colors     // 색상 변화
transition-transform  // transform 변화
transition-all        // 모든 속성 변화
```

## 10. 반응형 브레이크포인트

### useIsMobile Hook 사용
```typescript
const isMobile = useIsMobile(); // 768px 이하
```

### 조건부 클래스 적용
```typescript
className={isMobile 
  ? "모바일 클래스들"
  : "데스크탑 클래스들"
}
```

## 11. 패키지 설치 (CSS 관련)

```bash
# Tailwind CSS 및 관련 패키지
npm install tailwindcss@latest
npm install autoprefixer
npm install postcss

# shadcn/ui 의존성
npm install clsx tailwind-merge

# 유틸리티
npm install class-variance-authority
```

## 12. PostCSS 설정

파일: `postcss.config.js` (또는 `postcss.config.mjs`)

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 13. Import 순서

### 컴포넌트에서 CSS 임포트
```typescript
// globals.css는 최상위 파일(main.tsx 또는 App.tsx)에서만 임포트
import './styles/globals.css'
```

### 컴포넌트 파일 내 임포트 순서
```typescript
// 1. React 관련
import { useState, useRef, useEffect } from 'react';

// 2. 외부 라이브러리
import { Resizable } from 're-resizable';

// 3. 아이콘
import { X, Palette, Plus } from 'lucide-react';

// 4. 로컬 컴포넌트
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
```

## 14. 빌드 설정 (Vite)

파일: `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
})
```

## 15. 실전 체크리스트

### 프로젝트 시작 시
- [ ] `npm install tailwindcss`
- [ ] `styles/globals.css` 파일 생성 및 위 내용 복사
- [ ] `postcss.config.js` 생성
- [ ] main.tsx에서 `import './styles/globals.css'`
- [ ] ❌ `tailwind.config.js` 생성하지 않기 (v4.0이므로)

### 개발 중
- [ ] 인라인 스타일에서 색상 팔레트 일관성 유지
- [ ] 뉴모피즘 그림자 정확히 사용
- [ ] font-size, font-weight, line-height 관련 Tailwind 클래스 사용 금지
- [ ] 스크롤바 커스텀 스타일 확인

### 디버깅
- [ ] 브라우저 개발자 도구에서 적용된 스타일 확인
- [ ] Tailwind 클래스가 제대로 적용되는지 확인
- [ ] 인라인 스타일이 우선순위를 가져 Tailwind 클래스를 덮어쓰는지 확인

## 16. 추가 참고사항

### Textarea 리사이즈 방지
```typescript
className="resize-none" // Tailwind 클래스
```

### Focus Ring 제거
```typescript
className="focus-visible:ring-0" // shadcn/ui 컴포넌트에 적용
```

### 버튼 기본 스타일 제거
```typescript
className="border-none bg-transparent"
```

이 문서를 참고하여 CSS 환경을 완벽하게 복제할 수 있습니다!
