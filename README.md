# Pastanaga Angular Components

[![Build Status](https://travis-ci.com/plone/pastanaga-angular.svg?branch=master)](https://travis-ci.com/plone/pastanaga-angular)

Provides Pastanaga elements as Angular components.

See https://plone.github.io/pastanaga-angular for usage example and developer guide.

## Migration guide version 1.x to version 2.x
### Module names
In Pastanaga 2+, we prefix all modules with `Pa`: `ButtonModule` becomes `PaButtonModule`.

### Components common properties
Pastanaga now contains some useful enums for properties configuring several components:
- `Kind`: primary | secondary | destructive
- `Size`: tee-shirt size going from `xxsmall` to `xxlarge`. Not all sizes are available for all components

### Buttons
We changed the way to configure buttons:
- `color` is now managed by `kind` property
- `size` is now expecting one of the values of `Size` enum
- `border` property is replaced by `aspect` which can be `solid` | `regular` | `basic`

See https://plone.github.io/pastanaga-angular/@@button for full documentation.  

### Form elements
We changed form elements hierarchy so now they are all in the same place under `controls` folder. 
They still belong to two distinct modules (`PaTextFieldModule` and `PaTogglesModule`).

All controls are sharing some properties:
- `BaseControl` is the base class containing common properties (like `id`, `name`, `disabled`…) for all form elements components
- `BaseTextField` is extending `BaseControl` and contains common properties for all text field elements (like `placeholder`, `value`, `readonly`,…)

## Theming

### Core style and assets
In your application project, declare Pastanaga assets in `angular.json`:
- when using npm package:
```json
"assets": [
    "src/favicon.ico",
    "src/assets",
    {
        "glob": "**/*",
        "input": "./node_modules/@guillotinaweb/pastanaga-angular/assets",
        "output": "assets"
    }
]
```
- when using mrs-developer:
```json
"assets": [
    "src/favicon.ico",
    "src/assets",
    {
        "glob": "**/*",
        "input": "./src/develop/pastanaga-angular/projects/pastanaga-angular/assets",
        "output": "assets"
    }
]
```

Import Pastanaga core style in main app style (usually `src/styles.scss`):
- when using npm package:
```scss
@import "~@guillotinaweb/pastanaga-angular/lib/styles/core";
```
- when using mrs-developer
```scss
@import "./develop/pastanaga-angular/projects/pastanaga-angular/lib/styles/core";
```

### Fonts

To use Pastanaga fonts in your application, declare font-path and import fonts in main app style:

- when using mrs-developer
```scss
$font-path: '../../../assets/fonts';
@import "./develop/pastanaga-angular/projects/pastanaga-angular/lib/styles/fonts";
```

**Warning**: with angular 10, scss variable is now relative to the place it is called (seems weird so might change in the future). 


### Overriding theme

Any project using pastanaga-angular must have a file `pastanaga-overrides.scss` in their `src` folder.
This file can be empty if you want to use Pastanaga theme, but you can set up your own theme by overriding pastanaga variables there.

Pastanaga theme is defined in `src/lib/styles/theme` folder. Any variable with `!default` suffix can be overwritten.

Pastanaga theme is built around token. For example, `_palette.scss` contains all the colors used in Pastanaga with general token names (*e.g.* `$color-neutral-primary-default`, `$color-accent-primary-darker`).
See the full list in https://plone.github.io/pastanaga-angular/@@palette.
Then, some components have a second layer of tokens, for example buttons have a list of token for each aspect and state (*e.g.* `$color-text-button-primary-solid`, `$color-background-button-primary-solid`,…).
So you can have your own theme by overwriting the whole color palette or just by changing some aspects of some components.  


