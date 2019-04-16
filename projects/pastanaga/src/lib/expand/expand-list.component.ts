import { Component, Input, HostListener } from '@angular/core';

@Component({
    selector: 'pa-expand-list',
    templateUrl: 'expand-list.component.html',
    styleUrls: ['./expand-list.component.scss']
})

export class ExpandListComponent {
    @Input() large = false;

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
            console.log(element.tagName);
            return this.getParentExpand(element.parentElement);
        }
    }
}