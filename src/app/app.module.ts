import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ControlsModule } from 'pastanaga';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        ControlsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
