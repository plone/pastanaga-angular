import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-text-area-page',
    templateUrl: './textarea-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaPageComponent {
    model = '';
    selectedTab = 'standalone';

    htmlExample = `<form #demoForm="ngForm">
    <pa-textarea
        [(ngModel)]="model"
        [placeholder]="config.placeholder"
        [noAutoComplete]="config.preventAutocomplete"
        [acceptHtmlTags]="config.acceptHtml"

        [disabled]="config.disabled"
        [readonly]="config.readonly"
        [hasFocus]="config.hasFocus"

        [help]="config.help"
        [errorMessage]="config.errorMessage"
        [errorMessages]="config.errorMessages"
        [showAllErrors]="config.showAllErrors"
        [required]="config.required"
        [maxlength]="config.maxlength"

        [autoHeight]="config.autoHeight"
        [rows]="config.rows"
        [resizable]="config.resizable"
        [maxRows]="config.maxRows"
        [maxHeight]="config.maxHeight"

        (valueChange)="valueChangeEvent = $event"
        (statusChange)="statusChangeEvent = $event"
        (keyUp)="keyupEvent = $event"
        (enter)="enterEvent = $event"
        (focusing)="focusEvent = $event"
        (blurring)="blurEvent = $event"
    </pa-textarea>
</form>`;
}
