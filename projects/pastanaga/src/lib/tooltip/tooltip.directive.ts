import {
    ComponentRef,
    ComponentFactoryResolver,
    ComponentFactory,
    Directive,
    HostListener,
    Input,
    ViewContainerRef,
    ElementRef,
    Renderer2,
    ApplicationRef,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

const SYSTEM = 'system';
const ACTION = 'action';

let nextId = 0;

@Directive({
    selector: '[paTooltip]'
})
export class TooltipDirective {
    @Input('paTooltip') text: string;
    @Input('paTooltipType') type = SYSTEM;

    id: string;
    isDisplayed = false;
    rootParent: HTMLElement;

    private component: ComponentRef<TooltipComponent>;

    constructor(
        private element: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private renderer: Renderer2,
    ) {}

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
        if (this.text && this.isDisplayed && this.type === SYSTEM) {
            const position = this.getFixedPosition(event);
            this.show(position[0], position[1]);
        }
    }

    startDisplay(event: MouseEvent) {
        if (this.text && !this.isDisplayed) {
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
        this.component.instance.left = x || 0;
        this.component.instance.top = y || 0;
        this.component.instance.text = this.text;
        this.component.instance.show();
    }

    createTooltip(x: number, y: number) {
        this.id = `pa-tooltip-${nextId++}`;
        this.element.nativeElement.setAttribute('aria-describedby', this.id);
        const factory = this.resolver.resolveComponentFactory(
            TooltipComponent,
        );
        this.component = this.viewContainerRef.createComponent(factory);
        this.component.instance.id = this.id;
        this.component.instance.text = this.text;
        this.component.instance.isAction = this.type === ACTION;
        this.component.instance.left = x || 0;
        this.component.instance.top = y || 0;
        this.component.instance.width = this.element.nativeElement.clientWidth;
        this.component.instance.height = this.element.nativeElement.clientHeight;

        this.renderer.appendChild(
            this.viewContainerRef.element.nativeElement,
            this.component.location.nativeElement,
        );
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    hide() {
        if (this.component) {
            this.component.instance.hide();
        }
        this.isDisplayed = false;
    }

    getFixedPosition(event: MouseEvent): [number, number] {
        let position: [number, number];
        if (this.type === ACTION) {
            const rect = this.element.nativeElement.getBoundingClientRect();
            position = [rect.left, rect.top];
        } else if (event.type === 'focusin') {
            const rect = this.element.nativeElement.getBoundingClientRect();
            position = [rect.right, rect.bottom];
        } else {
            position = [event.pageX, event.pageY];
        }
        if (!this.rootParent) {
            this.rootParent = this.getFixedRootParent(this.element.nativeElement);
        }
        const rootRect = this.rootParent.getBoundingClientRect();
        return [position[0] - rootRect.left, position[1] - rootRect.top];
    }

    getFixedRootParent(element: HTMLElement) {
        if (element.tagName === 'BODY') {
            return element;
        }
        // an element with `position: fixed` will be positionned relatively to the viewport
        // unless one of the ancestor has a property `transform`, `filter` or `perspective`
        const style = getComputedStyle(element);
        if (style.transform !== 'none' || style.perspective !== 'none' || style.filter !== 'none') {
            return element;
        } else {
            return this.getFixedRootParent(element.parentElement);
        }
    }
}
