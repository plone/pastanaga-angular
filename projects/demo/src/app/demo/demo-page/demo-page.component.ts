import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'pa-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoPageComponent implements AfterContentInit {
  @ViewChild('examples', { read: ElementRef, static: true }) examples?: ElementRef;
  @ViewChild('configuration', { read: ElementRef, static: true }) configuration?: ElementRef;
  @ViewChild('usage', { read: ElementRef, static: true }) usage?: ElementRef;
  @ViewChild('code', { read: ElementRef, static: true }) code?: ElementRef;

  _hasExamples = false;
  _hasConfiguration = false;
  _hasUsage = false;
  _hasCode = false;

  ngAfterContentInit(): void {
    this._hasExamples = !!this.examples && this.examples.nativeElement.children.length > 0;
    this._hasConfiguration = !!this.configuration && this.configuration.nativeElement.children.length > 0;
    this._hasUsage = !!this.usage && this.usage.nativeElement.children.length > 0;
    this._hasCode = !!this.code && this.code.nativeElement.children.length > 0;
  }
}
