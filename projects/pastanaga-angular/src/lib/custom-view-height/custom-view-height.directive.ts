import { Directive, HostListener, Inject, OnInit } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { DOCUMENT } from '@angular/common';

@Directive({
    selector: '[paCustomViewHeight]',
})
export class CustomViewHeightDirective implements OnInit {
    constructor(@Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: any) {}

    ngOnInit() {
        this.updateCustomVh();
    }

    @HostListener('window:resize')
    @HostListener('window:orientationchange')
    updateCustomVh() {
        this.document.documentElement.style.setProperty('--customVh', `${this.window.innerHeight / 100}px`);
    }
}
