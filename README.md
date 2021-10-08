# Pastanaga Angular Components

[![Build Status](https://travis-ci.com/plone/pastanaga-angular.svg?branch=master)](https://travis-ci.com/plone/pastanaga-angular)

## Pastanaga 2.0 is now released

For now, it's still living on its own branch: [origin/2.x](https://github.com/plone/pastanaga-angular/tree/2.x)

Demo v1: https://plone.github.io/pastanaga-angular/v1/

Demo v2: https://plone.github.io/pastanaga-angular/v2/

## Pastanaga 1.x

Provides the Pastanaga elements as Angular components.

See `src/app/app.component.ts` and `src/app/app.component.html` for usage examples.

## Theming

Declare the assets in `angular.json`:

```
    "assets": [
        "src/favicon.ico",
        "src/assets",
        {
            "glob": "**/*",
            "input": "./node_modules/@guillotinaweb/pastanaga-angular/lib/assets", // when using NPM package
            "input": "./src/develop/pastanaga-angular/projects/pastanaga/src/assets", // when using mrs-developer
            "output": "assets"
        }
```

Import the common reset in main app style:

```
@import "~@guillotinaweb/pastanaga-angular/lib/styles/common-reset"; // when using NPM package
@import './develop/pastanaga-angular/projects/pastanaga/src/lib/styles/common-reset'; // when using mrs-developer
```

If we want the default fonts, we need to import them like this:

```
@import "~@guillotinaweb/pastanaga-angular/lib/styles/fonts"; // when using NPM package
@import "./develop/pastanaga-angular/projects/pastanaga/src/lib/styles/fonts"; // when using mrs-developer
```

The Pastanaga CSS can be overriden in the `src/pastanaga-overrides.scss` file. Example:

```
$button-primary-color: $my-blue;
$button-primary-active-color: $my-blue-dark;
$button-primary-active-background: $my-blue-light;
```

(See `_variables.scss` to get the full list)

## Components

### Icons

In order to be able to use the `<pa-icon>` component, we must call the `forRoot()` method from AngularSvgIconModule:

```typescript
@NgModule({
    imports: [
        AngularSvgIconModule.forRoot(),
        ...
    ]
})
```

### Sidebar

Sidebar component is a container positioned on the left or on the right of the screen.
As it's just a container, any component added inside will have to be styled with a background color (supporting alpha as sidebar is fully transparent by default)

You can have as many sidebars as you want in your application as soon as they all have an unique name.

Sidebar can be closed or opened, but also folded or unfolded.

By default, sidebar is 280px width but this size can be overwritten using `$sidebar-width` variable.

When a sidebar is opened, a backdrop is displayed by default. `noBackdrop` attribute allows to have a sidebar opened without backdrop.

When a sidebar is folded, it's possible to unfold it on hover with `unfoldOnHover` attribute.

A sidebar can be locked in open position using `lockedOpen` attribute.

Whenever `open` and `folded` states are changing, the corresponding events `openedChanged` and `foldedChanged` are sent.

## i18n

Pastanaga allows to manage translation.

Each supported language is a JSON file (or a TypeScript exporting a dictionary) where translated strings are handled in nested dictionaries:

```json
{
    "calendar": {
        "next": "Next",
        "previous": "Previous",
        "select-start-date-legend": "Select start date",
        "select-end-date-legend": "Select end date",
        "no-end-button": "No end date",
        "days": {
            "monday": "M",
            "tuesday": "T",
            "wednesday": "W",
            "thursday": "T",
            "friday": "F",
            "saturday": "S",
            "sunday": "S"
        }
    },
    "common": {
        "close": "Close",
        "loading": "Loading…"
    }
}
```

Translations must be provided in the main app module:

```typescript
import * as en from '../assets/i18n/en.json';
import * as la from '../assets/i18n/la.json';

@NgModule({
    ...
    providers: [
        {provide: 'TRANSLATIONS', useValue: {
            'en_US': {...en['default']},
            'latin': {...la['default']},
        }},
```

The current language is expected to be provided too, it can be hard-coded:

```typescript
{provide: 'LANG', useValue: 'en_US'},
```

or computed, depending on the needs.

Translations can be applied using a directive:

```html
<span translate>demo-page.title</span>
```

or a pipe:

```html
{{ "demo-page.title" | translate }}
```

Translations support parameters

```json
{ "demo-page": { "score": "{{points}} points of {{total}}" } }
```

```html
<span translate [translateParams]="{points: 10, total: 25}"
    >demo-page.score</span
>
```

or

```html
{{ "demo-page.score" | translate:{points: 10, total: 25} }}
```

It can also be used as a service:

```typescript
import { TranslatePipe } from 'pastanaga-angular';
...

    constructor(
        private translate: TranslatePipe
    ) {}

    someMethod() {
        this.message = this.translate.transform('demo-page.title');
        this.scoreMessage = this.translate.transform('demo-page.score', {points: 10, total: 25});
}
```

Translations can be overriden. For instance, several applications might use the same internal library which comes with its translation, but in some cases, some of those translations must be different in the two apps.

The different JSON files can be merged in a single one by using `addTranslations`. It takes a list of translations ordered by priority (the last ones override the first ones):

```typescript
import { TranslateModule, I18N_EN, LANG } from 'pastanaga-angular';
...
    imports: [
        TranslateModule.addTranslations([
            { en_US: I18N_EN },
            { en_US: app1Specific  },
            { latin: MY_I18N_LATIN },
        ]),
    ],
    providers: [
        { provide: LANG, useValue: 'en_US' },
    ]
```

Note: to support JSON import, we need to add `"resolveJsonModule": true` in the tsconfig.json `compilerOptions`. Resulting objects will contain their data in a `default` entry, so we must write `{...en['default']}`.

## Dialog component

See [dialog documentation](./src/develop/pastanaga-angular/projects/pastanaga/src/lib/dialog/README.md)
