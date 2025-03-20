import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  input,
} from '@angular/core';

export const SPRITE_CACHE_VERSION = new InjectionToken<string>(
  'Cache version used when loading SVG sprite',
  {
    providedIn: 'root',
    factory: () => '',
  },
);

const widthRegex = /w-\d+/;
const heightRegex = /h-\d+/;

@Component({
  selector: 'pa-icon',
  imports: [],
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaIconComponent {
  private readonly cacheVersion = inject(SPRITE_CACHE_VERSION);
  private readonly defaultHeight = 'h-6';
  private readonly defaultWidth = 'w-6';

  class = input(`${this.defaultHeight} ${this.defaultWidth}`);
  name = input.required<string>();

  /**
   * Add default width and height if they are not provided
   */
  classCleaned = computed(() => {
    const input = this.class();
    const hasWidth = input.match(widthRegex);
    const hasHeight = input.match(heightRegex);
    return `${input} ${hasWidth ? '' : this.defaultWidth} ${hasHeight ? '' : this.defaultHeight}`;
  });
  spritePath = computed(
    () =>
      `./assets/glyphs-sprite.svg${this.cacheVersion ? '?' + this.cacheVersion : ''}#${this.name()}`,
  );
}
