# Pastanaga Angular

[![Build Status](https://travis-ci.org/plone/pastanaga-angular.svg?branch=master)](https://travis-ci.org/plone/pastanaga-angular)

## Objective

Implement a minimal viable product in Angular based on the Pastanaga design.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Use your own Plone backend

Edit `./src/environments/environment.ts` (or `./src/environments/environment.prod.ts` for prod build), and update the `backendUrl` value.

## Implementing your theme

You can freely change the main template in `.src/app/app.component.html` and set your custom style in `.src/custom.scss`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
