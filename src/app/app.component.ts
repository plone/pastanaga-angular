import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BadgeModel, ControlModel, Toaster, ToastModel, ToggleModel } from '../../projects/pastanaga/src';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('toastsContainer', { read: ViewContainerRef, static: true }) toastsContainer?: ViewContainerRef;

    isStandaloneCheckboxSelected = false;
    standaloneSelection = false;

    simpleCheckboxes: ControlModel[] = [
        <ControlModel>{label: 'checkbox 1', value: 'simple_1'},
        <ControlModel>{label: 'checkbox 2', value: 'simple_2'},
        <ControlModel>{label: 'checkbox 3', value: 'simple_3', isSelected: true},
        <ControlModel>{label: 'checkbox 4', value: 'simple_4', isDisabled: true},
    ];
    iconCheckboxes: ControlModel[] = [
        <ControlModel>{label: 'checkbox 1', value: 'icon_1', icon: 'folder'},
        <ControlModel>{label: 'checkbox 2', value: 'icon_2', icon: 'delete', isDisabled: true},
        <ControlModel>{label: 'checkbox 3', value: 'icon_3', icon: 'inbox', isSelected: true},
        <ControlModel>{label: 'checkbox 4', value: 'icon_4', icon: 'sent'},
    ];
    helpCheckboxes: ControlModel[] = [
        <ControlModel>{label: 'checkbox 1', value: 'help_1', help: 'some help about checkbox 1'},
        <ControlModel>{label: 'checkbox 4', value: 'help_4', help: 'some help about checkbox 4'},
        <ControlModel>{label: 'checkbox 3', value: 'help_3', help: 'some help about checkbox 3', isSelected: true},
        <ControlModel>{label: 'checkbox 2', value: 'help_2', help: 'some help about checkbox 2'},
        <ControlModel>{label: 'another checkbox', value: 'help_5', help: 'some help about another checkbox'},
    ];
    nestedCheckboxes: ControlModel[] = [
        <ControlModel>{label: 'checkbox 1', value: 'nested_1'},
        <ControlModel>{
            label: 'checkbox 3', value: 'nested_3', isSelected: true, children: [
                {label: 'checkbox 3.1', value: 'nested_3.1', isSelected: true},
                {label: 'checkbox 3.2', value: 'nested_3.2', isSelected: true},
            ]
        },
        <ControlModel>{
            label: 'checkbox 2', value: 'nested_2', children: [
                {label: 'checkbox 2.1', value: 'nested_2.1'},
                {label: 'checkbox 2.2', value: 'nested_2.2'},
                {label: 'checkbox 2.0', value: 'nested_2.0'},
                {label: 'Another checkbox 2.x', value: 'nested_2.3'},
            ]
        },
        <ControlModel>{
            label: 'checkbox 4', value: 'nested_4', children: [
                {label: 'checkbox 4.1', value: 'nested_4.1'},
                {label: 'checkbox 4.2', value: 'nested_4.2'},
            ]
        },
    ];

    simpleCheckboxSelection: string[] = [];
    iconCheckboxSelection: string[] = [];
    helpCheckboxSelection: string[] = [];
    nestedCheckboxSelection: string[] = [];

    toggleSelection1 = false;
    toggleSelection2 = true;
    toggleSelection3 = false;


    toggleGroup1: ToggleModel[] = [
        {label: 'label 1', id: 'toggle1', isSelected: false},
        {label: 'label 2', id: 'toggle2', isSelected: false},
        {label: 'label 3', id: 'toggle3', isSelected: false},
        {label: 'label 4', id: 'toggle4', isSelected: false},
    ];

    toggleGroup2: ToggleModel[] = [
        {label: 'label 1', id: 'toggleWithHelp1', help: 'help 1', isSelected: true},
        {label: 'label 2', id: 'toggleWithHelp2', help: 'help 2', isSelected: true},
        {label: 'label 3', id: 'toggleWithHelp3', help: 'help 3', isSelected: true},
        {label: 'label 4', id: 'toggleWithHelp4', help: 'help 4', isSelected: true},
    ];

    toggleGroup3: ToggleModel[] = [
        {label: 'label 1', id: 'toggleWithImage1', imageUrl: './assets/ninja.svg', isSelected: true},
        {label: 'label 2', id: 'toggleWithImage2', imageUrl: './assets/ninja.svg', isSelected: false},
        {label: 'label 3', id: 'toggleWithImage3', imageUrl: './assets/ninja.svg', isSelected: true},
        {label: 'label 4', id: 'toggleWithImage4', imageUrl: './assets/ninja.svg', isSelected: false},
    ];

    toggleGroupSelection1: ToggleModel[] = [];
    toggleGroupSelection2: ToggleModel[] = [];
    toggleGroupSelection3: ToggleModel[] = [];


    slider1 = 10;
    slider2 = 60;

    sliderValues1 = [50, 100];
    sliderValues2 = [50, 100];
    sliderValues3 = [50, 100];

    // badges
    badgeButtons: BadgeModel[] = [
        {
            icon: 'pen', name: 'edit', color: 'secondary', onClick: () => {
                console.log('click on edit button');
            }
        },
        {
            icon: 'delete', name: 'delete', color: 'destructive', onClick: () => {
                console.log('click on delete button');
            }
        },
    ];

    // text fields
    repeat = 'Hello';
    repeatAgain = 'Hello';
    word = '';
    selection: any;
    options = [{id: 'visa', name: 'Visa'}, {id: 'mastercard', name: 'Mastercard'}];
    optionsCountries = [
        {id: 'fr', name: 'Catalonia'},
        {id: 'it', name: 'Spain', disabled: true},
        {id: 'de', name: 'Andorra', selected: true},
    ];
    versionFormat = new RegExp(/^[0-9]+\.[0-9]+\.[0-9]+$/);


    progressValue = 0;
    progressValue2 = 0;

    toastMessage = 'This is a test';
    toastIcon = 'alert';
    toastButton = 'Dismiss';
    toastButtonColor = 'destructive';
    toastDelay = 0;

    sections: any = {};

    constructor(
        private toaster: Toaster,
    ) {
    }

    ngOnInit() {
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
            this.sections = {text: true};
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


    onRepeat(value) {
        this.repeatAgain = value;
    }

    onSpell(value) {
        this.word = value;
    }

    openToast() {
        const message = this.toastMessage || 'Toast message';
        const delay = this.toastDelay || 5000;
        const icon = this.toastIcon || '';
        const button = this.toastButton || '';
        const buttonColor = this.toastButtonColor || 'primary';


        const toast = new ToastModel({
            icon: icon,
            message: message,
            delay: delay,
            buttons: button ? [{id: button, text: button, color: buttonColor, icon: ''}] : []
        });

        this.toaster.open(toast);
    }

    openQuickToast() {
        const message = this.toastMessage || 'Toast message';
        const button = this.toastButton || '';
        const delay = this.toastDelay || 5000;
        this.toaster.open(message, button, delay);
    }

    toggleSection(id) {
        this.sections[id] = !this.sections[id];
        localStorage.setItem('sections', JSON.stringify(this.sections));
    }
}
