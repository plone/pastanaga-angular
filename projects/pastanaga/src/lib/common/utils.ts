import { ChangeDetectorRef, ViewRef } from '@angular/core';

export enum IconSize {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
}

export class Icon {
    path: string;
    backgroundColor: string;
    size: IconSize;

    constructor(data) {
        this.path = data.path;
        this.backgroundColor = data.backgroundColor || '';
        this.size = data.size || IconSize.MEDIUM;
    }
}

export class PositionStyle {
    position?: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
}

export const getFixedRootParent = (element: HTMLElement): HTMLElement => {
    if (element.tagName === 'BODY') {
        return element;
    }
    // an element with `position: fixed` will be positionned relatively to the viewport
    // unless one of the ancestor has a property `transform`, `filter` or `perspective`
    // and its position is not static
    const style = getComputedStyle(element);
    if (style.position !== 'static' && (style.transform !== 'none' || style.perspective !== 'none' || style.filter !== 'none')) {
        return element;
    } else {
        const parent = element.parentElement;
        return parent ? getFixedRootParent(parent) : element;
    }
};

export const getPositionnedParent = (element: HTMLElement): HTMLElement => {
    if (element.tagName === 'BODY') {
        return element;
    }
    const style = getComputedStyle(element);
    if (style.position !== 'static') {
        return element;
    } else {
        const parent = element.parentElement;
        return parent ? getPositionnedParent(parent) : element;
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
