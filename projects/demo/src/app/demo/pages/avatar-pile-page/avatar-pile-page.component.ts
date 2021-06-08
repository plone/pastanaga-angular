import { Component } from '@angular/core';
import { AvatarModel, ToastService } from '../../../../../../pastanaga-angular/src';
import { avatar } from '../../demo.component';

@Component({
    templateUrl: 'avatar-pile-page.component.html',
})
export class AvatarPilePageComponent {
    avatars: AvatarModel[] = [
        { image: avatar, userName: 'John Doe' },
        { imageSrc: 'assets/ninja.svg', userName: 'Ninja Turtle' },
        { userName: 'Foo Bar', userId: 'foo@bar.com', autoBackground: true },
        { userName: 'Another One', userId: 'another@one.com', autoBackground: true },
        { userName: 'Another One 1', userId: 'another1@one.com', autoBackground: true },
        { userName: 'Another One 2', userId: 'another2@one.com', autoBackground: true },
        { userName: 'Another One 3', userId: 'another3@one.com', autoBackground: true },
        { userName: 'Another One 4', userId: 'another4@one.com', autoBackground: true },
        { userName: 'Another One 5', userId: 'another5@one.com', autoBackground: true },
        { userName: 'Another One 6', userId: 'another6@one.com', autoBackground: true },
        { userName: 'Another One 7', userId: 'another7@one.com', autoBackground: true },
        { userName: 'Another One 8', userId: 'another8@one.com', autoBackground: true },
        { userName: 'Another One 9', userId: 'another9@one.com', autoBackground: true },
        { userName: 'Another One 10', userId: 'another10@one.com', autoBackground: true },
        { userName: 'Another One 11', userId: 'another11@one.com', autoBackground: true },
        { userName: 'Another One 12', userId: 'another12@one.com', autoBackground: true },
        { userName: 'Another One 13', userId: 'another13@one.com', autoBackground: true },
        { userName: 'Another One 14', userId: 'another14@one.com', autoBackground: true },
        { userName: 'Another One 16', userId: 'another16@one.com', autoBackground: true },
        { userName: 'Another One 17', userId: 'another17@one.com', autoBackground: true },
        { userName: 'Last One', userId: 'last@one.com', autoBackground: true },
    ];

    simpleCode = `<pa-avatar-pile [avatars]="avatars"></pa-avatar-pile>`;
    alwaysVisibleButtonCode = `<pa-avatar-pile [avatars]="avatars" buttonAlwaysVisible></pa-avatar-pile>`;
    customButtonCode = `<pa-avatar-pile [avatars]="avatars"
                (clickOnMore)="displayToast()"
                customButton></pa-avatar-pile>`;

    constructor(private toastService: ToastService) {}

    displayToast() {
        this.toastService.openInfo('You clicked on more button');
    }
}
