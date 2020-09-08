import { Input, OnDestroy, OnInit, Directive } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';

let nextId = 0;

@Directive()
export class DeprecatedBaseControl implements OnInit, OnDestroy {
    @Input() id?: string;
    @Input() name?: string;
    @Input()
    get help(): string {
        return this._help;
    }
    set help(value: string) {
        this._help = value || '';
    }
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    _fieldType = 'control';
    _id = '';
    _name = '';
    _helpId = '';
    _help = '';
    _label = '';
    _disabled = false;

    terminator: Subject<void> = new Subject();

    ngOnInit(): void {
        this._id = !this.id ? `${this._fieldType}-${nextId++}` : `${this.id}-${this._fieldType}`;
        this._name = this.name || this._id;
        this._helpId = `${this._id}-help`;
    }

    ngOnDestroy(): void {
        this.terminator.next();
        this.terminator.complete();
    }
}
