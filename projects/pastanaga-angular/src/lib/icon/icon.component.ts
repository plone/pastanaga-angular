import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    PLATFORM_ID,
    Renderer2,
    ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { SvgLoader } from './svg-loader';
import { markForCheck, Size } from '../common';

@Component({
    selector: 'pa-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class IconComponent {
    @Input() set name(value: string) {
        if (!!value) {
            this._name = value;
            this._spritePath = `assets/glyphs-sprite.svg#${this._name}`;
            this.updateStyle();
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

    _name = '';
    _spritePath = '';
    _path = '';
    _size: Size = Size.medium;
    _color = '';
    _background = '';
    _styles = '';
    _classes = '';

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private service: SvgIconRegistryService,
        private svgLoader: SvgLoader,
        @Inject(PLATFORM_ID) protected platformId: Object,
        private cdr: ChangeDetectorRef
    ) {}

    private updateSvg() {
        if (!!this._path) {
            if (isPlatformBrowser(this.platformId)) {
                this.service.loadSvg(this._path).subscribe((svg) => {
                    this.setSvg(svg.cloneNode(true) as SVGElement);
                });
            } else {
                this.svgLoader.loadSvgFromSsr(this._path, this.renderer).subscribe((svg) => {
                    this.setSvg(svg);
                });
            }
        } else {
            this.updateStyle();
        }
    }

    private setSvg(icon: SVGElement) {
        this.updateStyle();
        this.renderer.setAttribute(icon, 'class', this._classes);
        this.renderer.setAttribute(icon, 'style', this._styles);
        const elem = this.element.nativeElement;
        elem.innerHTML = '';
        this.renderer.appendChild(elem, icon);
    }

    private updateStyle() {
        const classes: string[] = [`pa-${this._size}`];
        const styles: string[] = [];

        if (this._color) {
            styles.push(`fill: ${this._color};`);
        }

        if (this._background) {
            styles.push(`background: ${this._background};`);
        }
        this._classes = classes.join(' ');
        this._styles = styles.join(' ');
        markForCheck(this.cdr);
    }
}
