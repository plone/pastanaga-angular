import { Component } from '@angular/core';

@Component({
    templateUrl: 'table-page.component.html',
})
export class TablePageComponent {
    code = `
<pa-table columns="repeat(6, 1fr)">
    <pa-table-header>
        <pa-table-cell header>Name</pa-table-cell>
        <pa-table-cell header>Tags</pa-table-cell>
        <pa-table-cell header>Shared with</pa-table-cell>
        <pa-table-cell header>Last updated</pa-table-cell>
        <pa-table-cell header>Size</pa-table-cell>
        <pa-table-cell-menu header>
            <pa-button icon="ellipsis-vertical" size="xsmall" (click)="openMenu($event)">Menu button</pa-button>
        </pa-table-cell-menu>
    </pa-table-header>
    <pa-table-row-header>Today</pa-table-row-header>
    <pa-table-row (click)="clickRow()" clickable>
        <pa-table-cell header>My_text_file.txt</pa-table-cell>
        <pa-table-cell>Bonjour, Occitania, França, Jenesepas</pa-table-cell>
        <pa-table-cell>(AC) | (GD)</pa-table-cell>
        <pa-table-cell>Today, 9:45 AM</pa-table-cell>
        <pa-table-cell>100 MB</pa-table-cell>
        <pa-table-cell-menu>
            <pa-button icon="ellipsis-vertical" size="xsmall" (click)="openMenu($event)">Menu button</pa-button>
        </pa-table-cell-menu>
    </pa-table-row>
    <pa-table-row>
        <pa-table-cell header>contract.pdf</pa-table-cell>
        <pa-table-cell>Occitania</pa-table-cell>
        <pa-table-cell>(AC)</pa-table-cell>
        <pa-table-cell>1/2/2010</pa-table-cell>
        <pa-table-cell>15 KB</pa-table-cell>
        <pa-table-cell-menu>
            <pa-button icon="ellipsis-vertical" size="xsmall" (click)="openMenu($event)">Menu button</pa-button>
        </pa-table-cell-menu>
    </pa-table-row>
    <pa-table-row>
        <pa-table-cell header>pelican-svgrepo-com.svg</pa-table-cell>
        <pa-table-cell></pa-table-cell>
        <pa-table-cell>(EB)</pa-table-cell>
        <pa-table-cell>12/31/2007</pa-table-cell>
        <pa-table-cell>100 bytes</pa-table-cell>
        <pa-table-cell-menu>
            <pa-button icon="ellipsis-vertical" size="xsmall" (click)="openMenu($event)">Menu button</pa-button>
        </pa-table-cell-menu>
    </pa-table-row>
    <pa-table-row-header>Yesterday</pa-table-row-header>
    <pa-table-row>
        <pa-table-cell header>Channel #general - 2020-01-23 (UTC).htm</pa-table-cell>
        <pa-table-cell></pa-table-cell>
        <pa-table-cell>(EB) | (MP) (NI) (AC) (GD) (+3)</pa-table-cell>
        <pa-table-cell>Yesterday, 12:56 PM</pa-table-cell>
        <pa-table-cell>234.54 TB</pa-table-cell>
        <pa-table-cell-menu>
            <pa-button icon="ellipsis-vertical" size="xsmall" (click)="openMenu($event)">Menu button</pa-button>
        </pa-table-cell-menu>
    </pa-table-row>
    <pa-table-row>
        <pa-table-cell header>Channel #big-important-things - 2020-01-23 (UTC).htm</pa-table-cell>
        <pa-table-cell></pa-table-cell>
        <pa-table-cell>(EB)</pa-table-cell>
        <pa-table-cell>4/10/2020</pa-table-cell>
        <pa-table-cell>24.56 MB</pa-table-cell>
        <pa-table-cell-menu>
            <pa-button icon="ellipsis-vertical" size="xsmall" (click)="openMenu($event)">Menu button</pa-button>
        </pa-table-cell-menu>
    </pa-table-row>
    <pa-table-row>
        <pa-table-cell header>document.pdf</pa-table-cell>
        <pa-table-cell>[França X]</pa-table-cell>
        <pa-table-cell>(EB)</pa-table-cell>
        <pa-table-cell>11/11/2011</pa-table-cell>
        <pa-table-cell>3.56 MB</pa-table-cell>
        <pa-table-cell-menu>
            <pa-button icon="ellipsis-vertical" size="xsmall" (click)="openMenu($event)">Menu button</pa-button>
        </pa-table-cell-menu>
    </pa-table-row>
</pa-table>`;

    rowSelected = false;

    clickRow() {
        console.log('Row has been clicked');
        this.rowSelected = !this.rowSelected;
    }

    openMenu($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        console.log('Menu button has been clicked');
    }
}
