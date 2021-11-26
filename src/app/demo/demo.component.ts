import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {
    Avatar,
    BadgeModel,
    ControlModel,
    DialogConfig,
    DialogService,
    getInitialTree,
    SidebarService,
    Toaster,
    ToastModel,
    ToggleModel,
    TranslateService,
} from 'pastanaga-angular';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import packageInfo from '../../../projects/pastanaga/package.json';
import { MultipleScreensDialogComponent } from './multiple-screens-dialog.component';
import { OneScreenDialogComponent } from './one-screen-dialog.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { Traverser } from 'angular-traversal';

// tslint:disable:max-line-length
const b64toBlob = (b64Data: string, contentType: string, sliceSize?: number) => {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = window.atob(b64Data);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
};

@Component({
    selector: 'pa-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent implements OnInit {
    @ViewChild('toastsContainer', { read: ViewContainerRef, static: true }) toastsContainer?: ViewContainerRef;
    isLeftMenuFolded = true;
    isLockedUnfolded = false;

    isStandaloneCheckboxSelected = false;
    standaloneSelection = false;

    simpleCheckboxes: ControlModel[] = [
        new ControlModel({ label: 'checkbox 1', id: 'simple_1', value: 'simple_1' }),
        new ControlModel({ label: 'checkbox 2', id: 'simple_2', value: 'simple_2' }),
        new ControlModel({ label: 'checkbox 3', id: 'simple_3', value: 'simple_3', isSelected: true }),
        new ControlModel({ label: 'checkbox 4', id: 'simple_4', value: 'simple_4', isDisabled: true }),
    ];
    iconCheckboxes: ControlModel[] = [
        new ControlModel({ label: 'checkbox 1', id: 'icon_1', value: 'icon_1', icon: 'folder' }),
        new ControlModel({ label: 'checkbox 2', id: 'icon_2', value: 'icon_2', icon: 'delete', isDisabled: true }),
        new ControlModel({ label: 'checkbox 3', id: 'icon_3', value: 'icon_3', icon: 'inbox', isSelected: true }),
        new ControlModel({ label: 'checkbox 4', id: 'icon_4', value: 'icon_4', icon: 'sent' }),
    ];
    helpCheckboxes: ControlModel[] = [
        new ControlModel({
            label: 'checkbox 1',
            value: 'help_1',
            id: 'help_1',
            help: 'some help about checkbox 1',
            subLabel: '(sub label here)',
        }),
        new ControlModel({
            label: 'checkbox 4',
            value: 'help_4',
            id: 'help_4',
            help: 'some help about checkbox 4',
            labelIcons: [{ name: 'group', tooltip: 'label icon here' }],
        }),
        new ControlModel({
            label: 'checkbox 3',
            value: 'help_3',
            id: 'help_3',
            help: 'some help about checkbox 3',
            isSelected: true,
        }),
        new ControlModel({ label: 'checkbox 2', value: 'help_2', id: 'help_2', help: 'some help about checkbox 2' }),
        new ControlModel({
            label: 'another checkbox',
            value: 'help_5',
            id: 'help_5',
            help: 'some help about another checkbox',
        }),
    ];
    filteredCheckboxes: ControlModel[] = Array.from(
        { length: 200 },
        (x, i) =>
            new ControlModel({
                label: ['A', 'B', 'C', 'D', 'E'][i % 5] + ' ' + i,
                value: 'f_' + i,
                id: 'f_' + i,
            })
    );
    lazyLoadedTree: ControlModel[] = [
        new ControlModel({ id: 'parent1', value: '1', label: 'parent 1', isSelected: false }),
        new ControlModel({ id: 'parent2', value: '2', label: 'parent 2', isSelected: false }),
        new ControlModel({ id: 'parent3', value: '3', label: 'parent 3', isSelected: false }),
        new ControlModel({ id: 'parent4', value: '4', label: 'parent 4', isSelected: false }),
    ];
    nestedCheckboxes: ControlModel[] = [
        new ControlModel({ label: 'checkbox 1', id: 'nested_1', value: 'nested_1', icon: 'user' }),
        new ControlModel({
            label: 'checkbox 3',
            value: 'nested_3',
            id: 'nested_3',
            icon: 'user',
            isSelected: true,
            children: [
                new ControlModel({
                    label: 'checkbox 3.2',
                    value: 'nested_3.2',
                    id: 'nested_3.2',
                    icon: 'folder',
                    isSelected: true,
                }),
                new ControlModel({
                    label: 'checkbox 3.1',
                    value: 'nested_3.1',
                    id: 'nested_3.1',
                    icon: 'folder',
                    isSelected: true,
                }),
            ],
        }),
        new ControlModel({
            label: 'checkbox 2',
            id: 'nested_2',
            value: 'nested_2',
            icon: 'user',
            children: [
                new ControlModel({
                    label: 'checkbox 2.1 with a very long name to test ellipsis is working as it should',
                    value: 'nested_2.1',
                    id: 'nested_2.1',
                    icon: 'folder',
                    children: [
                        new ControlModel({
                            label: 'checkbox 2.1.1',
                            value: 'nested_2.1.1',
                            icon: 'folder',
                            id: 'nested_2.1.1',
                        }),
                        new ControlModel({
                            label: 'checkbox 2.1.2',
                            value: 'nested_2.1.2',
                            icon: 'folder',
                            id: 'nested_2.1.2',
                        }),
                    ],
                }),
                new ControlModel({ label: 'checkbox 2.2', value: 'nested_2.2', icon: 'folder', id: 'nested_2.2' }),
                new ControlModel({ label: 'checkbox 2.0', value: 'nested_2.0', icon: 'folder', id: 'nested_2.0' }),
                new ControlModel({
                    label: 'Another checkbox 2.x',
                    value: 'nested_2.3',
                    icon: 'folder',
                    id: 'nested_2.3',
                }),
            ],
        }),
        new ControlModel({
            label: 'checkbox 4',
            value: 'nested_4',
            id: 'nested_4',
            icon: 'user',
            children: [
                new ControlModel({ label: 'checkbox 4.2', value: 'nested_4.2', icon: 'folder', id: 'nested_4.2' }),
                new ControlModel({ label: 'checkbox 4.1', value: 'nested_4.1', icon: 'folder', id: 'nested_4.1' }),
            ],
        }),
    ];
    categorizedGroup: ControlModel[] = [
        new ControlModel({
            id: 'africa',
            label: 'Africa',
            children: [
                new ControlModel({ id: 'morocco', label: 'Morocco' }),
                new ControlModel({ id: 'tunisia', label: 'Tunisia' }),
                new ControlModel({ id: 'senegal', label: 'Senegal' }),
            ],
        }),
        new ControlModel({
            id: 'america',
            label: 'America',
            children: [
                new ControlModel({ id: 'canada', label: 'Canada' }),
                new ControlModel({ id: 'mexico', label: 'Mexico' }),
                new ControlModel({ id: 'brazil', label: 'Brazil' }),
            ],
        }),
        new ControlModel({
            id: 'europe',
            label: 'Europe',
            children: [
                new ControlModel({ id: 'catalonia', label: 'Catalonia' }),
                new ControlModel({ id: 'belgium', label: 'Belgium' }),
                new ControlModel({ id: 'sweden', label: 'Sweden' }),
            ],
        }),
    ];
    fileSystemTree: ControlModel[] = getInitialTree(false);
    updatedTree: ControlModel[] = [];

    simpleCheckboxSelection: string[] = [];
    iconCheckboxSelection: string[] = [];
    helpCheckboxSelection: string[] = [];
    filteredCheckboxSelection: string[] = [];
    lazyCheckboxSelection: string[] = [];
    categorizedGroupSelection: string[] = [];
    nestedCheckboxSelection: string[] = [];
    fileSystemSelection: string[] = [];

    toggleSelection1 = false;
    toggleSelection2 = true;
    toggleSelection3 = false;

    toggleGroup1: ToggleModel[] = [
        { label: 'label 1', id: 'toggle1', isSelected: false },
        { label: 'label 2', id: 'toggle2', isSelected: false },
        { label: 'label 3', id: 'toggle3', isSelected: false },
        { label: 'label 4', id: 'toggle4', isSelected: false },
    ];

    toggleGroup2: ToggleModel[] = [
        { label: 'label 1', id: 'toggleWithHelp1', help: 'help 1', isSelected: true },
        { label: 'label 2', id: 'toggleWithHelp2', help: 'help 2', isSelected: true },
        { label: 'label 3', id: 'toggleWithHelp3', help: 'help 3', isSelected: true },
        { label: 'label 4', id: 'toggleWithHelp4', help: 'help 4', isSelected: true },
    ];

    toggleGroup3: ToggleModel[] = [
        { label: 'label 1', id: 'toggleWithImage1', imageUrl: './assets/ninja.svg', isSelected: true },
        { label: 'label 2', id: 'toggleWithImage2', imageUrl: './assets/ninja.svg', isSelected: false },
        { label: 'label 3', id: 'toggleWithImage3', imageUrl: './assets/ninja.svg', isSelected: true },
        { label: 'label 4', id: 'toggleWithImage4', imageUrl: './assets/ninja.svg', isSelected: false },
    ];

    toggleGroupSelection1: ToggleModel[] = [];
    toggleGroupSelection2: ToggleModel[] = [];
    toggleGroupSelection3: ToggleModel[] = [];

    slider1 = 10;
    slider2 = 60;

    sliderValues1 = [50, 100];
    sliderValues2 = [50, 100];
    sliderValues3 = [50, 100];

    // tslint:disable-next-line
    IMAGE_PORTRAIT =
        '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';
    avatars: Avatar[] = [
        new Avatar({ username: 'John Doe' }),
        new Avatar({ username: 'Foo Bar', id: 'foo' }),
        new Avatar({ username: 'ۺۼۿܐܒܯݍ ޥޱߊߪߴߵߺࠀࠕࠚ', id: 'ۺۼۿܐܒܯݍޥޱߊߪߴߵߺࠀࠕࠚ' }),
        new Avatar({ username: 'With image', image: of(b64toBlob(this.IMAGE_PORTRAIT, 'image/gif')) }),
        new Avatar({ username: 'Custom background', backgroundColor: '#FBC452' }),
        new Avatar({ username: 'Custom source and background', backgroundColor: '#FBD558' }),
        new Avatar({ username: 'With lock', id: 'lock', badgeIcon: 'lock' }),
        new Avatar({
            username: 'With lock',
            image: of(b64toBlob(this.IMAGE_PORTRAIT, 'image/gif')),
            badgeIcon: 'lock',
        }),
        new Avatar({ username: 'As button' }),
    ];

    // badges
    badgeButtons: BadgeModel[] = [
        {
            icon: 'pen',
            name: 'edit',
            color: 'secondary',
            onClick: () => {
                console.log('click on edit button');
            },
        },
        {
            icon: 'delete',
            name: 'delete',
            color: 'destructive',
            onClick: () => {
                console.log('click on delete button');
            },
        },
    ];

    // text fields
    repeat = 'Hello';
    repeatAgain = 'Hello';
    word = '';
    selection: any;
    options = [
        { id: 'visa', name: 'Visa' },
        { id: 'mastercard', name: 'Mastercard' },
    ];
    optionsCountries = [
        { id: 'fr', name: 'Catalonia' },
        { id: 'it', name: 'Spain', disabled: true },
        { id: 'de', name: 'Andorra', selected: true },
    ];
    versionFormat = new RegExp(/^[0-9]+\.[0-9]+\.[0-9]+$/);
    onlyLetters = new RegExp(/^[a-zA-Z]+$/);

    progressValue = 0;
    progressValue2 = 0;

    toastMessage = 'This is a test';
    toastIcon = 'alert';
    toastButton = 'Dismiss';
    toastButtonColor = 'destructive';
    toastDelay = 0;

    // Calendar
    rangeSelection: { start?: Date; end?: Date } = {};
    dateSelection: Date = new Date();

    sections: any = {};
    version = '';

    constructor(
        private toaster: Toaster,
        private sidebarService: SidebarService,
        private dialogService: DialogService,
        private translateService: TranslateService,
        private traverser: Traverser
    ) {}

    ngOnInit() {
        this.version = packageInfo.version;
        console.log(`Version ${this.version}`);

        // Register the toast container.
        if (!!this.toastsContainer) {
            this.toaster.registerContainer(this.toastsContainer);
        }

        this.resetProgressValueUntil100();
        this.resetProgressValueUntil200();

        const savedSections = localStorage.getItem('sections');
        if (savedSections) {
            this.sections = JSON.parse(savedSections);
        } else {
            this.sections = { text: true };
        }
    }

    changeLanguage() {
        this.translateService.setLang('ca');
        this.traverser.traverseHere();
    }

    selectForRange(selectedDate: Date) {
        if (!this.rangeSelection.start) {
            this.rangeSelection = { ...this.rangeSelection, start: selectedDate };
        } else {
            this.rangeSelection = { ...this.rangeSelection, end: selectedDate };
        }
    }

    resetProgressValueUntil100() {
        setTimeout(() => {
            this.progressValue = 0;

            setTimeout(() => {
                setInterval(() => {
                    if (this.progressValue < 100) {
                        this.progressValue += 1;
                    }
                }, 50);
            }, 1000);
        }, 1000);
    }

    resetProgressValueUntil200() {
        setTimeout(() => {
            this.progressValue2 = 0;

            setTimeout(() => {
                setInterval(() => {
                    if (this.progressValue2 < 200) {
                        this.progressValue2 += 1;
                    }
                }, 50);
            }, 1000);
        }, 2000);
    }

    resetSliders() {
        const defaultValue = [50, 100];
        this.sliderValues1 = defaultValue;
        this.sliderValues2 = defaultValue;
        this.sliderValues3 = defaultValue;
    }

    displaySelection(value) {
        this.selection = value;
    }

    onButtonClick($event) {
        console.log('Click on button!', $event);
    }

    openToast() {
        const message = this.toastMessage || 'Toast message';
        const icon = this.toastIcon || '';
        const button = this.toastButton || '';
        const buttonColor = this.toastButtonColor || 'primary';

        const toast = new ToastModel({
            icon: icon,
            message: message,
            delay: this.toastDelay || 5000,
            buttons: button ? [{ id: button, text: button, color: buttonColor, icon: '' }] : [],
        });

        this.toaster.open(toast);
    }

    openQuickToast() {
        const message = this.toastMessage || 'Toast message';
        const button = this.toastButton || '';
        this.toaster.open(message, button, this.toastDelay || 5000);
    }

    toggleSection(id) {
        this.sections[id] = !this.sections[id];
        localStorage.setItem('sections', JSON.stringify(this.sections));
    }

    openMenu(menuKey: string) {
        this.sidebarService.toggle(menuKey);
    }

    toggleStayUnfolded(menuKey: string) {
        this.isLockedUnfolded = !this.isLockedUnfolded;
        const menu = this.sidebarService.getSidebar(menuKey);
        if (!!menu) {
            menu.unfoldOnHover = !this.isLockedUnfolded;
        }
    }

    hello() {
        console.log(this);
        console.log('Hello');
    }

    getLazyTreeChildren(checkbox: ControlModel): Observable<ControlModel[]> {
        const parentValue: number = parseInt(checkbox.value || '0', 10);
        const noChildren =
            !!checkbox.value && ((checkbox.value.length === 1 && parentValue % 2 === 0) || checkbox.value.length > 1);
        const children: ControlModel[] = noChildren
            ? []
            : [
                  new ControlModel({
                      id: `child-of-${checkbox.id}-1`,
                      value: (parentValue + 1).toString(),
                      label: `Child ${parentValue}-1`,
                  }),
                  new ControlModel({
                      id: `child-of-${checkbox.id}-2`,
                      value: (parentValue + 2).toString(),
                      label: `Child ${parentValue}-2`,
                  }),
                  new ControlModel({
                      id: `child-of-${checkbox.id}-3`,
                      value: (parentValue + 3).toString(),
                      label: `Child ${parentValue}-3`,
                  }),
              ];
        return of(children).pipe(delay(100));
    }

    openNonBlockingDialog() {
        this.dialogService
            .openDialog(OneScreenDialogComponent, new DialogConfig({ blocking: false }))
            .onClose.subscribe((data) => console.log('Dialog closed', data));
    }

    openColoredDialog() {
        this.dialogService
            .openDialog(MultipleScreensDialogComponent, new DialogConfig({ bandColor: '#2FB4CF' }))
            .onClose.subscribe((data) => console.log('Dialog closed', data));
    }

    openNoCloseDialog() {
        this.dialogService
            .openDialog(OneScreenDialogComponent, new DialogConfig({ withCloseButton: false }))
            .onClose.subscribe((data) => console.log('Dialog closed', data));
    }

    openBasicConfirmation() {
        this.dialogService
            .openConfirm(
                'Do you like pastanaga?',
                'Both buttons will close the confirmation, returning true if you confirm'
            )
            .onClose.subscribe((confirmed) => console.log(`Confirmed: ${confirmed}`));
    }

    openDeleteConfirmation() {
        this.dialogService
            .openDialog(ConfirmDeleteDialogComponent)
            .onClose.subscribe((confirmed) => console.log(`Confirmed: ${confirmed}`));
    }
}
