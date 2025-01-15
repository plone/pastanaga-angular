import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';

@Component({
  selector: 'pa-modal-advanced',
  templateUrl: './modal-advanced.component.html',
  styleUrls: ['./modal-advanced.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class ModalAdvancedComponent extends BaseModalComponent implements AfterViewInit {
  @Input({ transform: booleanAttribute }) fitContent = false;
  @Input({ transform: booleanAttribute }) fitContentHeight = false;

  @ViewChild('footer', { read: ElementRef }) footer?: ElementRef;

  hasFooter = false;
  footerWithOneButton = false;

  override ngAfterViewInit() {
    super.ngAfterViewInit();

    this.hasFooter = !!this.footer && this.footer.nativeElement.children.length > 0;
    this.footerWithOneButton = this.hasFooter && this.footer?.nativeElement.children[0].children.length === 1;

    this.setFocus();
    this.refresh();
  }
}
