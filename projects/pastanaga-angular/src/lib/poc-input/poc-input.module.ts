import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PocInputComponent } from './poc-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [PocInputComponent],
    exports: [PocInputComponent],
})
export class PaPocInputModule {}
