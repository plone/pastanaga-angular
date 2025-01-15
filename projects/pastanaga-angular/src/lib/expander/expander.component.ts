import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ExpanderBodyDirective } from './expander.directive';
import { markForCheck } from '../common';
import { Subject } from 'rxjs';

export const transitionDuration = 160;

@Component({
  selector: 'pa-expander',
  templateUrl: './expander.component.html',
  styleUrls: ['./expander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ExpanderComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ transform: booleanAttribute }) buttonOnlyToggle = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) emitOnly = false;
  @Input({ transform: booleanAttribute }) expanded = true;
  @Input({ transform: booleanAttribute }) card = false;
  @Input() set contentLoaded(value: any) {
    this.updateContentHeight();
  }

  @Output() toggleExpander: EventEmitter<void> = new EventEmitter();

  @ContentChild(ExpanderBodyDirective, { read: ElementRef }) expanderContent?: ElementRef;
  @ViewChild('sideBlock', { read: ElementRef }) sideBlock?: ElementRef;

  terminator = new Subject<void>();
  contentHidden = false;
  hasSideBlock = false;

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.hasSideBlock = !!this.sideBlock && this.sideBlock.nativeElement.children.length > 0;
    this.updateContentHeight();
    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expanded']) {
      if (changes['expanded'].currentValue) {
        this.expand();
      } else {
        this.collapse();
      }
    }
    if (changes['card']?.currentValue && !changes['expanded']?.currentValue) {
      this.expanded = false;
      this.contentHidden = true;
    }
  }

  ngOnDestroy() {
    this.terminator.next();
    this.terminator.complete();
  }

  onTitleClick() {
    if (!this.buttonOnlyToggle) {
      this.toggleExpand();
    }
  }

  toggleExpand() {
    if (!this.emitOnly) {
      if (this.expanded) {
        this.collapse();
      } else {
        this.expand();
      }
    }
    this.toggleExpander.emit();
  }

  private collapse() {
    // when expanded, we collapse directly and hide content after the transition delay
    this.expanded = false;
    setTimeout(() => {
      this.contentHidden = true;
      markForCheck(this.cdr);
    }, transitionDuration);
  }

  private expand() {
    // when collapsed, we remove "display: none" before expanding the panel so the animation is visible
    this.contentHidden = false;
    this.updateContentHeight();
    setTimeout(() => {
      this.expanded = true;
      markForCheck(this.cdr);
    }, 0);
  }

  private updateContentHeight() {
    setTimeout(() => {
      this.elementRef.nativeElement.style.setProperty(
        '--contentHeight',
        `${this.expanderContent?.nativeElement.getBoundingClientRect().height}px`,
      );
    });
  }
}
