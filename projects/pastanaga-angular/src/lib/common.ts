import { ChangeDetectorRef, ViewRef } from '@angular/core';

export const Keys = {
    enter: 'Enter',
    space: ' ',
    backspace: 'Backspace',
    esc: 'Escape',
    tab: 'Tab'
};

export enum Size {
    xsmall = 'xsmall',
    small = 'small',
    medium = 'medium',
    large = 'large',
}

export enum Weight {
    accent = 'accent',
    regular = 'regular',
    dim = 'dim',
}

export enum Kind {
    primary = 'primary',
    secondary = 'secondary',
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

export const getRealPosition = (element: HTMLElement): {top: number, left: number} => {
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

    return {top, left};
};

export const getVirtualScrollParentPosition = (element: HTMLElement): {bottom: number, right: number} | null => {
    let tmp: HTMLElement = element;

    while (!!tmp && tmp.tagName.toLowerCase() !== 'body' && tmp.tagName.toLowerCase() !== 'cdk-virtual-scroll-viewport') {
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
