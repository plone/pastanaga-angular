import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'pa-button',
  imports: [],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex' },
})
export class PaButtonComponent implements AfterContentInit {
  @ViewChild('textContainer') textContainer?: ElementRef;

  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false, { transform: booleanAttribute });
  color = input<'accent' | 'neutral' | 'red' | 'orange' | 'green'>('accent');
  variant = input<'filled' | 'outlined' | 'text'>('filled');
  size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  ariaLabel = input('');

  label = signal('');
  roundedClasses = signal('rounded-sm');
  iconOnly = signal(false);
  svgElement = signal<Element | null>(null);

  computedAriaLabel = computed(() => this.label() || this.ariaLabel());

  sizeClasses = computed(() => {
    const svgElement = this.svgElement();
    switch (this.size()) {
      case 'xs':
        // reduce icon size if needed
        if (svgElement?.classList.contains('h-6')) {
          svgElement.classList.remove('h-6');
          svgElement.classList.remove('w-6');
          svgElement.classList.add('h-4');
          svgElement.classList.add('w-4');
        }
        return this.iconOnly() ? 'p-1' : 'px-2 py-1 text-xs';
      case 'sm':
        return this.iconOnly() ? 'p-1' : 'px-3 py-1';
      case 'md':
        return this.iconOnly() ? 'p-2' : 'px-4 py-2';
      case 'lg':
        // increase icon size if needed
        if (svgElement?.classList.contains('h-6')) {
          svgElement.classList.remove('h-6');
          svgElement.classList.remove('w-6');
          svgElement.classList.add('h-7');
          svgElement.classList.add('w-7');
        }
        return this.iconOnly()
          ? 'p-2'
          : `${svgElement ? 'px-4' : 'px-6'} py-2 text-xl`;
    }
  });

  colorClasses = computed(() => {
    const color = this.color();
    const variant = this.variant();
    const filledDisabled = 'disabled:bg-gray-200 disabled:text-gray-400';
    const outlinedDisabled =
      'disabled:bg-transparent disabled:border-gray-400 disabled:text-gray-400';
    const textDisabled = 'disabled:bg-transparent disabled:text-gray-400';

    switch (color) {
      case 'accent':
        switch (variant) {
          case 'filled':
            return `bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white ${filledDisabled}`;
          case 'outlined':
            return `border text-accent-500 hover:bg-accent-400 hover:border-accent-400 active:bg-accent-600 active:border-accent-600 hover:text-white ${outlinedDisabled}`;
          case 'text':
            return `text-accent-500  hover:bg-accent-400 active:bg-accent-600 hover:text-white ${textDisabled}`;
        }
        break;
      case 'neutral':
        switch (variant) {
          case 'filled':
            return `bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white ${filledDisabled}`;
          case 'outlined':
            return `border text-gray-600 dark:text-white hover:bg-gray-500 hover:border-gray-500 active:bg-gray-700 active:border-gray-800 hover:text-white ${outlinedDisabled}`;
          case 'text':
            return `text-gray-600 dark:text-white hover:bg-gray-500 active:bg-gray-700 hover:text-white ${textDisabled}`;
        }
        break;
      case 'red':
        switch (variant) {
          case 'filled':
            return `bg-red-500 hover:bg-red-600 active:bg-red-700 text-white ${filledDisabled}`;
          case 'outlined':
            return `border text-red-500 hover:bg-red-400 hover:border-red-400 active:bg-red-600 active:border-red-600 hover:text-white ${outlinedDisabled}`;
          case 'text':
            return `text-red-500  hover:bg-red-400 active:bg-red-600 hover:text-white ${textDisabled}`;
        }
        break;
      case 'orange':
        switch (variant) {
          case 'filled':
            return `bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white ${filledDisabled}`;
          case 'outlined':
            return `border text-orange-500 hover:bg-orange-400 hover:border-orange-400 active:bg-orange-600 active:border-orange-600 hover:text-white ${outlinedDisabled}`;
          case 'text':
            return `text-orange-500  hover:bg-orange-400 active:bg-orange-600 hover:text-white ${textDisabled}`;
        }
        break;
      case 'green':
        switch (variant) {
          case 'filled':
            return `bg-green-500 hover:bg-green-600 active:bg-green-700 text-white ${filledDisabled}`;
          case 'outlined':
            return `border text-green-500 hover:bg-green-400 hover:border-green-400 active:bg-green-600 active:border-green-600 hover:text-white ${outlinedDisabled}`;
          case 'text':
            return `text-green-500  hover:bg-green-400 active:bg-green-600 hover:text-white ${textDisabled}`;
        }
        break;
    }
  });

  ngAfterContentInit(): void {
    setTimeout(() => {
      if (this.textContainer) {
        const label = this.textContainer.nativeElement.textContent.trim();
        const iconElements =
          this.textContainer.nativeElement.getElementsByTagName('pa-icon');
        const hasIcon = iconElements.length === 1;

        if (label) {
          this.label.set(label);
        }
        if (hasIcon) {
          this.svgElement.set(
            iconElements.item(0).getElementsByTagName('svg').item(0),
          );
        }

        if (!label && hasIcon) {
          this.roundedClasses.set('rounded-full');
          this.iconOnly.set(true);
        }
      }
    }, 0);
  }
}
