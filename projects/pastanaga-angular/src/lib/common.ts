import { ChangeDetectorRef, ViewRef } from '@angular/core';

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
    critical = 'critical',
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
