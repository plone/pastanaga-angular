# Pastanaga Angular Components

[![Build Status](https://travis-ci.com/plone/pastanaga-angular.svg?branch=master)](https://travis-ci.com/plone/pastanaga-angular)

Provides Pastanaga elements as Angular components.

See https://plone.github.io/pastanaga-angular for usage example and developer guide.

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
 
- when using npm package:
```scss
$font-path: '~@guillotinaweb/pastanaga-angular/lib/styles/fonts';
@import "~@guillotinaweb/pastanaga-angular/lib/styles/fonts";
```
- when using mrs-developer
```scss
$font-path: './develop/pastanaga-angular/projects/pastanaga-angular/lib/styles/fonts';
@import "./develop/pastanaga-angular/projects/pastanaga-angular/lib/styles/fonts";
```

### Overriding theme

// TODO
