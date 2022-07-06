export interface ToastButton {
    label?: string;
    icon?: string;
    action: () => any;
}

export interface ToastConfig {
    autoClose?: boolean;
    button?: ToastButton;
    icon?: string;
    title?: string;
    translateParams?: { [key: string]: string | number };
}

export type ToastType = 'info' | 'success' | 'warning' | 'error';
