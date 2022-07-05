export interface ToastButton {
    label?: string;
    icon?: string;
    action: () => any;
}

export interface ToastConfig {
    button?: ToastButton;
    icon?: string;
    translateParams?: { [key: string]: string | number };
}

export type ToastType = 'info' | 'success' | 'warning' | 'error';
