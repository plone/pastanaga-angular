import { Observable } from 'rxjs';

export interface AvatarModel {
    userId?: string;
    userName?: string;
    image?: Observable<Blob>;
    imageSrc?: string;
    autoBackground?: boolean;
    size?: 'small' | 'medium' | 'large';
}
