# 2.6.9 (2020-09-17)

### Bugfixes

-   **Checkbox**: checkbox focus style is removed for now [jCarret]


# 2.6.8 (2020-09-16)

### Improvements

-   **Modal**: add data property to ModalRef [jlp0328]
-   **PastanagaService**: add toast service [jlp0328]

# 2.6.7 (2020-09-16)

### Bugfixes

-   **Popup**: fix max-width on small devices [ebrehault]

# 2.6.6 (2020-09-15)

### Bugfixes

-   **Table**: prevent table row to scroll over table header [mpellerin42]

# 2.6.5 (2020-09-14)

### Improvements

-   **Tab item**: [jCarret]
    -   added icon on mobile
    -   aligned style on mobile (border color and padding)

# 2.6.4 (2020-09-11)

### Improvements

-   **Table**: [mpellerin42]
    -   center header cell content
    -   adjust padding
    -   add selected row style
    -   fix clickable row cursor on desktop

# 2.6.3 (2020-09-10)

### Bugfix

-   **form fields**: detect changes of ids before rendering [jCarret]

# 2.6.2 (2020-09-10)

### Bugfix

-   **Table**: don't hide menu button on mobile/tablet [mpellerin42]

### Improvements

-   **Table**: [mpellerin42]
    -   center cell content
    -   improve menu button style
-   **Input** documentation [mpellerin42]

# 2.6.1 (2020-09-09)

### Improvements

-   **Form fields auto-fill style**: added custom style for browser's autofill on form fields [jCarret]

# 2.6.0 (2020-09-08)

### Breaking changes

We found out `form fields` were not properly supporting reactive forms, so we implemented a new BaseControl: [jcarret]

-   **input component**: is using the new BaseControl
-   **all previous form fields are marked as deprecated and will be updated using the new base control**

### Bugfixes

-   **exports**: [jCarret]
    -   fixed export for deprecated checkbox
    -   added export for input component
-   **NPM**: put styles and assets in NPM package [ebrehault]

# 2.5.2 (2020-09-04)

### Improvements

-   **Breakpoints**: provide new observable returning current mode (desktop/tablet/mobile) [mpellerin42]

# 2.5.1 (2020-09-02)

### Bugfixes

-   **Breakpoints**: [mpellerin42]
    -   removing small breakpoint
    -   fixing large breakpoint variables
    -   adding xLarge breakpoint

# 2.5.0 (2020-09-01)

### Breaking changes

We found out `glyph` was not very intuitive to use, so we changed it for `icon` in all components and models: [mpellerin42]

-   **control model**: in `IControlModel`, and `ControlModel`
-   **option component**: impact **select component** as well

### Bugfixes

-   **Toasts**: export toast service and models [mpellerin42]

### Improvements

-   **Modal**: Use a token for modal box-shadow [mpellerin42]
-   **Table**: [mpellerin42]
    -   Better component structure: one folder by component
    -   Differentiate hover background from header one
    -   New table-cell-menu component to manage row menu button style

# 2.4.4 (2020-08-14)

### Improvements

-   **Colors**: New lighter gray for `$color-neutral-secondary-lightest`, previous one is now `$color-neutral-primary-lighter` [mpellerin42]
-   **Icons**: Add icon name as accessibility title in pa-icon's SVGs [mpellerin42]
-   **Dropdown option**: Differentiating selected state from active one with a new background color and a check icon [mpellerin42]

### Bugfixes

-   Fix demo tests setup so unit tests don't fail [mpellerin42]

# 2.4.3 (2020-08-11)

### Bugfixes

-   **Button**: Fix large icon button style [mpellerin42]

### Improvements

-   **Popup**: add `onOpen` event emitter to `PopupComponent` [mpellerin42]
-   **Select**: add `expanded` event emitter to `SelectComponent` [mpellerin42]

# 2.4.2 (2020-08-06)

### Bugfixes

-   **Select**: prevent weird blinking of input right border on hover [mpellerin42]

# 2.4.1 (2020-08-05)

### Bugfixes

-   **Select**: adjust dropdown position to match new input's size set in version 2.3.7 [mpellerin42]

### Improvements

-   **PastanagaService**: rename `breakpointObserver` to `breakpoint` [mpellerin42]

# 2.4.0 (2020-08-04)

### Bugfixes

-   **Checkbox**: ability to navigate through checkboxes from keyboard + visible focus state [mpellerin42]
-   **Tabs**: [mpellerin42]
    -   Center tab's text on desktop
    -   Fix hover/focus state

### Improvements

-   **Input**: help/error message spacing [mpellerin42]
-   **Tabs**: Display chevron icon on mobile, no icon on tablet/desktop [mpellerin42]
-   **Demo**: Responsive demo app [mpellerin42]

### Feature

-   **BreakpointObserver**: service allowing to know current viewport size [mpellerin42]

# 2.3.7 (2020-08-03)

### Bugfix

-   **pa-option**: set display pa-option element with display block so e2e tool can click on it [mpellerin42]
-   **pa-select**: prevent autocomplete on select [mpellerin42]

### Improvements

-   **Input**: update input size to be the same as medium button [mpellerin42]

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
