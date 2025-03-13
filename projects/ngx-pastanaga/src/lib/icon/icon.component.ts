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

@Component({
  selector: 'pa-icon',
  imports: [],
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaIconComponent {
  private readonly cacheVersion = inject(SPRITE_CACHE_VERSION);

  class = input('w-6 h-6');
  name = input.required<string>();

  spritePath = computed(
    () =>
      `./assets/glyphs-sprite.svg${this.cacheVersion ? '?' + this.cacheVersion : ''}#${this.name()}`,
  );
}
