import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  numberAttribute,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { getFixedRootParent, markForCheck, trimString } from '../common';
import { BehaviorSubject } from 'rxjs';

const SYSTEM = 'system';
const ACTION = 'action';

let nextId = 0;

@Directive({
  selector: '[paTooltip]',
  standalone: false,
})
export class TooltipDirective {
  @Input({ alias: 'paTooltip', transform: trimString }) text: string | undefined = '';
  @Input({ alias: 'paTooltipType' }) type: 'system' | 'action' = ACTION;
  @Input({ alias: 'paTooltipOffset', transform: numberAttribute }) offset = 0;

  id = '';
  isDisplayed = new BehaviorSubject(false);
  rootParent?: HTMLElement;
  private component?: ComponentRef<TooltipComponent>;

  constructor(
    private element: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('focusin', ['$event'])
  focus(event: MouseEvent | any) {
    // do not show tooltip if focus has been triggered programmatically
    if (event.sourceCapabilities) {
      this.startDisplay(event);
    }
  }

  @HostListener('mouseenter', ['$event'])
  enter(event: MouseEvent) {
    this.startDisplay(event);
  }

  @HostListener('mousemove', ['$event'])
  move(event: MouseEvent) {
    if (!!this.text && this.isDisplayed.value && this.type === SYSTEM) {
      const position = this.getFixedPosition(event);
      this.show(position[0], position[1]);
    }
  }

  startDisplay(event: MouseEvent) {
    if (!!this.text && !this.isDisplayed.value) {
      const position = this.getFixedPosition(event);
      if (!this.component) {
        this.createTooltip(position[0], position[1], position[2], position[3]);
      } else {
        this.show(position[0], position[1]);
      }
      this.isDisplayed.next(true);
    }
  }

  show(x: number, y: number) {
    if (!!this.component) {
      this.component.instance.left = x || 0;
      this.component.instance.top = y || 0;
      this.component.instance.text = this.text;
      this.component.instance.show();
    }
  }

  createTooltip(x: number, y: number, width: number, height: number) {
    this.id = `pa-tooltip-${nextId++}`;
    this.element.nativeElement.setAttribute('aria-describedby', this.id);

    this.component = this.viewContainerRef.createComponent(TooltipComponent);
    this.component.instance.id = this.id;
    this.component.instance.text = this.text;
    this.component.instance.isAction = this.type === ACTION;
    this.component.instance.left = x || 0;
    this.component.instance.top = y || 0;
    this.component.instance.offset = this.offset || 0;
    this.component.instance.width = width;
    this.component.instance.height = height;

    this.renderer.appendChild(this.viewContainerRef.element.nativeElement, this.component.location.nativeElement);
    markForCheck(this.component.instance.cdr);
  }

  @HostListener('focusout')
  @HostListener('mouseleave')
  @HostListener('mousedown')
  hide(): void {
    if (!!this.component) {
      this.component.instance.hide();
    }
    this.isDisplayed.next(false);
  }

  getFixedPosition(event: MouseEvent): [number, number, number, number] {
    const rect = this.element.nativeElement.getBoundingClientRect();
    let position: [number, number, number, number];
    if (this.type === ACTION) {
      position = [rect.left, rect.top, rect.width, rect.height];
    } else if (event.type === 'focusin') {
      position = [rect.right, rect.bottom, rect.width, rect.height];
    } else {
      position = [event.clientX, event.clientY, rect.width, rect.height];
    }
    if (!this.rootParent) {
      this.rootParent = getFixedRootParent(this.element.nativeElement);
    }
    const rootRect = this.rootParent.getBoundingClientRect();
    return [position[0] - rootRect.left, position[1] - rootRect.top, position[2], position[3]];
  }
}
