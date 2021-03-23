import { ComponentFactoryResolver, ComponentRef, Directive, HostListener, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { coerceNumberProperty } from '@angular/cdk/coercion';

const SYSTEM = 'system';
const ACTION = 'action';

let nextId = 0;

@Directive({
    selector: '[paTooltip]'
})
export class TooltipDirective {
    @Input('paTooltip') text: string | undefined = '';
    @Input('paTooltipType') type: 'system' | 'action' = ACTION;
    @Input()
    get paTooltipOffset(): number { return this.offset; }
    set paTooltipOffset(value: number) { this.offset = coerceNumberProperty(value); }
    protected offset = 0;
    protected nativeElement;

    id = '';
    isDisplayed = false;
    rootParent?: HTMLElement;

    protected component?: ComponentRef<TooltipComponent>;

    constructor(
        protected viewContainerRef: ViewContainerRef,
        protected resolver: ComponentFactoryResolver,
        protected renderer: Renderer2,
    ) {
        this.nativeElement = this.viewContainerRef.element.nativeElement;
    }

    @HostListener('focusin', ['$event'])
    focus(event: MouseEvent) {
        // do not show tooltip if focus has been triggered programmatically
        if (event['sourceCapabilities']) {
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
                this.createTooltip(position[0], position[1]);
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

    createTooltip(x: number, y: number) {
        this.id = `pa-tooltip-${nextId++}`;
        this.nativeElement.setAttribute('aria-describedby', this.id);
        const factory = this.resolver.resolveComponentFactory(
            TooltipComponent,
        );
        this.component = this.viewContainerRef.createComponent(factory);
        this.component.instance.id = this.id;
        this.component.instance.text = this.text;
        this.component.instance.isAction = this.type === ACTION;
        this.component.instance.left = x || 0;
        this.component.instance.top = y || 0;
        this.component.instance.offset = this.offset || 0;
        this.component.instance.width = this.nativeElement.clientWidth;
        this.component.instance.height = this.nativeElement.clientHeight;

        this.renderer.appendChild(
            this.nativeElement,
            this.component.location.nativeElement,
        );
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

    getFixedPosition(event: MouseEvent): [number, number] {
        let position: [number, number];
        if (this.type === ACTION) {
            const rect = this.nativeElement.getBoundingClientRect();
            position = [rect.left, rect.top];
        } else if (event.type === 'focusin') {
            const rect = this.nativeElement.getBoundingClientRect();
            position = [rect.right, rect.bottom];
        } else {
            position = [event.pageX, event.pageY];
        }
        if (!this.rootParent) {
            this.rootParent = this.getFixedRootParent(this.nativeElement);
        }
        const rootRect = this.rootParent.getBoundingClientRect();
        return [position[0] - rootRect.left, position[1] - rootRect.top];
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
