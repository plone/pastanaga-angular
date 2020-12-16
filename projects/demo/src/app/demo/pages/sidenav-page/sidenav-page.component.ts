import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './sidenav-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavPageComponent {
    selectedMode = 'desktop';
    isMenuVisible = true;
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
    codeExample = `<pa-side-nav [mode]="mode"
             [visible]="isMenuVisible"
             (close)="toggleSideNav()">
    <pa-side-nav-header>
        <img src="asssets/logo.svg" alt="Logo">
    </pa-side-nav-header>

    <pa-side-nav-content class="section" *ngFor="let section of menu">
        <pa-side-nav-item [label]="section.title" header></pa-side-nav-item>
        <pa-side-nav-item *ngFor="let page of section.pages"
                          [active]="page.view === activeItem"
                          [label]="page.title"">
        </pa-side-nav-item>
    </pa-side-nav-content>
     <pa-side-nav-footer>
        <pa-button kind="primary" aspect="basic">
            Value
        </pa-button>
    </pa-side-nav-footer>
</pa-side-nav>`;
}
