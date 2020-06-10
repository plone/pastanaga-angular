import { Injectable } from '@angular/core';
import { TranslatePipe } from './translate/translate.pipe';

@Injectable({
  providedIn: 'root'
})
export class PastanagaService {

  constructor(
      public translate: TranslatePipe,
  ) { }
}
