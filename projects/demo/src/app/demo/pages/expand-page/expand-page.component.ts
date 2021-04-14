import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pa-demo-expand-page',
    templateUrl: './expand-page.component.html',
    styleUrls: ['./expand-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandPageComponent {
    codeSample = `<pa-expand>
    <pa-expand-header>Section 1</pa-expand-header>
    <pa-expand-body>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>
    </pa-expand-body>
</pa-expand>
<pa-expand>
    <pa-expand-header>
        Section 2
    </pa-expand-header>
    <pa-expand-header-side-block>
        <pa-button size="small"
                   icon="plus"
                   aspect="basic">Add</pa-button>
    </pa-expand-header-side-block>
    <pa-expand-body>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </pa-expand-body>
</pa-expand>`;
}
