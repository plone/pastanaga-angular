# 2.21.1 (2021-03-01)

### Improvement:
- **Table**: don't hide menu button by default in desktop tables [mpellerin42] 

# 2.21.0 (2021-02-23)

### Improvements:
- **Form fields**: simplify and refactor fields implementation [julienCarret & ebrehault]

# 2.20.3 (2021-02-19)

### Improvements:
- **Theme**: Add units to for saturation and lightness [dgsmith2]

# 2.20.2 (2021-02-16)

### Bugfix:
- **Layout**: Fix tight compact container max-width value [mpellerin42]

# 2.20.1 (2021-02-15)

### Feature
- **Layout**: [mpellerin42]
    - Add a new container based layout
    - Use Panel+Wide layout on our demo

# 2.20.0 (2021-02-15)

### Breaking changes
- **Breakpoints**: Update large and xLarge breakpoints to be respectively 1024px and 1440px [mpellerin42]

### Improvements
- **Breakpoints**: Update breakpoints documentation page [mpellerin42]
- **Documentation pages**: [mpellerin42]
    - Add some space below the different titles to let the pages breath
    - Automatically scroll to top when navigating through demo pages.
- **Spacing**: Add token for side panel width [mpellerin42]

# 2.19.6 (2021-02-12)

### Bugfix

- **Avatar**: Undefined avatar state use svg border image [barcafa]

# 2.19.5 (2021-02-10)

### Bugfix

- **Toast**: Align toast text [barcafa]

# 2.19.4 (2021-02-10)

### Bugfix

- **Toast**: Set toast message as innerHTML [barcafa]

# 2.19.3 (2021-02-5)

### Bugfix
- **Typography**: Put back proper spacing in documentation pages [mpellerin42]

# 2.19.2 (2021-02-3)

### Bugfix
- **Typography**: Use our monospace font token in our CSS reboot [mpellerin42]

# 2.19.1 (2021-02-3)

### Improvements
- **Avatar**: fix font-weight to semi-bold [mpellerin42]
- **Table**: fix padding on table rows [mpellerin42]

# 2.19.0 (2021-02-1)

### Breaking changes
- **Avatar**: [mpellerin42]
    - Size update: tiny | small | medium | huge (instead of small | medium | large)
    - Change the `undefined` state to be without background and with a dashed border
    - Update documentation page

# 2.18.1 (2021-01-29)

### Improvement
- **OptionModel**: add `hasSeparator` property to OptionModel to allow the creation of a menu dynamically [mpellerin42] 

# 2.18.0 (2021-01-25)

### Breaking changes

- **Typography**: Improve typography setup and consistency [mpellerin42]
    - New naming convention for display sizes: d1, d2,… instead of dsmall, dmedium,…
    - New `-md` suffix applied to values meant to be used on medium breakpoint
    - Update some values in font-size and line-height mapping
    - Add mapping function and mixin for letter spacing
    - Update documentation page
    

# 2.17.11 (2021-01-18)

### Bugfix

- **Tooltip**: Add missing export of tooltips in public-api [mpellerin42]

# 2.17.10 (2021-01-12)

### Bugfix

- **Popup**: Fix for popup position [jlp0328]

# 2.17.9 (2021-01-11)

### Improvement

- **Table**: 
    - Added sortable header component [niglesias]
    - Added table header button to be used only in tables [niglesias]
    
# 2.17.8 (2021-01-11)

### Improvements

- **Popup**: Fix prod build - Don't provide $event to HostListener when the method doesn't use it [mpellerin42] 

# 2.17.7 (2021-01-07)

### Bugfix

- **Popup**: Fix width and position of dropdown [jlp0328]

# 2.17.6 (2021-01-07)

### Improvement

- **Popup**: Add `openOnHover` attribute to popup directive [mpellerin42]

# 2.17.5 (2021-01-05)

### Bugfix

- **Dropdown**: Increase max-width of dropdown on large viewports [jlp0328]

# 2.17.4 (2021-01-04)

### Improvements

- **Tables**: add `last` input to table row component allowing to style properly row's border bottom (last row without border bottom) [mpellerin42]

# 2.17.3 (2021-01-04)

### Bugfix

- **Tables**: Remove z-index from table header which was causing side effect on some pages [mpellerin42]

# 2.17.2 (2020-12-22)

### Improvements

- **Buttons**: add transitions to background color and box shadows on hover and active states [mpellerin42]

# 2.17.1 (2020-12-21)

### Bugfix

- **pa-select**: Fix dropdown position under pa-select [mpellerin42]

# 2.17.0 (2020-12-18)

### Breaking changes

- Spacing in base 8:
    - Update our rhythm map to be base 8 instead of base 12 [mpellerin42]
    - Update all components to use the new rhythm map [mpellerin42]

# 2.16.0 (2020-12-18)

### Breaking changes

- **pa-select**: 
    - User can no longer type in pa-select [jCarret]
    - free-text option removed [jCarret]

# 2.15.8 (2020-12-17)

### Improvement

- **Checkbox**: ellipsis on checkbox label [mpellerin42] 

# 2.15.7 (2020-12-17)

### Improvement

- **Popup**: when popup position is not adjusted, we adjust its height [ebrehault]

# 2.15.6 (2020-12-16)

### Improvement

- **Sidenav**: Update demo and documentation [niglesias]

# 2.15.5 (2020-12-15)

### Improvement

- **Input**: Support autocapitalize attribute [ebrehault]

# 2.15.4 (2020-12-11)

### Bugfix

- **Buttons**: CSS4 hover media query for buttons [jlp0328]
- **Avatar**: Add color to avatar initials [jlp0328]

# 2.15.3 (2020-12-10)

### Bugfix

- **Datetime**: stop refresh date timer on component destroy [mpellerin42]

# 2.15.2 (2020-12-10)

### Bugfix

- **Datetime**: refresh date time until it's more than 15min ago [mpellerin42]

# 2.15.1 (2020-12-10)

### Bugfix

-   **Modal**: Avoid pa-modal to override pa-dialog [jCarret]

# 2.15.0 (2020-12-10)

### Feature

-   **InvertedButtons**: New style for buttons [niglesias]
-   **Palette**: add alphas and inverted tokens [niglesias]

### Breaking changes

- **ButtonComponent**: No more regular buttons [niglesias]

# 2.14.6 (2020-12-09)

### Improvement

- **Keys**: Complete Keys const [jCarret]
- **dialog**: adapt width on mobile to avoid modal being full-width [jCarret]


# 2.14.5 (2020-12-09)

### Improvement

- **Datetime**: refresh time displayed every minute when format is human and time less than 15min ago [mpellerin42] 

# 2.14.4 (2020-12-08)

### Bugfix

-   **Modal**: Add background color for modal [jlp0328]

# 2.14.3 (2020-12-07)

### Improvements

- Use GitHub Actions instead of Travis [ebrehault]

# 2.14.2 (2020-12-07)

### Bugfix

-   **Modal**: Add background color for modal and dialog [jlp0328]

# 2.14.1 (2020-12-04)

### Improvements

-   **Popup**: display below the clicked element [ebrehault]

# 2.14.0 (2020-12-04)

### Improvements

-   Upgrade to Angular 11 [ebrehault]

# 2.13.9 (2020-12-02)

### Bugfix

-   **Table**: Fix clickable header style [mpellerin42]

# 2.13.8 (2020-12-02)

### Improvements

-   **ToastService**: Test coverage and toast status protection [jCarret]

# 2.13.7 (2020-12-01)

### Improvements

-   **ToastComponent**: Set min-width to the content [niglesias]

# 2.13.6 (2020-11-30)

### Improvements

-   **ToastService**: use ReplaySubject instead of Subject for toast status [jCarret]

# 2.13.5 (2020-11-30)

### Improvements

-   **ToastService**: expose toast status [jCarret]

### Bugfix

-   Fix Select dropdown cannot be opened with keyboard navigation [jCarret]

# 2.13.4 (2020-11-27)

### Improvements

-   **Chips**: changed close icon [jCarret]

# 2.13.3 (2020-11-27)

### Improvements

-   **Icon**: Prevent icon name to be displayed on hover [mpellerin42]
-   **Toast**: Add z-index on toast-container [mpellerin42]

# 2.13.2 (2020-11-20)

### Improvements

-   **ChipComponent**: expose ChipComponent in public api [jCarret]

# 2.13.1 (2020-11-17)

### Feature

-   **ChipComponent**: New chip component [jCarret]

# 2.13.0 (2020-11-16)

### Breaking changes

-   **Modal**: [dgsmith2]
    -   to provide data to modal components, specify a `data` field when creating
        the `ModalConfig` and inject `ModalRef` into the componet

### Improvements

-   **Tabs**: fix typo in the documentation page [mpellerin42]

# 2.12.0 (2020-11-12)

### Breaking changes

-   **Avatar**: [mpellerin42]
    -   replace input `large` by `size` so avatar can now be `small`, `medium`, `large`
    -   remove icon, iconBackground and altText properties
    -   fix default background color
    -   fix avatar's initials text style
    -   keep only 3 auto-background colors: `primary`, `secondary` and `tertiary`
    -   update demo and documentation

# 2.11.2 (2020-11-12)

### Improvements

**SideNavComponent**: [niglesiaz]

-   Adding an optional icon to pa-side-nav-items
-   Fixing alignments
-   **Pastanaga demo**: [niglesiaz]
    -   Fixing alignments in pa-demo

# 2.11.1 (2020-11-10)

### Improvements

-   **Pastanaga demo**: [mpellerin42]
    -   Move usage of sidenav in pa-demo-menu component
    -   Factorize main demo in a component

# 2.11.0 (2020-11-10)

### Breaking change

-   **PastanagaService** deleted: having one service to rule them all is a bad practice as it impacts badly test performances, so we decided to remove it [mpellerin42]

# 2.10.2 (2020-11-10)

### Improvements

-   **spacing**: added values [jCarret]

### Bugfix

-   Fix Travis

# 2.10.1 (2020-11-06)

### Bugfix

-   **Sidenav demo**:
    -   By default no item should be selected [niglesias]
    -   Clicking on pastanaga icon in the sidenav should display home page again [niglesias]
    -   on mobile/tablet, selecting a sidenav item should close the menu [niglesias]

# 2.10.0 (2020-11-04)

### Feature

-   **SideNavComponent**: New side nav component [niglesias]

# 2.9.8 (2020-10-30)

### Bugfix

-   **TabList**: wait for tabItems to be rendered before updating slider [jCarret]

# 2.9.7 (2020-10-29)

### Improvements

-   **Tabs**: Added option to have tablist full width or not [jCarret]
-   focus: added a directive to style keyboard focused elements [jCarret]

# 2.9.6 (2020-10-22)

### Improvements

-   **Dropdown**: Setup ellipsis on dropdown options [mpellerin42]
-   new rhythm value [mpellerin42]

# 2.9.5 (2020-10-19)

### Improvements

-   **Buttons**: updated style for icon and text, small and large buttons
    \_ **focus state on checkbox, dropdown, tabs and buttons**: design for focus state only applied when focus is the result of a keyboard interaction

# 2.9.4 (2020-10-16)

### Improvements

-   **Tabs**: allow tabs of different size [jCarret]
-   added values to rhythm [jCarret]

# 2.9.3 (2020-10-14)

### Bugfix

-   **Table**: show button when it has focus [ebrehault]

# 2.9.2 (2020-10-09)

### Improvement

-   **Unit Tests**: improve performance by mocking dependencies [dgsmith2]

# 2.9.1 (2020-10-08)

### Bugfix

-   **Checkbox**: style [mpellerin42]

### Improvement

-   **Checkbox**: remove deprecated checkbox component [mpellerin42]

# 2.9.0 (2020-10-07)

### Breaking changes

-   **Checkbox**: Checkbox Component replacing deprecated checkbox [jlp0328]
-   **Checkbox**: Add unit tests [jlp0328]

# 2.8.2 (2020-10-06)

### Improvements

-   **Linter**: [mpellerin42]
    -   Add rxjs-tslint-rules set and enable rxjs-no-unsafe-takeuntil rule
    -   Setup semicolon rule to match prettier one
    -   Fix most of linter's errors (the ones not implying breaking changes)

# 2.8.1 (2020-10-02)

### Improvements

-   **Toast**: updated styling for toasts and added test [jlp0328]

# 2.8.0 (2020-09-24)

### Breaking changes

-   **Select**: Select Component replacing deprecated select [jCarret]
-   **Select**: DeprecatedSelect and DeprecatedInput are removed from the library [jCarret]
-   **unit tests**: fix test setup to be able to run tests from the outside [jCarret]

# 2.7.2 (2020-09-24)

### Improvements

-   **Prettier**: added a pre-commit hook running prettier on changed/staged files [mpellerin42]
-   **Unit tests**: added a pre-push hook running all unit tests [mpellerin42]

# 2.7.1 (2020-09-21)

### Bugfixes

-   **Dialog**: updated dialog styles [jlp0328]

# 2.7.0 (2020-09-21)

### Breaking changes

-   **Translate**: 'LANG' and 'TRANSLATIONS' are now InjectionTokens named `PA_LANG` and `PA_TRANSLATIONS` [ebrehault]

# 2.6.10 (2020-09-21)

### Improvements

-   **Theme**: added new value in spacing rhythm [niglesiaszingoni]

# 2.6.9 (2020-09-17)

### Bugfixes

-   **Checkbox**: updated checkbox focus style [jCarret]

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
