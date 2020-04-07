import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContextMenuItem } from './context-menu.model';
import { DropdownComponent } from './dropdown.component';
import { PopupService } from '../popup/popup.service';
import { getFixedRootParent, Icon } from '../common/utils';

let nextId = 0;

@Component({
    selector: 'pa-dropdown-item',
    templateUrl: './dropdown-item.component.html',
})
export class DropdownItemComponent implements Highlightable, OnInit, OnDestroy {
    disabled?: boolean | undefined;
    @Input() id?: string;
    @Input() tooltip?: string;
    @Input() set icon(value: string | Icon) {
        if (!!value && typeof value === 'string') {
            this._iconName = value;
        } else {
            this._icon = value as Icon;
        }
    }
    @Input() set smallIcon(value) { this.isSmallIcon = coerceBooleanProperty(value); }
    isSmallIcon = false;
    @Input() set iconOnRight(value) { this.isIconOnRight = coerceBooleanProperty(value); }
    isIconOnRight = false;
    @Input() shortcut?: string;
    @Input() checkboxMode = false;
    @Input() isSelected = false;
    @Input() mode: 'default' | 'primary' | 'secondary' | 'destructive' = 'secondary';
    @Input() isDisabled = false;
    @Input() hasSeparator = false;
    @Input() subLevelItems?: ContextMenuItem[];
    @Input() subLabel?: string;

    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter();
    @Output() onEnter: EventEmitter<KeyboardEvent> = new EventEmitter();
    @Output() onSelection: EventEmitter<boolean> = new EventEmitter();
    @Output() onSubMenuSelection: EventEmitter<ContextMenuItem> = new EventEmitter();

    @ViewChild('listItem', { static: true }) listItem?: ElementRef;
    @ViewChild(DropdownComponent, { static: true}) subMenu?: DropdownComponent;

    _iconName = '';
    _icon?: Icon;

    subMenuOpen = false;
    terminator = new Subject<void>();

    constructor(
        private service: PopupService,
    ) {
        this.service.closeAllSubMenu.pipe(takeUntil(this.terminator)).subscribe(() => this.subMenuOpen = false);
    }

    ngOnInit(): void {
        if (!this.id) {
            this.id = `dropdown-item-${nextId++}`;
        }
    }

    ngOnDestroy() {
        this.terminator.next();
    }

    @HostListener('keydown.enter', ['$event'])
    pressEnter(event: KeyboardEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.onEnter.emit(event);
    }

    @HostListener('keydown.space', ['$event'])
    pressSpace(event: KeyboardEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.select(!this.isSelected);
    }

    click(event: MouseEvent) {
        if (!this.checkboxMode) {
            event.preventDefault();
            event.stopPropagation();

            this.service.closeAllPopups.next();

            if (!this.isDisabled) {
                this.onClick.emit(event);
            }
        }
    }

    clickSubMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        if (!!this.subMenu && !!this.listItem && !!this.subLevelItems) {
            if (this.subMenuOpen) {
                this.subMenuOpen = false;
                this.subMenu.close();
            } else {
                const parentPosition = this.listItem.nativeElement.getBoundingClientRect();
                const rootPosition = getFixedRootParent(this.listItem.nativeElement).getBoundingClientRect();
                const right = rootPosition.right - parentPosition.right;
                const size = this.subLevelItems.length > 8 ? 8 : this.subLevelItems.length - 1;
                const subMenuHeight = parentPosition.height * size;
                const hasRightSpace = right > parentPosition.width;
                const hasBottomSpace = rootPosition.bottom - parentPosition.bottom > subMenuHeight;
                this.subMenu.show({
                    position: 'fixed',
                    top: `${(parentPosition.top - 6) - rootPosition.top - (hasBottomSpace ? 0 : subMenuHeight)}px`,
                    left: `${hasRightSpace ? parentPosition.right + 3 : parentPosition.left - parentPosition.width - 3}px`,
                    right: `${hasRightSpace ? right : parentPosition.left}px`,
                }, true);
                this.subMenuOpen = true;
            }
        }
    }

    select(event: boolean) {
        this.isSelected = event;
        this.onSelection.emit(event);
    }
    setActiveStyles() {
        this.isSelected = true;
        if (this.listItem) {
            this.listItem.nativeElement.focus();
        }
    }
    scrollIntoView() {
        if (this.listItem) {
            this.listItem.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }
    setInactiveStyles() {
        this.isSelected = false;
    }
    selectSubMenu(item: ContextMenuItem) {
        this.subMenuOpen = false;
        this.onSubMenuSelection.emit(item);
    }
}
