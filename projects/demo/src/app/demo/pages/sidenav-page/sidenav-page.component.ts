import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './sidenav-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavPageComponent {
    menu = [
        {
            title: 'Section 1',
            pages: [
                { view: 'view1', title: 'section-title-1' },
                { view: 'view2', title: 'section-title-2' },
            ],
        },
        {
            title: 'Section 2',
            pages: [
                { view: 'view1', title: 'section-title-1' },
                { view: 'view2', title: 'section-title-2' },
            ],
        },
    ];
    customHeaderExample = `<pa-side-nav [mode]="mode"
             [visible]="isMenuVisible"
             (close)="toggleSideNav()">
    <pa-side-nav-header>
        <img src="assets/logo.svg" alt="Logo">
        <h3>Some title</h3>
        <pa-button *ngIf="mode !== 'desktop'"
                   class="pa-close-side-nav-button"
                   icon="cross"
                   aspect="basic"
                   (click)="toggleSideNav(false)"></pa-button>
    </pa-side-nav-header>
</pa-side-nav>`;

    codeExample = `<pa-side-nav [mode]="mode"
             [visible]="isMenuVisible"
             (close)="toggleSideNav()">
    <pa-side-nav-content>
        <section *ngFor="let section of visibleMenu" class="section">
            <ul>
                <pa-side-nav-item [label]="section.title" header></pa-side-nav-item>
                <pa-side-nav-item *ngFor="let page of section.pages"
                                  [active]="page.view === activeItem"
                                  [label]="page.title"
                                  [routerLink]="'/' + page.view"
                                  (click)="onSelectedItem()">
                </pa-side-nav-item>
            </ul>
        </section>
    </pa-side-nav-content>
</pa-side-nav>`;
}
