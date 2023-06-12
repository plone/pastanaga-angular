import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'pa-modal-advanced',
  templateUrl: './modal-advanced.component.html',
  styleUrls: ['./modal-advanced.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModalAdvancedComponent extends BaseModalComponent implements AfterViewInit {
  @Input()
  set fitContent(value: any) {
    this._fitContent = coerceBooleanProperty(value);
  }
  get fitContent() {
    return this._fitContent;
  }
  private _fitContent = false;

  @Input()
  set fitContentHeight(value: any) {
    this._fitContentHeight = coerceBooleanProperty(value);
  }
  get fitContentHeight() {
    return this._fitContentHeight;
  }
  private _fitContentHeight = false;

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
