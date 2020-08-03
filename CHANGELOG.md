# 2.3.7 (not released yet)

### Bugfix
- **pa-option**: set display pa-option element with display block so e2e tool can click on it [mpellerin42] 
- **pa-select**: prevent autocomplete on select [mpellerin42]

# 2.3.6 (2020-07-31)

### Bugfix

-   **Avatar**: fixed initials display for large [jcarret]

# 2.3.5 (2020-07-31)

### Improvements

-   **Avatar**: sizes updated and focus state added [jcarret]
-   **Tabs**: small device display added [jcarret]

# 2.3.4 (2020-07-30)

### Bugfix

-   **Breakpoint**: fixed desktop breakpoint [jcarret]
-   **Toggle**: hide checkbox input [jcarret]

# 2.3.3 (2020-07-29)

### Bugfix

-   **Textfield**: fix input validation [ebrehault]

# 2.3.2 (2020-07-28)

### Bugfix

-   **Textfield**: detect text input autofill properly [ebrehault]

# 2.3.1 (2020-07-28)

### Improvements

-   **Textfield**: `pattern` property to validate value against regexp [ebrehault]

# 2.3.0 (2020-07-27)

### Feature

-   **Modal** components and associated service: [mpellerin42]
    -   provides a service to manage all modals of an application
    -   provides dialog and modal components
    -   provides everything needed to create custom modals

# 2.2.1 (2020-07-22)

### Bugfix

-   **Theme**: updated font-sizes and weights [julienCarret]
-   **Grid**: fix grid breakpoints [ebrehault]

# 2.2.0 (2020-07-20)

### Breaking changes

**Date/time**

-   Date/time now supports two formats (`human` and `numerical`), and a `dateOnly` attribute [ebrehault]

# 2.1.1 (2020-07-20)

### Bugfix

-   **Theme**: add missing `!default` in typography variables [mpellerin42]
-   **Theme**: add overridable theme for links [mpellerin42]

# 2.1.0 (2020-07-20)

### Improvements

-   **Theme - Typography**: new font-size and line-height maps for small screens [mpellerin42]

### Breaking changes

**Theme**

-   renaming shadows' variable [mpellerin42]
-   better variables to manage breakpoints [mpellerin42]
-   renaming typography mixins to be more relevant: `size` now applies `font-size` and `line-height` [mpellerin42]

# 2.0.4 (2020-07-17)

### Improvements

-   Add default title and paragraph spacing to pastanaga theme [mpellerin42]
-   **Button**: style improvements (better alignment) [mpellerin42]

# 2.0.3 (2020-07-15)

### Bugfixes

-   split pastanaga overrides in two distinct files so overriding color palette works properly on components like button [mpellerin42]

### Improvements

-   keep shadow tokens generic [mpellerin42]

# 2.0.2 (2020-07-15)

### Improvements

-   Style changes for components states (checkbox, buttons, tabs, text-field, toggle) [julienCarret]

# 2.0.1 (2020-07-13)

### Improvements

-   Auto tag, deploy GitHub Pages, and release on NPM when merging on 2.x branch [ebrehault]

# 2.0.0 (2020-07-13)

New major version of Pastanaga where almost all components have been re-written for a better theme management.
All components are now tested and documented.

### Features:

-   avatar component
-   button component
-   controls:
    -   textfield
        -   input component
        -   select component
        -   textarea component
    -   toggles
        -   checkbox component
        -   toggle component
-   datetime component and service
-   dropdown:
    -   dropdown component
    -   option component
    -   option-header component
    -   separator component
-   icon component
-   popup component, service and directive
-   table
    -   table component
    -   table-header directive
    -   table-cell component
    -   table-row component
    -   table-row-header component
-   tabs
    -   tab-item component
    -   tabs-list component
-   toast component, model and service
-   tooltip component and directive
-   translate directive, model, pipe and service

### Contributors:

-   [ebrehault]
-   [julienCarret]
-   [mpellerin42]
