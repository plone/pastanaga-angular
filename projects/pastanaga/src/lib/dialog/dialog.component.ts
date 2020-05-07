import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { BaseDialogComponent } from './base-dialog.component';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { markForCheck } from '../common/utils';


@Component({
    selector: 'pa-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent extends BaseDialogComponent implements OnInit, AfterContentInit, OnDestroy {
    @Output() back: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('image', { read: ElementRef, static: true }) image?: ElementRef;
    @ViewChild('body', { read: ElementRef, static: true }) body?: ElementRef;
    @ViewChild('footer', { read: ElementRef, static: true }) footer?: ElementRef;

    // public properties meant to be used or updated from outside
    set forceSmallImage(value: boolean) {
        this._isSmallImage = value;
        this._forceSmallImage = value;
    }
    presentationMode = false;
    displayBackButton = false;

    set totalSteps(value: number) {
        this._indicators = Array.from(Array(value).keys());
    }
    activeStep?: number;

    closed: Subject<void> = new Subject<void>();

    // public properties used in template but meant to stay internal
    _hasImage = false;
    _hasFooter = false;

    _isContentShadowTop = false;
    _isContentShadowBottom = false;

    _isSmallImage = false;
    private _forceSmallImage = false;
    private _staySmall = false;

    _indicators: number[] = [];
    _scroll: Subject<any> = new Subject();

    constructor(
        protected cdr: ChangeDetectorRef,
    ) {
        super(cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this._scroll.pipe(
            takeUntil(this.closed),
            debounceTime(20),
        ).subscribe(event => this.onScroll(event));
    }

    ngAfterContentInit(): void {
        super.ngAfterContentInit();

        this._hasImage = !!this.image && this.image.nativeElement.children.length > 0;
        this._hasFooter = !!this.footer && this.footer.nativeElement.children.length > 0;
        this.setFocus();

        setTimeout(() => {
            if (!!this.body) {
                const body = this.body.nativeElement;
                this._isContentShadowBottom = body.scrollHeight - body.clientHeight - body.scrollTop > 20;
                markForCheck(this.cdr);
            }
        }, 1500);
    }

    ngOnDestroy(): void {
        this.closed.next();
    }

    private onScroll($event) {
        if ($event.target.scrollTop !== 0 || !this._staySmall) {
            const scrollTop = $event.target.scrollTop;
            this._isSmallImage = this._forceSmallImage || scrollTop > 1;
            this._isContentShadowTop = scrollTop > 20;
            this._isContentShadowBottom = $event.target.scrollHeight - $event.target.clientHeight - scrollTop > 20;
            markForCheck(this.cdr);
            setTimeout(() => {
                this._staySmall = $event.target.scrollTop === 0;
                markForCheck(this.cdr);
            });
        }
    }
}
