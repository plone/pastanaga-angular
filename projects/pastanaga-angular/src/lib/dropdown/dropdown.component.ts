import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { PopupComponent, PopupService } from '../popup';
import { getScrollableParent, hasPositionFixedParent } from '../common';

@Component({
  selector: 'pa-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  private _hasFixedRootParent?: boolean;
  private _fixedRootParentChecked = false;
  private _scrollableParent?: HTMLElement;

  constructor(
    protected override popupService: PopupService,
    protected override renderer: Renderer2,
    protected override element: ElementRef,
    protected override cdr: ChangeDetectorRef,
  ) {
    super(popupService, renderer, element, cdr);
    this.popupType = 'menu';
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
          this._scrollableParent.addEventListener('scroll', this.onScroll.bind(this));
        }, 0);
      }
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this._scrollableParent) {
      this._scrollableParent.removeEventListener('scroll', this.onScroll.bind(this));
    }
  }

  private onScroll() {
    if (this.isDisplayed) {
      this.close();
    }
  }
}
