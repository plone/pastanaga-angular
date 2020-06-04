import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, PLATFORM_ID, Renderer2, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { SvgLoader } from './svg-loader';
import { Size } from '../common';

@Component({
    selector: 'pa-icon',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class IconComponent {
    @Input() set name(value: string) {
        if (!!value) {
            this._path = this.getIconPathFromName(value);
            this.updateSvg();
        }
    }
    @Input() set path(value: string) {
        this._path = value;
        this.updateSvg();
    }
    @Input() set size(value: Size) {
        if (!!value) {
            this._size = value;
            this.updateSvg();
        }
    }
    @Input() set color(value: string) {
        this._color = value;
        this.updateSvg();
    }
    @Input() set background(value: string) {
        this._background = value;
        this.updateSvg();
    }

    _path = '';
    _size: Size = Size.medium;
    _color = '';
    _background = '';

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private service: SvgIconRegistryService,
        private svgLoader: SvgLoader,
        @Inject(PLATFORM_ID) protected platformId: Object,
    ) {
    }

    private updateSvg() {
        if (!!this._path) {
            if (isPlatformBrowser(this.platformId)) {
                this.service.loadSvg(this._path).subscribe(svg => {
                    this.setSvg(svg.cloneNode(true) as SVGElement);
                });
            } else {
                this.svgLoader.loadSvgFromSsr(this._path, this.renderer).subscribe(svg => {
                    this.setSvg(svg);
                });
            }
        }
    }

    private setSvg(icon: SVGElement) {
        const classes: string[] = [`pa-${this._size}`];
        const styles: string[] = [];

        if (this._color) {
            styles.push(`fill: ${this._color};`);
        }
        if (this._background) {
            styles.push(`background: ${this._background};`);
        }

        this.renderer.setAttribute(icon, 'class', classes.join(' '));
        this.renderer.setAttribute(icon, 'style', styles.join(' '));
        const elem = this.element.nativeElement;
        elem.innerHTML = '';
        this.renderer.appendChild(elem, icon);
    }

    private getIconPathFromName(name: string) {
        return `./assets/icons/${name}.svg`;
    }
}
