# Pastanaga Angular Components

[![Build Status](https://travis-ci.com/plone/pastanaga-angular.svg?branch=master)](https://travis-ci.com/plone/pastanaga-angular)

https://plone.github.io/pastanaga-angular/dist/pastanaga-app/

Provides the Pastanaga elements as Angular components.

See `src/app/app.component.ts` and `src/app/app.component.html` for usage examples.

## Theming

Note: we assume pastanaga-angular is provided as a [mr-developer](https://github.com/collective/mr-developer) dependency.

Import the common reset in main app style:

```
@import './develop/pastanaga-angular/projects/pastanaga/src/lib/styles/common-reset';
```

If we want the default fonts, we need to import them like this:

```
@import "./develop/pastanaga-angular/projects/pastanaga/src/lib/styles/fonts";
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

