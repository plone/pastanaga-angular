import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { ExpandComponent } from './expand.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExpandTitleDirective, ExpandDescriptionDirective } from './expand.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from '../tooltip/tooltip.module';

@Component({
    selector: 'test',
    template: `
    <pa-expand>
        <expand-title>Title</expand-title>
        <expand-description>with a description</expand-description>
        <p>Lorem ipsum dolor sit amet</p>
    </pa-expand>
    `
})
class Test1Component {
}

@Component({
    selector: 'test',
    template: `
    <pa-expand (open)="onOpen()" (close)="onClose()">
        <expand-title>Title</expand-title>
        <p>Lorem ipsum dolor sit amet</p>
    </pa-expand>
    `
})
class Test2Component {
    open = false;
    close = false;

    onOpen() {
        this.open = true;
    }
    onClose() {
        this.close = true;
    }
}

@Component({
    selector: 'test',
    template: `
    <pa-expand [openOnInit]="true">
        <expand-title>Title</expand-title>
        <p>Lorem ipsum dolor sit amet</p>
    </pa-expand>
    `
})
class Test3Component {
}

describe('BadgeComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                CommonModule,
                BrowserAnimationsModule,
                TooltipModule,
            ],
            declarations: [
                ExpandComponent,
                ExpandTitleDirective,
                ExpandDescriptionDirective,
                Test1Component,
                Test2Component,
                Test3Component,
            ],
        }).compileComponents();
    }));
    it('should render title and description', (done) => {
        const fixture = TestBed.createComponent(Test1Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-expand-title').textContent).toContain('Title');
        expect(compiled.querySelector('.pa-expand-description').textContent).toContain('with a description');
        done();
    });
    it('should display body when header is clicked', fakeAsync(() => {
        const fixture = TestBed.createComponent(Test1Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.pa-expand-body-wrapper').textContent).not.toContain('Lorem');
        fixture.debugElement.query(By.css('button')).nativeElement.click();
        tick();
        fixture.detectChanges();
        expect(compiled.querySelector('.pa-expand-body-wrapper').textContent).toContain('Lorem');
    }));
    it('should emit on open', fakeAsync(() => {
        const fixture = TestBed.createComponent(Test2Component);
        fixture.detectChanges();
        fixture.debugElement.query(By.css('button')).nativeElement.click();
        tick();
        expect(fixture.componentInstance.open).toBe(true);
    }));
    it('should emit on close', fakeAsync(() => {
        const fixture = TestBed.createComponent(Test2Component);
        fixture.detectChanges();
        fixture.debugElement.query(By.css('button')).nativeElement.click();
        tick();
        fixture.debugElement.query(By.css('button')).nativeElement.click();
        tick();
        expect(fixture.componentInstance.close).toBe(true);
    }));
    it('should be able to open on init', fakeAsync(() => {
        const fixture = TestBed.createComponent(Test3Component);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        tick(500);
        fixture.detectChanges();
        expect(compiled.querySelector('.pa-expand-body-wrapper').textContent).toContain('Lorem');
    }));
});
