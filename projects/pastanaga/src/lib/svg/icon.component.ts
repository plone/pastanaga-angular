import { Component, ElementRef, Input, Renderer2, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { isPlatformBrowser } from '@angular/common';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { SvgLoader } from './svg-loader';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Icon } from '../common/utils';

@Component({
    selector: 'pa-icon',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class IconComponent {
    @Input() set icon(value: Icon) {
        if (!!value) {
            this.iconPath = value.path;
            this.iconBackground = value.backgroundColor;
            this._medium = true;
            this._border = true;
            this.updateSvg();
        }
    }
    @Input() set path(value: string) {
        this.iconPath = value;
        this.updateSvg();
    }
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

    @Input()
    get small(): boolean { return this._small; }
    set small(value: boolean) {
        this._small = coerceBooleanProperty(value);
        this.updateSvg();
    }

    @Input()
    get color(): string { return this._color; }
    set color(value: string) {
        this._color = value;
        this.updateSvg();
    }

    _border = false;
    _hidden = false;
    _small = false;
    _medium = false;
    _color = '';
    iconPath = '';
    iconBackground = '';

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private service: SvgIconRegistryService,
        private svgLoader: SvgLoader,
        @Inject(PLATFORM_ID) protected platformId: Object
    ) {
    }

    private updateSvg() {
        if (!!this.iconPath) {
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
    }

    private setSvg(svg: SVGElement) {
        const icon = <SVGElement>svg.cloneNode(true);
        if (typeof this._hidden !== 'undefined') {
            this.renderer.setAttribute(icon, 'aria-hidden', this._hidden.toString());
        }
        const classes: string[] = [];
        const styles: string[] = [];

        if (this._small) {
            classes.push('pa-small');
        } else if (this._medium) {
            classes.push('pa-medium');
        }
        if (this._border) {
            classes.push('pa-border');
        }
        if (this.color) {
            styles.push(`fill: ${this.color};`);
        }
        if (this.iconBackground) {
            styles.push(`background: ${this.iconBackground};`);
        }
        this.renderer.setAttribute(icon, 'class', classes.join(' '));
        this.renderer.setAttribute(icon, 'style', styles.join(' '));
        const elem = this.element.nativeElement;
        elem.innerHTML = '';
        this.renderer.appendChild(elem, icon);
    }
}
