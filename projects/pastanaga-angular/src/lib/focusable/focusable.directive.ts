import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[paFocusable]',
  standalone: false,
})
export class FocusableDirective implements AfterViewInit, OnDestroy {
  @Input() set paFocusDisabled(disabled: boolean) {
    this._canFocus = !disabled;
    this.setTabindex();
  }
  private _canFocus = true;
  private _monitorSubscription?: Subscription;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _focusMonitor: FocusMonitor,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    this.renderer.addClass(this._elementRef.nativeElement, 'pa-no-browser-accessibility-styling');

    this.setTabindex();

    this._monitorSubscription = this._focusMonitor
      .monitor(this._elementRef, this._elementRef.nativeElement.hasAttribute('cdkMonitorSubtreeFocus'))
      .subscribe((origin) => {
        if (origin === 'keyboard') {
          this.renderer.addClass(this._elementRef.nativeElement, 'pa-keyboard-focus');
        } else {
          this.renderer.removeClass(this._elementRef.nativeElement, 'pa-keyboard-focus');
        }
      });
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);

    if (this._monitorSubscription) {
      this._monitorSubscription.unsubscribe();
    }
  }

  private setTabindex() {
    this._elementRef.nativeElement.setAttribute('tabindex', this._canFocus ? '0' : '-1');
  }
}
