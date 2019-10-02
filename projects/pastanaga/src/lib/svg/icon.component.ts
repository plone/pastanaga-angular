import { Component, ElementRef, Input, OnChanges, Renderer2, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { isPlatformBrowser } from '@angular/common';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { SvgLoader } from './svg-loader';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-icon',
    template: `<ng-content></ng-content>`,
    styles: [`.pa-small {
        width: 18px;
        height: 18px;
    }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class IconComponent {
    @Input() set name(value: string) {
        this.iconPath = `./assets/icons/${value}.svg`;
        this.updateSvg();
    }
    @Input()
    get hidden(): boolean { return this._hidden; }
    set hidden(value: boolean) {
        this._hidden = coerceBooleanProperty(value);
        this.updateSvg();
    }
    _hidden = false;

    @Input()
    get small(): boolean { return this._small; }
    set small(value: boolean) {
        this._small = coerceBooleanProperty(value);
        this.updateSvg();
    }
    _small = false;

    @Input()
    get color(): string { return this._color; }
    set color(value: string) {
        this._color = value;
        this.updateSvg();
    }
    _color = '';

    iconPath = '';

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private service: SvgIconRegistryService,
        private svgLoader: SvgLoader,
        @Inject(PLATFORM_ID) protected platformId: Object
    ) {
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
        if (typeof this._hidden !== 'undefined') {
            this.renderer.setAttribute(icon, 'aria-hidden', this._hidden.toString());
        }
        if (this._small) {
            this.renderer.setAttribute(icon, 'class', 'pa-small');
        }
        if (this.color) {
            this.renderer.setAttribute(icon, 'style', `fill: ${this.color};`);
        }

        const elem = this.element.nativeElement;
        elem.innerHTML = '';
        this.renderer.appendChild(elem, icon);
    }
}
