import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  numberAttribute,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PaFormControlDirective } from '../form-field';

@Component({
  selector: 'pa-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SliderComponent extends PaFormControlDirective implements AfterViewInit, OnInit {
  @Input({ transform: numberAttribute }) min = 0;
  @Input({ transform: numberAttribute }) max = 100;
  @Input({ transform: numberAttribute }) step = 1;

  get outputMinWidth() {
    return `${(this.max.toString().length + 1.5) * 8}px`;
  }

  @ViewChild('label', { read: ElementRef }) label?: ElementRef;
  hasLabel = false;

  ngAfterViewInit(): void {
    this.hasLabel = !!this.label && this.label.nativeElement.textContent.length > 0;
    this.cdr.markForCheck();
  }

  override ngOnInit() {
    super.ngOnInit();
    // Set value as the minimum one by default
    if (!this.control.value) {
      this.control.patchValue(this.min);
    }
  }
}
