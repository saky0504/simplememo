import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      // Map version-suffixed imports to real packages
      "@radix-ui/react-slot@1.1.2": "@radix-ui/react-slot",
      "@radix-ui/react-scroll-area@1.2.3": "@radix-ui/react-scroll-area",
      "@radix-ui/react-dialog@1.1.6": "@radix-ui/react-dialog",
      "class-variance-authority@0.7.1": "class-variance-authority",
      "lucide-react@0.487.0": "lucide-react",
      "sonner@2.0.3": "sonner",
    },
  },
})