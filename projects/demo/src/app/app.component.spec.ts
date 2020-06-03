import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Marker, Normalizer, Resolver, TraversalModule } from 'angular-traversal';
import { PaDemoModule } from './demo/demo.module';
import { APP_BASE_HREF } from '@angular/common';
import { AppMarker } from './app.marker';
import { AppResolver } from './app.resolver';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [TraversalModule, PaDemoModule],
            providers: [
                {provide: Marker, useClass: AppMarker},
                {provide: Resolver, useClass: AppResolver},
                {provide: Normalizer},
                {provide: APP_BASE_HREF, useValue: '/'}
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
