# Pastanaga Angular Components

[![Build Status](https://travis-ci.com/plone/pastanaga-angular.svg?branch=master)](https://travis-ci.com/plone/pastanaga-angular)

https://plone.github.io/pastanaga-angular/dist/pastanaga-app/

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

**BEFORE ANGULAR 8**: The file must be in the main app src folder and must be declared in `angular.json`:

```
"stylePreprocessorOptions": {
    "includePaths": [
        "src/pastanaga-overrides.scss"
    ]
},
```

## Components

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
