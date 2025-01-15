import { Component } from '@angular/core';

@Component({
  templateUrl: 'table-page.component.html',
  standalone: false,
})
export class TablePageComponent {
  isDescending = false;
  sorted = false;
  data: {
    id: string;
    name: string;
    tags: string;
    shared: string;
    lastUpdate: string;
    size: string;
  }[] = [
    {
      id: '1',
      name: 'My_text_file.txt',
      tags: 'Bonjour, Occitania, França, Jenesepas',
      shared: '(AC) | (GD)',
      lastUpdate: '11/11/2011',
      size: '100 MB',
    },
    {
      id: '2',
      name: 'contract.pdf',
      tags: 'Occitania',
      shared: '(AC)',
      lastUpdate: '4/10/2020',
      size: '15 KB',
    },
    {
      id: '3',
      name: 'pelican-svgrepo-com.svg',
      tags: '',
      shared: '(EB)',
      lastUpdate: '12/31/2007',
      size: '100 bytes',
    },
    {
      id: '4',
      name: 'Channel #general - 2020-01-23 (UTC).htm',
      tags: '',
      shared: '(EB) | (MP) (NI) (AC) (GD) (+3)',
      lastUpdate: '4/10/2020',
      size: '234.54 TB',
    },
    {
      id: '5',
      name: 'Channel #big-important-things - 2020-01-23 (UTC).htm',
      tags: '',
      shared: '(EB)',
      lastUpdate: 'Today, 9:45 AM',
      size: '24.56 MB',
    },
    {
      id: '6',
      name: 'document.pdf',
      tags: '[França X]',
      shared: '(EB)',
      lastUpdate: 'Yesterday, 12:56 PM',
      size: '3.56 MB',
    },
  ];
  subHeader = 'Yesterday';
  code = `
<pa-table
      columns="minmax(240px, 8fr) minmax(210px, 7fr) minmax(210px, 7fr) minmax(156px, 5fr) minmax(102px, 3fr) 60px">
      <pa-table-header>
        <pa-table-sortable-header-cell
          [active]="sorted"
          [isDescending]="isDescending"
          (sort)="sortBy()">
          Name
        </pa-table-sortable-header-cell>
        <pa-table-cell
          header
          borderRight>
          Tags
        </pa-table-cell>
        <pa-table-cell header>Shared with</pa-table-cell>
        <pa-table-cell header>Last updated</pa-table-cell>
        <pa-table-cell header>Size</pa-table-cell>
        <pa-table-cell-menu header>
          <pa-button
            icon="info"
            (click)="openMenu($event)"></pa-button>
        </pa-table-cell-menu>
      </pa-table-header>
      @for (item of [data[0], data[1], data[2]]; track item.id) {
        <pa-table-row
          [class.pa-selected]="rowSelected === item.id"
          (click)="clickRow(item.id)"
          clickable>
          <pa-table-cell header>{{ item.name }}</pa-table-cell>
          <pa-table-cell borderRight>{{ item.tags }}</pa-table-cell>
          <pa-table-cell>{{ item.shared }}</pa-table-cell>
          <pa-table-cell>{{ item.lastUpdate }}</pa-table-cell>
          <pa-table-cell>{{ item.size }}</pa-table-cell>
          <pa-table-cell-menu>
            <pa-button
              icon="more-horizontal"
              size="small"
              (click)="openMenu($event)">
              Menu button
            </pa-button>
          </pa-table-cell-menu>
        </pa-table-row>
      }
      <pa-table-row-header>{{ subHeader }}</pa-table-row-header>
      @for (item of [data[3], data[4], data[5]]; track item.id) {
        <pa-table-row
          [class.pa-selected]="rowSelected === item.id"
          (click)="clickRow(item.id)"
          clickable>
          <pa-table-cell
            header
            noWrap>
            <span class="pa-ellipsis">{{ item.name }}</span>
          </pa-table-cell>
          <pa-table-cell borderRight>{{ item.tags }}</pa-table-cell>
          <pa-table-cell>{{ item.shared }}</pa-table-cell>
          <pa-table-cell>{{ item.lastUpdate }}</pa-table-cell>
          <pa-table-cell>{{ item.size }}</pa-table-cell>
          <pa-table-cell-menu>
            <pa-button
              icon="more-horizontal"
              size="small"
              (click)="openMenu($event)">
              Menu button
            </pa-button>
          </pa-table-cell-menu>
        </pa-table-row>
      }
    </pa-table>`;

  rowSelected?: string;

  clickRow(id: string | number) {
    console.log('Row has been clicked');
    this.rowSelected = id === this.rowSelected ? '' : `${id}`;
  }

  openMenu($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('Menu button has been clicked');
  }

  sortBy() {
    this.sorted = true;
    this.isDescending = !this.isDescending;
    if (this.isDescending) {
      this.subHeader = 'Yesterday';
      this.data.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()));
    } else {
      this.subHeader = 'Today';
      this.data.sort((a, b) => b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleLowerCase()));
    }
  }
}
