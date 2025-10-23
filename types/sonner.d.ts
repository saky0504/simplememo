declare module 'sonner' {
  export interface Toast {
    (message: string, options?: any): void;
    success(message: string, options?: any): void;
    error(message: string, options?: any): void;
    warning(message: string, options?: any): void;
    info(message: string, options?: any): void;
  }
  export const toast: Toast;
  export const Toaster: any;
}

