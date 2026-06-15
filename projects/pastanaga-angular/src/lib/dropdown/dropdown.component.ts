import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { PopupComponent, PopupService } from '../popup';
import { getScrollableParent, hasPositionFixedParent } from '../common';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pa-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DropdownComponent extends PopupComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input()
  set role(value: 'listbox' | 'menu') {
    this._role = value || 'menu';
    this.popupType = value !== 'menu' ? 'dropdown' : 'menu';
  }
  get role(): 'listbox' | 'menu' {
    return this._role;
  }

  private _role: 'listbox' | 'menu' = 'menu';

  @Input() ariaLabel?: string;

  private _hasFixedRootParent?: boolean;
  private _fixedRootParentChecked = false;
  private _scrollableParent?: HTMLElement;

  private readonly scrollEventListener;

  constructor(
    protected override popupService: PopupService,
    protected override renderer: Renderer2,
    protected override element: ElementRef,
    protected override cdr: ChangeDetectorRef,
  ) {
    super(popupService, renderer, element, cdr);
    this.popupType = 'menu';
    this.scrollEventListener = this.onScroll.bind(this);
  }

  ngAfterViewInit() {
    if (this._hasFixedRootParent === undefined && !this._fixedRootParentChecked) {
      const parentElement: HTMLElement | null = this.element.nativeElement.parentElement;
      this._hasFixedRootParent = !!parentElement && hasPositionFixedParent(parentElement);
      this._fixedRootParentChecked = true;

      if (parentElement && this._hasFixedRootParent) {
        // Make sure we wait for the full template to be enabled before getting the scrollable parent
        setTimeout(() => {
          this._scrollableParent = getScrollableParent(parentElement);
        }, 0);
      }
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.onOpen.pipe(takeUntil(this._terminator)).subscribe(() => {
      if (this._scrollableParent) {
        this._scrollableParent.addEventListener('scroll', this.scrollEventListener);
      }
      if (this._role === 'menu') {
        setTimeout(() => {
          const firstOption = this.element.nativeElement.querySelector(
            'li.pa-option:not(.pa-option-disabled):not(.pa-option-readonly)',
          ) as HTMLElement | null;
          firstOption?.focus();
        }, 0);
      }
    });
    this.onClose.pipe(takeUntil(this._terminator)).subscribe(() => {
      if (this._scrollableParent) {
        this._scrollableParent.removeEventListener('scroll', this.scrollEventListener);
      }
    });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  @HostListener('keydown', ['$event'])
  onDropdownKeydown(event: KeyboardEvent): void {
    if (!this.isDisplayed) return;

    const key = event.key;
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) return;

    event.preventDefault();

    const options = Array.from(
      this.element.nativeElement.querySelectorAll('li.pa-option:not(.pa-option-disabled):not(.pa-option-readonly)'),
    ) as HTMLElement[];

    if (options.length === 0) return;

    const focused = this.element.nativeElement.querySelector(':focus') as HTMLElement | null;
    const currentIndex = focused ? options.indexOf(focused) : -1;

    let nextIndex: number;
    if (key === 'ArrowDown') {
      nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
    } else if (key === 'ArrowUp') {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
    } else if (key === 'Home') {
      nextIndex = 0;
    } else {
      nextIndex = options.length - 1;
    }

    options[nextIndex]?.focus();
  }

  private onScroll() {
    if (this.isDisplayed) {
      this.close();
    }
  }
}
