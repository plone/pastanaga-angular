import {
  AfterViewInit,
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
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pa-accordion',
  standalone: true,
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements AfterViewInit, OnDestroy {
  private unsubscribeAll = new Subject<void>();

  @Input({ transform: booleanAttribute }) allowMultipleExpanded = false;

  @Output() toggleAccordion = new EventEmitter<void>();

  @ContentChildren(AccordionItemComponent) items?: QueryList<AccordionItemComponent>;

  ngAfterViewInit() {
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
