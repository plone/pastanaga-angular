import { Component, ElementRef, Input, OnChanges, Renderer2, ViewEncapsulation, } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { isPlatformBrowser } from '@angular/common';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { SvgLoader } from './svg-loader';

@Component({
    selector: 'pa-icon',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class IconComponent implements OnChanges {
    @Input() name: string;
    @Input() hidden: boolean;

    iconPath: string;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private service: SvgIconRegistryService,
        private svgLoader: SvgLoader,
        @Inject(PLATFORM_ID) protected platformId: Object
    ) {
    }

    ngOnChanges(changes) {
        if (changes.name && changes.name.currentValue) {
            this.iconPath = `./assets/icons/${this.name}.svg`;
            this.updateSvg();
        }
    }

    private updateSvg() {
        if (isPlatformBrowser(this.platformId)) {
            this.service.loadSvg(this.iconPath).subscribe(svg => {
                this.setSvg(svg);
            });
        } else {
            this.svgLoader.loadSvgFromSsr(this.iconPath, this.renderer).subscribe(svg => {
                this.setSvg(svg);
            });
        }
    }

    private setSvg(svg: SVGElement) {
        const icon = <SVGElement>svg.cloneNode(true);
        if (typeof this.hidden !== 'undefined') {
            this.renderer.setAttribute(icon, 'aria-hidden', this.hidden.toString());
        }

        const elem = this.element.nativeElement;
        elem.innerHTML = '';
        this.renderer.appendChild(elem, icon);
    }
}
