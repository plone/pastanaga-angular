import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Services } from '@plone/restapi-angular';

@Injectable()
export class PastanagaService {
    public message: BehaviorSubject<{message?: string, error?: boolean}> = new BehaviorSubject({});
    preserve: boolean;

    constructor(
        public services: Services
    ) {
        this.services.traverser.target.subscribe(() => {
            // discard message after traversing
            this.discardMessage();
        });
    }

    displayMessage(message: string, error?: boolean) {
        this.message.next({message: message, error: error});
        this.preserve = true;
        // preserve message for at least2 seconds
        Observable.timer(2000).subscribe(() => {
            this.preserve = false;
        });
    }

    discardMessage(immediate?: boolean) {
        if(!this.preserve || immediate) {
            this.message.next({});
        }
    }
}