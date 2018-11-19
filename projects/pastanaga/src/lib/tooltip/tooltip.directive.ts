import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Input, ViewContainerRef, } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

const SYSTEM = 'system';
const ACTION = 'action';

@Directive({
    selector: '[paTooltip]'
})
export class TooltipDirective {

    @Input('paTooltip') text: string;
    @Input('paTooltipType') type = SYSTEM;

    focusout: Subject<boolean> = new Subject();

    private component: ComponentRef<TooltipComponent>;
    private mouseX: number;
    private mouseY: number;

    constructor(
        private element: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
    ) {
    }

    @HostListener('focusin')
    @HostListener('mouseenter')
    focus() {
        Observable.timer(1000)      // display tooltip after 1 second hovering the parent element
                  .takeUntil(this.focusout)   // unless the mouse leaves before
                  .subscribe(() => {
                      this.show();
                  });
    }

    show() {
        if (this.component) {
            this.component.destroy();
            this.component = null;
        }

        const factory = this.resolver.resolveComponentFactory(TooltipComponent);
        this.component = this.viewContainerRef.createComponent(factory);
        this.component.instance.text = this.text;

        switch (this.type) {
            case ACTION:
                // It will display the tooltip centered on tooltips owner
                const rect = this.element.nativeElement.getBoundingClientRect();
                this.component.instance.top = rect.y;
                this.component.instance.left = rect.x;
                this.component.instance.width = rect.width;
                this.component.instance.height = rect.height;
                break;

            case SYSTEM:
            default:
                // It will display the tooltip at the right side of the mouse
                this.component.instance.mouseX = this.mouseX;
                this.component.instance.mouseY = this.mouseY;
                break;
        }

    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    @HostListener('mousedown')
    hide(): void {
        this.focusout.next(true);
        if (this.component) {
            this.component.destroy();
            this.component = null;
        }
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        if (!this.component) {
            this.mouseX = event.pageX + (this.type === SYSTEM ? 3 : 0);
            this.mouseY = event.pageY + 10;
        }
    }
}

