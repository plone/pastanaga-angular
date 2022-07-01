# Pastanaga Angular Components

[![Build Status](https://github.com/plone/pastanaga-angular/workflows/CI/badge.svg)](https://github.com/plone/pastanaga-angular/actions?query=workflow%3ACI)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


Provides Pastanaga elements as Angular components.

See https://plone.github.io/pastanaga-angular/ for usage example and developer guide.

## Table of content
- [Setup](#setup)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Theming](#theming)
  - [Fonts](#fonts)
  - [Overriding theme](#overriding-theme)
- [Migration guide version 1.x to version 2.x](#migration-guide-version-1x-to-version-2x)

## Setup

### Installation
You can install Pastanaga-angular using its npm package:
- using npm:
```shell
npm install @guillotinaweb/pastanaga-angular
```
- using yarn:
```shell
yarn add @guillotinaweb/pastanaga-angular
```

But if you want to build your own demo application using pastanaga demo components, you need to install it using [mrs-developer](https://www.npmjs.com/package/mrs-developer):
- first install `mrs-developer` if you don't already have it:
```shell
yarn add mrs-developer 
```
- then add pastanaga-angular to your `mrs.developer.json` configuration (you can choose a specific tag as below, or a branch):
```json
{
  "pastanaga-angular": {
    "url": "git@github.com:plone/pastanaga-angular.git",
    "https": "https://github.com/plone/pastanaga-angular.git",
    "path": "/projects/pastanaga-angular/src",
    "package": "@guillotinaweb/pastanaga-angular",
    "tag": "2.52.1"
  }
}
```
- and launch the installation by running `missdev`:
```shell
missdev
```

**Note:**
By default, `missdev` will install the dependencies in `src/dev` folder. 
If you're in a workspace with a mono-repository structure (using [nx](https://nx.dev/) for instance), then you probably want to install pastanaga-angular in your `libs` folder.
You can do so by using missdev `--output` option:
```shell
missdev --output=../libs
```

### Configuration
#### Style preprocessing
Pastanaga-angular requires two files (`pastanaga-core-overrides.scss` and `pastanaga-component-overrides.scss`) to be in the `src` folder of any project using it.
In order for those files to be found during the compilation, you have to add `src` folder in style preprocessing options of `angular.json`:
```json
    "stylePreprocessorOptions": {
        "includePaths": [
            "src"
        ]
    }
```

#### Assets
If you want to use Pastanaga assets like fonts and glyphs sprite, declare them in `angular.json`:
- when using npm package:
```json
{
  "assets": [
    "src/favicon.ico",
    "src/assets",
    {
      "glob": "**/*",
      "input": "./node_modules/@guillotinaweb/pastanaga-angular/assets",
      "output": "assets"
    }
  ]
}
```
- when using mrs-developer:
```json
{
  "assets": [
    "src/favicon.ico",
    "src/assets",
    {
      "glob": "**/*",
      "input": "./src/develop/pastanaga-angular/projects/pastanaga-angular/assets",
      "output": "assets"
    }
  ]
}
```

#### Core style
Import Pastanaga core style in your application style (usually `src/styles.scss`):
- when using npm package:
```scss
@import "~@guillotinaweb/pastanaga-angular/lib/styles/core";
```
- when using mrs-developer
```scss
@import "./develop/pastanaga-angular/projects/pastanaga-angular/lib/styles/core";
```


## Theming

### Fonts

If you want to use Pastanaga fonts in your application, you need to
- declare the `$font-path` in your application style:
```scss
$font-path: '../../../assets/fonts';
```
**Warning**: since angular 10, scss variable is now relative to the place it is called.

- and import Pastanaga fonts in your application style as well:
  - when using npm package
```scss
@import "~@guillotinaweb/pastanaga-angular/lib/styles/fonts";
```
  - when using `mrs-developer`
```scss
@import "./develop/pastanaga-angular/projects/pastanaga-angular/lib/styles/fonts";
```

### Overriding theme

Any project using pastanaga-angular must have two files (`pastanaga-core-overrides.scss` and `pastanaga-component-overrides.scss`) in their `src` folder.
Keep those file empty if you want to use Pastanaga theme.

If you have your own theme, you can override pastanaga theme by overriding the tokens in these two files:
- `pastanaga-core-overrides.scss` allows to override variables from:
    - theme/palette
    - theme/layout
    - theme/scrollbar
    - theme/shadows
    - theme/spacing
    - theme/transitions
    - theme/typography
    - theme/z-index
- `pastanaga-component-overrides.scss` allows to override variables from all other theming files like:
    - theme/avatar
    - theme/body
    - theme/button
    - theme/chips
    - theme/icon
    - theme/menu
    - theme/modal
    - theme/tables
    - theme/tabs
    - theme/textfield
    - theme/toast
    - theme/toggle
    - theme/tooltip

Pastanaga theme is defined in `src/lib/styles/theme` folder. Any variable with `!default` suffix can be overwritten.

Pastanaga theme is built around token. For example, `_palette.token.scss` contains all the colors used in Pastanaga with general token names (*e.g.* `$color-neutral-regular`, `$color-primary-stronger`).
See the full list in https://plone.github.io/pastanaga-angular/palette.

Then, some components have a second layer of tokens. For example buttons have a list of tokens for each aspect and kind (*e.g.* `$color-text-button-primary-solid`, `$color-background-button-primary-solid`,…).
So you can have your own theme by overwriting the whole color palette or just by changing some aspects of some components.

## Migration guide version 1.x to version 2.x
### Module names
In Pastanaga 2+, we prefix all modules with `Pa`: `ButtonModule` becomes `PaButtonModule`.

### Components common properties
Pastanaga now contains some useful types for properties configuring several components:
- `Kind`: primary | secondary | destructive | inverted
- `Size`: tee-shirt size going from `small` to `xxlarge`. Not all sizes are available for all components

### Buttons
We changed the way to configure buttons:
- `color` is now managed by `kind` property
- `size` is now expecting to be one of the values of `Size` type
- `border` property is replaced by `aspect` which can be `solid` or `basic`

See https://plone.github.io/pastanaga-angular/button for full documentation.

### Icons
`pa-icon` is now using a svg sprites to display icons by name. You can still provide a full path to display any other image though.

See https://plone.github.io/pastanaga-angular/icon for full documentation.

### Form elements
We changed form elements hierarchy: now they are all in the same place under `controls` folder.
They still belong to two distinct modules (`PaTextFieldModule` and `PaTogglesModule`).

All controls are sharing some properties:
- `PaFormControlDirective` is the base class containing common properties (like `id`, `name`, `disabled`…) for all form elements components
- `NativeTextFieldDirective` is extending `PaFormControlDirective` and contains common properties for all text field elements (like `placeholder`, `value`, `readonly`,…)

