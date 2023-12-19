import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Inject,
  InjectionToken,
  Input,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { SvgLoader } from './svg-loader';
import { markForCheck, Size } from '../common';
import { IconModel } from './icon.model';

export const SPRITE_CACHE_VERSION = new InjectionToken<string>('Cache version used when loading SVG sprite', {
  providedIn: 'root',
  factory: () => '',
});

@Component({
  selector: 'pa-icon',
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent {
  private readonly cacheVersion = inject(SPRITE_CACHE_VERSION);

  @Input() set icon(value: IconModel | null | undefined) {
    if (!value) {
      return;
    }
    if (value.name) {
      this.name = value.name;
    } else if (value.path) {
      this.path = value.path;
    }
    this.size = value.size;
    this.color = value.color;
    this.background = value.background;
  }

  @Input() set name(value: string) {
    if (!!value) {
      this._name = value;
      this._spritePath = `assets/glyphs-sprite.svg${this.cacheVersion ? '?' + this.cacheVersion : ''}#${this._name}`;
      this.updateStyle();
    }
  }
  @Input() set path(value: string) {
    this._path = value;
    this._accessibilityName = value.substring(value.lastIndexOf('/') + 1, value.indexOf('.svg'));
    this.updateSvg();
  }
  @Input() set size(value: Size | undefined) {
    if (!!value) {
      this._size = value;
      this.updateSvg();
    }
  }
  @Input() set color(value: string | undefined) {
    if (!!value) {
      this._color = value;
      this.updateSvg();
    }
  }
  @Input() set background(value: string | undefined) {
    if (!!value) {
      this._background = value;
      this.updateSvg();
    }
  }

  _name = '';
  _accessibilityName = '';
  _spritePath = '';
  _path = '';
  _size: Size = 'medium';
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
    private cdr: ChangeDetectorRef,
  ) {}

  private updateSvg() {
    if (!!this._path) {
      if (isPlatformBrowser(this.platformId)) {
        this.service.loadSvg(this._path)?.subscribe((svg) => {
          if (svg) {
            this.setSvg(svg.cloneNode(true) as SVGElement);
          }
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
    const accessibilityTitle = this.renderer.createElement('title');
    this.renderer.appendChild(accessibilityTitle, this.renderer.createText(this._accessibilityName));
    this.renderer.insertBefore(icon, accessibilityTitle, icon.firstChild);
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
