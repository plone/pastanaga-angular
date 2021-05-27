import {
    ComponentRef,
    ComponentFactoryResolver,
    Directive,
    HostListener,
    Input,
    ViewContainerRef,
    ElementRef,
    Renderer2,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { markForCheck } from '../common';

const SYSTEM = 'system';
const ACTION = 'action';

let nextId = 0;

@Directive({
    selector: '[paTooltip]',
})
export class TooltipDirective {
    @Input('paTooltip') text = '';
    @Input('paTooltipType') type: 'system' | 'action' = ACTION;
    @Input()
    get paTooltipOffset(): number {
        return this.offset;
    }
    set paTooltipOffset(value: number) {
        this.offset = coerceNumberProperty(value);
    }
    protected offset = 0;

    id = '';
    isDisplayed = false;
    rootParent?: HTMLElement;

    private component?: ComponentRef<TooltipComponent>;

    constructor(
        private element: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
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
        if (!!this.text && this.isDisplayed && this.type === SYSTEM) {
            const position = this.getFixedPosition(event);
            this.show(position[0], position[1]);
        }
    }

    startDisplay(event: MouseEvent) {
        if (!!this.text && !this.isDisplayed) {
            const position = this.getFixedPosition(event);
            if (!this.component) {
                this.createTooltip(position[0], position[1], position[2], position[3]);
            } else {
                this.show(position[0], position[1]);
            }
            this.isDisplayed = true;
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
        const factory = this.resolver.resolveComponentFactory(TooltipComponent);
        this.component = this.viewContainerRef.createComponent(factory);
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
        this.isDisplayed = false;
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
            this.rootParent = this.getFixedRootParent(this.element.nativeElement);
        }
        const rootRect = this.rootParent.getBoundingClientRect();
        return [position[0] - rootRect.left, position[1] - rootRect.top, position[2], position[3]];
    }

    getFixedRootParent(element: HTMLElement): HTMLElement {
        if (element.tagName === 'BODY') {
            return element;
        }
        // an element with `position: fixed` will be positioned relatively to the viewport
        // unless one of the ancestor has a property `transform`, `filter` or `perspective`
        const style = getComputedStyle(element);
        if (style.transform !== 'none' || style.perspective !== 'none' || style.filter !== 'none') {
            return element;
        } else {
            const parent = element.parentElement;
            return parent ? this.getFixedRootParent(parent) : element;
        }
    }
}
