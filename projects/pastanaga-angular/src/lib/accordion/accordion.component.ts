import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

@Component({
  selector: 'pa-accordion',
  standalone: true,
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements AfterContentInit, OnDestroy {
  private unsubscribeAll = new Subject<void>();

  @Input({ transform: booleanAttribute }) allowMultipleExpanded = false;
  @Input({ transform: booleanAttribute }) noBorders = false;
  @Input({ transform: booleanAttribute }) small = false;

  @Output() toggleAccordion = new EventEmitter<void>();

  @ContentChildren(AccordionItemComponent) items?: QueryList<AccordionItemComponent>;

  ngAfterContentInit() {
    this.accordionItemsUpdated();
    this.items?.changes.subscribe(() => this.accordionItemsUpdated());
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private accordionItemsUpdated() {
    this.unsubscribeAll.next();
    this.items?.forEach((item) => {
      item.noBorders = this.noBorders;
      item.small = this.small;
      item.expandedChange.pipe(takeUntil(this.unsubscribeAll)).subscribe((expanded) => {
        item.expanded = expanded;
        this.toggleAccordion.emit();
        if (!this.allowMultipleExpanded && expanded) {
          this.items?.forEach((otherItem) => {
            if (otherItem.id !== item.id) {
              otherItem.expanded = false;
            }
          });
        }
      });
    });
  }
}
