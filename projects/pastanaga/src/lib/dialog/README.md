# Dialog component and service

## Basic usage

The component to display a dialog must implement `IDialog` interface and have a `<pa-dialog>` component in its template.

```typescript
import { Component, ViewChild } from '@angular/core';
import { DialogComponent, IDialog } from 'pastanaga-angular';

@Component({
    selector: 'app-some-dialog',
    template: `<pa-dialog>Some content</pa-dialog>`
})
export class SomeDialogComponent implements IDialog {
    @ViewChild(DialogComponent, { static: true }) dialog: DialogComponent | undefined;
}
```

It can be displayed using `DialogService`:
```typescript
import { DialogService } from 'pastanaga-angular';

export class CallerComponent {
    constructor(
        private dialogService: DialogService,
    ) {}

    open() {
        this.dialogService.openDialog(SomeDialogComponent);
    }
}
``` 

## Dialog content

The entire component template must be wrapped in a `<pa-dialog></pa-dialog>` tag.

It might contain the following directives:

- `pa-dialog-title`, displayed in the header. Example:

```html
<pa-dialog-title>Add more <strong>members</strong></pa-dialog-title>
```

- `pa-dialog-image`, displayed as a banner. Example:

```html
<pa-dialog-image><img src="assets/ninja.svg"></pa-dialog-image>
```

- `pa-dialog-footer`, containing footer actions. Example:

```html
<pa-dialog-footer *ngIf="step === 0">
    <pa-button (click)="back()" color="secondary">Back</pa-button>
    <pa-button (click)="edit()">Edit</pa-button>
</pa-dialog-footer>
```

None of those directives are mandatory.

The rest of the template will be displayed in the dialog body section.

## Configuration

`openDialog` method takes two parameters: the component implementing `IDialog` and an optional configuration object (`DialogConfig`).
By default, the dialog is blocking and has a close button. It also have a grey band color by default. 
The configuration object allows to change these default behaviors.

### Blocking / non-blocking

Dialog is blocking by default, meaning it won't close when a user clicks outside the dialog.
To make it non blocking, pass the following:

```typescript
export class CallerComponent {
    open() {
        this.dialogService.openDialog(SomeDialogComponent, new DialogCongig({blocking: false}));
    }
}
```

### Band color

Configuration object allows to define band color:

```typescript
export class CallerComponent {
    open() {
        this.dialogService.openDialog(SomeDialogComponent, new DialogCongig({bandColor: '#57C1D6'}));
    }
}
```

You can also add a class in your dialog template:
```html
<pa-dialog class="change-password-dialog">
...
</pa-dialog>
```
and override band color directly in your stylesheet:
```css
.change-password-dialog .pa-dialog-band,
.change-password-dialog .pa-dialog-band-presentation {
    background: #97b67e;
}
```

### Close button

By default, the dialog has a close button in the header. It is possible to remove it by passing the following:
```typescript
export class CallerComponent {
    open() {
        this.dialogService.openDialog(SomeDialogComponent, new DialogCongig({withCloseButton: false}));
    }
}
```

When setting properties `blocking` to `true` and `withCloseButton` to `false`, it will be possible to close the dialog only programmatically.

## Dynamic configuration
In the previous chapter, we saw how `DialogCongig` allowed to configure the dialog.
These configuration properties are meant to be set once for all, that's why we can set them up when opening the dialog.
But some behaviors may require to change dynamically depending the dialog state. 

As we explained in the beginning, a dialog must implement `IDialog` interface and have a `DialogComponent` component in its template.
`IDialog` interface require our component to have a `dialog` property, usually instantiated using a `@ViewChild` annotation.
This `dialog` property can be used to dynamically configure the dialog.


### Band size
By default, band is big (150px height) and will be reduced when scrolling down.
But it can be kept small programmatically using:

```typescript
export class SomeDialogComponent implements IDialog {
    updateDialogState() {
        this.dialog.forceSmallImage = true;
    }
}
```

### Presentation mode
By default, dialog has a medium size (540 x 660px) centered in the screen. But it's not always enough.
Presentation mode allows to have bigger dialog (1200 x 720):   

```typescript
export class SomeDialogComponent implements IDialog {
    updateDialogState() {
        this.dialog.presentationMode = true;
    }
}
```

### Back button
Your dialog may have several screens. Dialog's header template contains a back button hidden by default which can be shown using:

```typescript
export class SomeDialogComponent implements IDialog {
    updateDialogState() {
        this.dialog.displayBackButton = true;
    }
}
```

### Step indicators
Dialog comes with the ability to display step indicators in the footer.
To display them, you need to update properties `totalSteps` and `activeStep` of `dialog`:
```typescript
export class SomeDialogComponent implements IDialog {
    updateDialogState() {
        // two have no step indicator on a screen, just set totalSteps back to 0
        this.dialog.totalSteps = this.step > 0 ? 2 : 0;
        this.dialog.activeStep = this.step - 1;
    }
}
``` 

### Global configuration
It is also possible to dynamically update any property set in the configuration.

- One by one:
```typescript
export class SomeDialogComponent implements IDialog, OnInit {
    ngOnInit() {
        this.dialog.config.withCloseButton = false;    
    }
}

``` 

- Or all at once:
```typescript
export class SomeDialogComponent implements IDialog, OnInit {
    ngOnInit() {
        this.dialog.config = new DialogConfig({withCloseButton: false, blocking: false});
    }
}
```

## Closing behavior

### Collect data returned by the dialog
The `openDialog` method returns a `DialogRef` object which provides an `onClose` observable.
Subscribing to this observable allows to collect data returned by the dialog when closing.
```typescript
export class CallerComponent {
    open() {
        this.dialogService.openDialog(SomeDialogComponent).onClose.subscribe(data => console.log('Dialog closed', data));
    }
}
```
Default close button and clicking outside the dialog are simply returning `false`. 

### Close the dialog programmatically
The dialog can be closed programmatically through its `dialog` property:
```typescript
export class SomeDialogComponent implements IDialog {
    closeDialog() {
        this.dialog.close({whatever: true, answer: 42});
    }
}
```

## Pass data to the dialog
Sometimes, the caller of a dialog needs to pass some data to it. To do so, simply add them to the DialogRef when opening the dialog:
```typescript
export class CallerComponent {
    open() {
        const dialogRef = this.dialogService.openDialog(SomeDialogComponent);
        dialogRef['document'] = myDoc;
        dialogRef['user'] = myUser;
    }
}
```
The dialog can access the DialogRef as well, for example in `ngOnInit`:
```typescript
export class SomeDialogComponent implements IDialog {
    ngOnInit() {
        this.document = this.dialog.ref['document'];
        this.user = this.dialog.ref['user'];
    }
}
```

## Key binding
By default, on a dialog with close button, ESC key will close the dialog.

If we need to bind the ENTER key to something, we can use the `onEnter` property of our `DialogRef`:

```typescript
export class SomeDialogComponent implements IDialog {
    ngOnInit() {
        this.dialog.onEnter = this.edit.bind(this);
    }

    edit() {
        this.dialog.close({whatever: true, answer: 42});
    }
}
```

