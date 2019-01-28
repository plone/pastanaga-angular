# Pastanaga Angular Components

https://plone.github.io/pastanaga-angular/dist/pastanaga-app/

Provides the Pastanaga elements as Angular 6 components.

See `src/app/app.component.ts` and `src/app/app.component.html` for usage examples.

## Theming

The Pastanaga CSS uses CSS variables that can take custom values if defined.

Example: by adding the following in our own project style

```
:root {
    --custom-font-size-base: 1.2rem;
    --custom-font-family-sans-serif: monospace;
    --custom-labels-text-transform: none;
}
```

we will override the Pastanaga default font-size-base, font-family-sans-serif and labels-text-transform values.
