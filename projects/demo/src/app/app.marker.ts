import { Marker } from 'angular-traversal';
import { Injectable } from "@angular/core";

@Injectable()
export class AppMarker extends Marker {
    mark(context: any): string | string[] {
        return '';
    }
}
