import { Injectable } from '@angular/core';
import { TranslatePipe } from './translate/translate.pipe';
import { PopupService } from './popup/popup.service';

@Injectable({
  providedIn: 'root'
})
export class PastanagaService {

  constructor(
      public popup: PopupService,
      public translate: TranslatePipe,
  ) { }
}
