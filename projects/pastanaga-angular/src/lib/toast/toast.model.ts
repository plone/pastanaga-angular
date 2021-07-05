export interface ToastConfig {
    buttonLabel?: string;
    action?: () => any;
    icon?: string;
    translateParams?: { [key: string]: string | number };
}

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type ToastStatus = 'closed' | 'opening' | 'opened';
