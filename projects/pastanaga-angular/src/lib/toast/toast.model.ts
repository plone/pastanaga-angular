export interface ToastConfig {
    buttonLabel?: string;
    action?: () => any;
    icon?: string;
}

export type ToastType = 'info' | 'success' | 'warning' | 'error';
