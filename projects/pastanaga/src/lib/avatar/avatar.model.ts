import { Observable } from 'rxjs';

interface IAvatar {
    username: string;
    id?: string;
    backgroundColor?: string;
    image?: Observable<Blob>;
    badgeIcon?: string;
}

export class Avatar implements IAvatar {
    username: string;
    id?: string;
    backgroundColor?: string;
    image?: Observable<Blob>;
    badgeIcon?: string;

    constructor(data: IAvatar) {
        this.username = data.username;
        this.id = data.id;
        this.backgroundColor = data.backgroundColor;
        this.image = data.image;
        this.badgeIcon = data.badgeIcon;
    }
}

export const COLORS = [
    'blue',
    'teal',
    'jade',
    'green',
    'lime',
    'kaki',
    'yellow',
    'orange',
    'salmon',
    'red',
    'crisom',
    'magenta',
    'violet',
    'indigo',
    'azure',
];
