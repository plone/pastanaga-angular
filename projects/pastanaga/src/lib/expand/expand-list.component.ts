import { Component, Input, HostListener } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'pa-expand-list',
    templateUrl: 'expand-list.component.html',
    styleUrls: ['./expand-list.component.scss']
})

export class ExpandListComponent {
    @Input()
    get large(): boolean { return this._large; }
    set large(value: boolean) { this._large = coerceBooleanProperty(value); }
    protected _large = false;

    @HostListener('keydown.arrowDown', ['$event'])
    focusOnNext($event: KeyboardEvent) {
        const parent = this.getParentExpand(<HTMLElement>($event.srcElement));
        if (!!parent && !!parent.nextElementSibling) {
            this.focusOnButton(<HTMLElement>parent.nextElementSibling, $event);
        }
    }

    @HostListener('keydown.arrowUp', ['$event'])
    focusOnPrevious($event: KeyboardEvent) {
        const parent = this.getParentExpand(<HTMLElement>($event.srcElement));
        if (!!parent && !!parent.previousElementSibling) {
            this.focusOnButton(<HTMLElement>parent.previousElementSibling, $event);
        }
    }

    focusOnButton(element: HTMLElement, event: KeyboardEvent) {
        const button = <HTMLElement>element.querySelector('button');
        if (!!button) {
            event.preventDefault();
            button.focus();
        }
    }

    getParentExpand(element: HTMLElement | null): HTMLElement | null {
        if (!element || element.tagName === 'PA-EXPAND') {
            return element;
        } else {
            return this.getParentExpand(element.parentElement);
        }
    }
}