import { ChangeDetectorRef, ViewRef } from '@angular/core';

export const Keys = {
    enter: 'Enter',
    space: ' ',
    backspace: 'Backspace',
    esc: 'Escape',
    tab: 'Tab',
    arrowRight: 'ArrowRight',
    arrowLeft: 'ArrowLeft',
};

export enum Size {
    small = 'small',
    medium = 'medium',
    large = 'large',
    xlarge = 'xlarge',
    xxlarge = 'xxlarge',
}

export enum Aspect {
    solid = 'solid',
    basic = 'basic',
}

export enum Kind {
    primary = 'primary',
    secondary = 'secondary',
    inverted = 'inverted',
    destructive = 'destructive',
}

export class PositionStyle {
    position?: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    width?: string;
}

export const markForCheck = (cdr: ChangeDetectorRef) => {
    if (!(cdr as ViewRef).destroyed) {
        cdr.markForCheck();
    }
};

export const detectChanges = (cdr: ChangeDetectorRef) => {
    if (!(cdr as ViewRef).destroyed) {
        cdr.detectChanges();
    }
};

export const getPositionedParent = (element: HTMLElement): HTMLElement => {
    if (element.tagName === 'BODY') {
        return element;
    }
    const style = getComputedStyle(element);
    if (style.position !== 'static') {
        return element;
    } else {
        const parent = element.parentElement;
        return parent ? getPositionedParent(parent) : element;
    }
};

export const getRealPosition = (element: HTMLElement): { top: number; left: number } => {
    let tmp: HTMLElement | null = element;
    let tagName = tmp.tagName.toLowerCase();
    let top = 0;
    let left = 0;

    while (!!tmp && tagName !== 'body') {
        top += tmp.offsetTop;
        left += tmp.offsetLeft;
        tmp = tmp.offsetParent as HTMLElement;
        tagName = tmp.tagName.toLowerCase();
    }

    return { top, left };
};

export const getVirtualScrollParentPosition = (element: HTMLElement): { bottom: number; right: number } | null => {
    let tmp: HTMLElement = element;

    while (
        !!tmp &&
        tmp.tagName.toLowerCase() !== 'body' &&
        tmp.tagName.toLowerCase() !== 'cdk-virtual-scroll-viewport'
    ) {
        tmp = tmp.offsetParent as HTMLElement;
    }

    if (!!tmp && tmp.tagName.toLowerCase() === 'cdk-virtual-scroll-viewport') {
        const pos = getRealPosition(tmp);
        return {
            bottom: pos.top + tmp.clientHeight,
            right: pos.left + tmp.clientWidth,
        };
    } else {
        return null;
    }
};
export function cssAsNumber(css: string) {
    const num = !!css ? Number(css.replace('px', '')) : NaN;
    return isNaN(num) ? 0 : num;
}

export function isVisibleInViewport(element?: HTMLElement): boolean {
    if (!element) {
        return false;
    }
    const position = element.getBoundingClientRect();
    return (
        position.top >= 0 &&
        position.left >= 0 &&
        position.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        position.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
