import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let nextId = 0;
const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

@Component({
    selector: 'pa-expand',
    templateUrl: 'expand.component.html',
    styleUrls: ['./expand.component.scss'],
    animations: [
        trigger('bodyExpansion', [
            state('collapsed', style({height: '0px', visibility: 'hidden'})),
            state('expanded', style({height: '*', visibility: 'visible'})),
            transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
        ])
    ],
})
export class ExpandComponent implements OnInit {
    @Input() toggleTooltip: string[] = ['', ''];
    @Input()
    get openOnInit(): boolean { return this._openOnInit; }
    set openOnInit(value: boolean) { this._openOnInit = coerceBooleanProperty(value); }
    @Input()
    get maintainContentOnClose(): boolean { return this._maintainContentOnClose; }
    set maintainContentOnClose(value: boolean) { this._maintainContentOnClose = coerceBooleanProperty(value); }

    @Output() open: EventEmitter<void> = new EventEmitter();
    @Output() close: EventEmitter<void> = new EventEmitter();

    private _openOnInit = false;
    private _maintainContentOnClose = false;
    isOpen = false;
    id: string;

    constructor() {
        this.id = `pa-expand-${nextId++}`;
    }

    ngOnInit() {
        if (this.openOnInit) {
            setTimeout(() => this.togglePanel(), 500);
        }
    }

    togglePanel() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.open.emit();
        } else {
            this.close.emit();
        }
    }
}
