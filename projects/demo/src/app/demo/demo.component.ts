import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BreakpointObserver, markForCheck } from '../../../../pastanaga-angular/src';
import { takeUntil } from 'rxjs/operators';
import { IDemoMenuSection } from './demo-menu/demo-menu.component';
import { Traverser } from 'angular-traversal';

@Component({
    selector: 'pa-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit, OnDestroy {
    @Input() menu: IDemoMenuSection[] = [];
    @Input() logo = '';

    mode?: string;
    activeItem = '';
    terminator = new Subject();

    constructor(private traverser: Traverser, private breakpoint: BreakpointObserver, private cdr: ChangeDetectorRef) {
        this.breakpoint.currentMode.subscribe((mode) => {
            this.mode = mode;
            markForCheck(this.cdr);
        });

        this.traverser.target.pipe(takeUntil(this.terminator)).subscribe((target: { view: string }) => {
            this.activeItem = target.view;
            markForCheck(this.cdr);
        });
    }

    ngOnInit() {
        this.menu.forEach((section) =>
            section.pages.forEach((page) => this.traverser.addView(page.view, '', page.type))
        );
    }

    ngOnDestroy() {
        this.terminator.next();
        this.terminator.complete();
    }
}
