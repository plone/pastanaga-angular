import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
    selector: 'pa-tab',
    templateUrl: 'tab-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabItemComponent {
    @Input() public set active(isActive: boolean) {
        this._active = isActive;
    }
    public _active = false;
    @Output() public activate: EventEmitter<boolean> = new EventEmitter();

    @HostBinding('class.active') get valid() { return this._active; }
}
