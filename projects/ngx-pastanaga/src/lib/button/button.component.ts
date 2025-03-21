import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'pa-button',
  imports: [],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false, { transform: booleanAttribute });
  color = input<'accent' | 'neutral' | 'red' | 'orange' | 'green'>('accent');
  variant = input<'filled' | 'outlined' | 'text'>('filled');
  size = input<'xs' | 'sm' | 'md' | 'lg'>('md');

  sizeClasses = computed(() => {
    switch (this.size()) {
      case 'xs':
        return 'px-2 py-0.5';
      case 'sm':
        return 'px-3 py-1';
      case 'md':
        return 'px-4 py-2';
      case 'lg':
        return 'px-8 py-3';
    }
  });

  colorClasses = computed(() => {
    const color = this.color();
    const variant = this.variant();
    const border = variant === 'outlined' ? 'border' : '';
    const filledDisabled = 'disabled:bg-gray-200';
    const textDisabled = 'disabled:text-gray-400';

    switch (color) {
      case 'accent':
        switch (variant) {
          case 'filled':
            return `bg-accent-500 hover:bg-accent-600 active:bg-accent-800 text-white ${filledDisabled} ${textDisabled}`;
          case 'outlined':
          case 'text':
            return `${border} text-accent-500 hover:text-accent-800 active:text-accent-950 dark:not-disabled:hover:text-accent-400 dark:not-disabled:active:text-accent-300 ${textDisabled}`;
        }
        break;
      case 'neutral':
        switch (variant) {
          case 'filled':
            return `bg-gray-950 hover:bg-gray-700 active:bg-gray-600 text-white ${filledDisabled} dark:bg-gray-800 ${textDisabled}`;
          case 'outlined':
          case 'text':
            return `${border} text-gray-950 hover:text-gray-600 active:text-gray-500 dark:text-white dark:hover:not-disabled:text-gray-200 dark:not-disabled:active:text-gray-400 ${textDisabled}`;
        }
        break;
      case 'red':
        switch (variant) {
          case 'filled':
            return `bg-red-500 hover:bg-red-600 active:bg-red-800 text-white ${filledDisabled} ${textDisabled}`;
          case 'outlined':
          case 'text':
            return `${border} text-red-500 hover:text-red-800 active:text-red-950 dark:hover:not-disabled:text-red-400 dark:not-disabled:active:text-red-300 ${textDisabled}`;
        }
        break;
      case 'orange':
        switch (variant) {
          case 'filled':
            return `bg-orange-500 hover:bg-orange-600 active:bg-orange-800 text-white ${filledDisabled} ${textDisabled}`;
          case 'outlined':
          case 'text':
            return `${border} text-orange-500 hover:text-orange-800 active:text-orange-950 dark:hover:not-disabled:text-orange-400 dark:not-disabled:active:text-orange-300  ${textDisabled}`;
        }
        break;
      case 'green':
        switch (variant) {
          case 'filled':
            return `bg-green-500 hover:bg-green-600 active:bg-green-800 text-white ${filledDisabled} ${textDisabled}`;
          case 'outlined':
          case 'text':
            return `${border} text-green-500 hover:text-green-800 active:text-green-950 dark:hover:not-disabled:text-green-400 dark:not-disabled:active:text-green-300 ${textDisabled}`;
        }
        break;
    }
  });
}
