import { Type } from '@angular/core';

export interface IMenuSection {
  title: string;
  pages: { path: string; title: string; type: Type<any> }[];
}
