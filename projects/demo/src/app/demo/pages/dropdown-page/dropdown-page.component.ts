import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { PopupComponent } from '@guillotinaweb/pastanaga-angular';

@Component({
  selector: 'pa-demo-menu-page',
  templateUrl: './dropdown-page.component.html',
  styles: [
    `
      pa-demo-examples {
        display: flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DropdownPageComponent {
  codeExample = `<pa-button icon="more" size="small"
           [paPopup]="contextualMenu"></pa-button>

<pa-dropdown #contextualMenu>
    <pa-option-header>Menu list header</pa-option-header>
    <pa-option (selectOption)="onSelect($event)">Menu list item 1</pa-option>
    <pa-option (selectOption)="onSelect($event)">Menu list item 1</pa-option>
    <pa-option (selectOption)="onSelect($event)">Menu list item 3</pa-option>
    <pa-separator></pa-separator>
    <pa-option destructive dontCloseOnSelect (selectOption)="onSelect($event)">Menu item destructive</pa-option>
</pa-dropdown>`;

  multiLevelTemplate = `<pa-button [paPopup]="level1" sameWidth>
    <div style="display: flex; align-items: center">
        Multi-level dropdown
        <pa-icon name="chevron-down"></pa-icon>
    </div>
</pa-button>

<pa-dropdown #level1 [companionElement]="level2Element?.nativeElement">
    <pa-option icon="chevron-right"
               iconOnRight
               dontCloseOnSelect
               alignPopupOnLeft
               [paPopup]="level2"
               [popupVerticalOffset]="-40"
               [selected]="level1Open === 'jedi'"
               (selectOption)="onLevel1Selection('jedi')">Jedi</pa-option>
    <pa-option icon="chevron-right"
               iconOnRight
               dontCloseOnSelect
               alignPopupOnLeft
               [paPopup]="level2"
               [popupVerticalOffset]="-40"
               [selected]="level1Open === 'rebels'"
               (selectOption)="onLevel1Selection('rebels')">Rebels</pa-option>
    <pa-option icon="chevron-right"
               iconOnRight
               dontCloseOnSelect
               alignPopupOnLeft
               [paPopup]="level2"
               [popupVerticalOffset]="-40"
               [selected]="level1Open === 'sith'"
               (selectOption)="onLevel1Selection('sith')">Sith</pa-option>
</pa-dropdown>

<pa-dropdown #level2 keepOthersOpen>
    <pa-option dontCloseOnSelect *ngFor="let option of level2Options">{{option.label}}</pa-option>
</pa-dropdown>`;
  multiLevelScript = `
@ViewChild('level2', {read: ElementRef}) level2Element?: ElementRef;
@ViewChild('level2') level2Popup?: PopupComponent;
level1Open = '';
level2Options: {label: string}[] = [];

onLevel1Selection(selection: string) {
    this.level1Open = selection;
    this.level2Popup?.close()
    switch (selection) {
        case 'jedi':
            this.level2Options = [{label: 'Yoda'}, {label: 'Obiwan Kenobi'}, {label: 'Luke Skywalker'}];
            break;
        case 'rebels':
            this.level2Options = [{label: 'Leia Organa'}, {label: 'Han Solo'}, {label: 'Admiral Ackbar'}];
            break;
        case 'sith':
            this.level2Options = [{label: 'Sheev Palpatine'}, {label: 'Darth Vador'}, {label: 'Darth Maul'}];
            break;
        default:
            this.level2Options = [];
    }
}`;

  checkboxExample = `<pa-dropdown>
    <pa-option *ngFor="let option of level2Options"
               dontCloseOnSelect
               (selectOption)="updateCheckbox(option, $event)">
        <pa-checkbox [(value)]="option.checked">{{option.label}}</pa-checkbox>
    </pa-option>
</pa-dropdown>
`;
  checkboxCode = `updateCheckbox(option: { label: string; checked?: boolean }, event: MouseEvent | KeyboardEvent) {
    if ((event.target as HTMLElement).tagName === 'LI') {
        option.checked = !option.checked;
    }
}`;

  @ViewChild('level2', { read: ElementRef }) level2Element?: ElementRef;
  @ViewChild('level02', { read: ElementRef }) level02Element?: ElementRef;
  @ViewChild('level2') level2Popup?: PopupComponent;
  @ViewChild('level02') level02Popup?: PopupComponent;
  level1Open = '';
  level2Options: { label: string; checked?: boolean }[] = [];

  onSelect($event: MouseEvent | KeyboardEvent) {
    console.log(`Selected menu:`, $event);
  }

  onLevel1Selection(selection: string) {
    this.level1Open = selection;
    this.level2Popup?.close();
    this.updateLevel2Options(selection);
  }

  onLevel01Selection(selection: string) {
    this.level1Open = selection;
    this.level02Popup?.close();
    this.updateLevel2Options(selection);
  }

  updateCheckbox(option: { label: string; checked?: boolean }, event: MouseEvent | KeyboardEvent) {
    if ((event.target as HTMLElement).tagName === 'LI') {
      option.checked = !option.checked;
    }
  }

  private updateLevel2Options(selection: string) {
    switch (selection) {
      case 'jedi':
        this.level2Options = [
          { label: 'Yoda (Legendary Jedi Master)' },
          { label: 'Obiwan Kenobi (Legendary Jedi Master)' },
          { label: 'Luke Skywalker (Promising padawan)' },
        ];
        break;
      case 'rebels':
        this.level2Options = [{ label: 'Leia Organa' }, { label: 'Han Solo' }, { label: 'Admiral Ackbar' }];
        break;
      case 'sith':
        this.level2Options = [{ label: 'Sheev Palpatine' }, { label: 'Darth Vador' }, { label: 'Darth Maul' }];
        break;
      default:
        this.level2Options = [];
    }
  }
}
