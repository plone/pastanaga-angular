import { Observable } from 'rxjs';

export interface AvatarModel {
    userId?: string;
    userName?: string;
    image?: Observable<Blob>;
    imageSrc?: string;
    autoBackground?: boolean;
    size?: 'tiny' | 'small' | 'medium' | 'huge';
}
