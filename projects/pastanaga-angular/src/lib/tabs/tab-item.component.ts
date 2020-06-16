import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
    selector: 'pa-tab',
    templateUrl: 'tab-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabItemComponent {
    @Input()
    get active(): boolean { return this._active; }
    set active(isActive: boolean) { this._active = isActive; }
    _active = false;

    @Output() public activate: EventEmitter<boolean> = new EventEmitter();

    @HostBinding('class.active') get valid() { return this._active; }
}
