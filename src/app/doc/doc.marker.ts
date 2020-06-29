import { Marker } from 'angular-traversal';
import { Injectable } from "@angular/core";


@Injectable()
export class DocMarker extends Marker {
    mark(context: any): string | string[] {
        return '';
    }
}
