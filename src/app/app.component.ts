import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BadgeModel, ControlModel } from 'pastanaga';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }

    isStandaloneCheckboxSelected: boolean;
    standaloneSelection: string;

    simpleCheckboxes: ControlModel[] = [
        {label: 'checkbox 1', value: 'simple_1'},
        {label: 'checkbox 2', value: 'simple_2'},
        {label: 'checkbox 3', value: 'simple_3', isSelected: true},
        {label: 'checkbox 4', value: 'simple_4', isDisabled: true},
    ];
    iconCheckboxes: ControlModel[] = [
        {label: 'checkbox 1', value: 'icon_1', icon: 'folder'},
        {label: 'checkbox 2', value: 'icon_2', icon: 'delete', isDisabled: true},
        {label: 'checkbox 3', value: 'icon_3', icon: 'inbox', isSelected: true},
        {label: 'checkbox 4', value: 'icon_4', icon: 'sent'},
    ];
    helpCheckboxes: ControlModel[] = [
        {label: 'checkbox 1', value: 'help_1', help: 'some help about checkbox 1'},
        {label: 'checkbox 4', value: 'help_4', help: 'some help about checkbox 4'},
        {label: 'checkbox 3', value: 'help_3', help: 'some help about checkbox 3', isSelected: true},
        {label: 'checkbox 2', value: 'help_2', help: 'some help about checkbox 2'},
        {label: 'another checkbox', value: 'help_5', help: 'some help about another checkbox'},
    ];
    nestedCheckboxes: ControlModel[] = [
        {label: 'checkbox 1', value: 'nested_1', children: []},
        {
            label: 'checkbox 3', value: 'nested_3', isSelected: true, children: [
                {label: 'checkbox 3.1', value: 'nested_3.1', isSelected: true},
                {label: 'checkbox 3.2', value: 'nested_3.2', isSelected: true},
            ]
        },
        {
            label: 'checkbox 2', value: 'nested_2', children: [
                {label: 'checkbox 2.1', value: 'nested_2.1'},
                {label: 'checkbox 2.2', value: 'nested_2.2'},
                {label: 'checkbox 2.0', value: 'nested_2.0'},
                {label: 'Another checkbox 2.x', value: 'nested_2.3'},
            ]
        },
        {
            label: 'checkbox 4', value: 'nested_4', children: [
                {label: 'checkbox 4.1', value: 'nested_4.1'},
                {label: 'checkbox 4.2', value: 'nested_4.2'},
            ]
        },
    ];

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


    onButtonClick($event) {
        console.log('Click on button!', $event);
    }
}
