import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { detectChanges, markForCheck, TRANSITION_DURATION } from '../common';
import { SideNavItemComponent } from './side-nav-item/side-nav-item.component';
import { ViewportMode } from '../breakpoint-observer';

@Component({
  selector: 'pa-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements AfterViewInit {
  @Input()
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: any) {
    const visible = coerceBooleanProperty(value);
    if (this.mode !== 'desktop') {
      this.triggerAnimation(visible);
    } else {
      this._visible = visible;
    }
  }

  @Input()
  set mode(value: ViewportMode | null) {
    if (value) {
      this._mode = value;
    }
  }
  get mode(): ViewportMode {
    return this._mode;
  }

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('header', { read: ElementRef }) header?: ElementRef;
  @ViewChild('footer', { read: ElementRef }) footer?: ElementRef;
  @ViewChild('navBar', { read: ElementRef }) navBar?: ElementRef;
  @ViewChild('tabletOverlay', { read: ElementRef }) tabletOverlay?: ElementRef;
  @ContentChildren(SideNavItemComponent, { descendants: true }) contentChild!: QueryList<SideNavItemComponent>;

  private _visible = true;
  private _mode: ViewportMode = 'desktop';
  hasHeader = false;
  hasFooterContent = false;

  readonly closeNavBarDuration = TRANSITION_DURATION.slow;
  terminator: Subject<void> = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    this.updateFlags();
  }

  private updateFlags() {
    this.hasHeader = !!this.header && this.header.nativeElement.children.length > 0;
    this.hasFooterContent = !!this.footer && this.footer.nativeElement.children.length > 0;
    detectChanges(this.cdr);
  }

  triggerAnimation(isOpen: boolean) {
    if (isOpen) {
      this._visible = isOpen;
      markForCheck(this.cdr);
      // wait for ViewChildren rendering
      setTimeout(() => {
        this.addClass(this.navBar, 'animated');
        this.addClass(this.tabletOverlay, 'opened');
        this.updateFlags();
      });
    } else {
      this.addClass(this.tabletOverlay, 'closed');
      this.addClass(this.navBar, 'closed');
      // wait for animation ends
      setTimeout(() => {
        this._visible = isOpen;
        markForCheck(this.cdr);
      }, this.closeNavBarDuration);
    }
  }

  closeSideNav() {
    this.close.emit();
  }

  addClass(element: ElementRef | undefined, cssClass: string) {
    if (!!element?.nativeElement) {
      this.renderer.addClass(element.nativeElement, cssClass);
    }
  }
}
