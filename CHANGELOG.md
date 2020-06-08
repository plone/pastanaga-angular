# 1.18.4 (2020-06-08)

### Improvements
- No implicit return [ebrehault]

# 1.18.3 (2020-05-28)

### Bug fix
- **Toaster**: detect change after instantiation [ebrehault]

# 1.18.2 (2020-05-26)

### Improvements
- Expose Toaster and Dialog services in Pastanaga service [ebrehault]

# 1.18.1 (2020-05-22)

### Bug fix
- **Textarea**: fix missing default accent for textarea [barcafa]

# 1.18.0 (2020-05-19)

### Breaking change
- **Button**: remove `pa-button-link` (to remove dependency to @angular/router and angular-traversal) [ebrehault]

# 1.17.22 (2020-05-07)

### Bug fix
- **Dialog**: detect change when opening a confirm dialog [ebrehault]

# 1.17.21 (2020-05-06)

### Bug fix
- **Translare**: don't try to encode HTML tags in translation parameters when not a string [mathilde-pellerin]

# 1.17.20 (2020-05-06)

### Security fix
- **Translate**: encode HTML tags in translation parameters to avoid HTML injection [ebrehault]

# 1.17.19 (2020-05-05)

### Bugfix
- **Dialog**: fix band size on scroll 

# 1.17.18 (2020-04-28)

### Improvements
- **Filtered checkbox group**: [mathilde-pellerin]
    - Make filtered checkbox group extendable
    - Don't override id input

# 1.17.17 (2020-04-15)

### Bugfix
- Fix select field label position [ebrehault]

# 1.17.16 (2020-04-14)

### Bugfix
- Do not focus on input after every view check [ebrehault]

# 1.17.15 (2020-04-14)

### Improvement
- Dialog: change default dialog size to 600x720 [mathilde-pellerin]

# 1.17.14 (2020-04-14)

### Bugfix
- Use primary colors on dropdown [barcafa]

# 1.17.13 (2020-04-10)

### Improvements
- **Filtered checkbox group**:
  - Don't use unexisting two way data-binding in filtered checkbox group template [mathide-pellerin]
  - Allow the usage of `FilteredCheckboxGroupComponent` as base class by setting its constructor properties `protected` [mathide-pellerin]
  - Add Doc page for `FilteredCheckboxGroupComponent` [mathide-pellerin]

# 1.17.12 (2020-04-09)

### Bugfix
- Prevent doc page style to leak on component inside them again [mathide-pellerin]

# 1.17.11 (2020-04-06)

### Bugfixes

- dialog: don't apply band style when there is no band [mathide-pellerin]
- Prevent doc page style to leak on component inside them [mathide-pellerin]

## Improvements

- Move popup.scss and dropdown.scss to common style so it can be used anywhere [mathide-pellerin]
- Separate doc components from doc pages [mathide-pellerin]
- Adapt code tag style in doc usage section [mathide-pellerin]
- coerce boolean on popup isAlwaysOn property [mathide-pellerin]

# 1.17.10 (2020-04-02)

### Bugfix
- **Dialog**: Added refresh method for dialog [barcafa]

# 1.17.9 (2020-03-30)

### Bugfix
- **Checkbox**: Fix checkbox help alignment when having icon block [mathide-pellerin]

# 1.17.8 (2020-03-30)

### Bugfix
- **Confirm dialog**: use innerHtml for basic confirm title and description to display basic formatting [mathilde-pellerin]

# 1.17.7 (2020-03-26)

### Bugfix
- **Dialog and toaster**: use zone to avoid conflict between dialog and toasts [ebrehault]

# 1.17.6 (2020-03-26)

### Bugfix
- **Dialog**: do not use tick(), just detach the dialog view properly [ebrehault]

# 1.17.5 (2020-03-26)

### Bugfix
- **Dialog**: Avoid recursive call to tick() when closing [ebrehault]

# 1.17.4 (2020-03-26)

### Improvement
- **Select**: Use getters & setters [niglesias]

### Bugfix
- **Select**: Added onChanges to set proper value [niglesias]

# 1.17.3 (2020-03-20)

### Improvement
- **Checkbox group**: support 2-way data binding [ebrehault]

# 1.17.2 (2020-03-20)

### Bugfix
- **Checkbox**: fix alignments [ebrehault]

# 1.17.1 (2020-03-20)

### Bugfix
- **Dialog service**: fix bad import [mathilde-pellerin]

# 1.17.0 (2020-03-19)

### Feature
- **Confirm dialog** component with basic confirm which can be opened directly from dialogService [mathilde-pellerin] 

# 1.16.2 (2020-03-19)

### Improvements
- **Checkbox group**: support `isHidden` to hide an entry [ebrehault]
- **Filtered checkbox group**: allow to display only the selected entries [ebrehault]

# 1.16.1 (2020-03-18)

### Improvements
- Add developer documentation link in dialog demo [mathilde-pellerin]
- Starting to implement a better documentation app (work in progress): [mathilde-pellerin]
    - **doc-page** component to easily write clean documentation
    - **doc-menu** to navigate through documentation pages
    - New demo accessible from the old one

# 1.16.0 (2020-03-17)

### Feature
- **Filtered checkbox group**: allow text filtering, directory filtering (A, B, C, …), and use CDK virtual scroll [ebrehault]

# 1.15.2 (2020-03-16)

### Bug fix
- **Dialog**: Tick the app when closing a dialog so the created DOM element is properly removed [ebrehault]

# 1.15.1 (2020-03-15)

- Fix import

# 1.15.0 (2020-03-12)

### Feature
- Dialog component and associated service [mathilde-pellerin]

### Improvement
- set strict compilation [mathilde-pellerin]

### Breaking changes
- Replace deprecated `KeyboardEvent.codes` by `KeyboardEvent.keys` [mathilde-pellerin]

# 1.14.1 (2020-03-12)

### Bug fix
- **Checkbox group**: make sure checkboxes are updated after the options are passed [ebrehault]

# 1.14.0 (2020-03-11)

### Feature
- Allow to override default translations with specific ones [ebrehault]

# 1.13.3 (2020-03-10)

### Improvements
- Move demo page from app to a module so it can be imported from another app [mathilde-pellerin]

# 1.13.2 (2020-03-10)

### Improvements
- Update travis configuration to automatically update the demo page every time we merge on master branch. [mathilde-pellerin]
- Display version number in demo page [mathilde-pellerin]
- Create git tag only if not existing [mathilde-pellerin]
- Change demo URL to be https://plone.github.io/pastanaga-angular [mathilde-pellerin]

# 1.13.1 (2020-03-09)

### Improvements
- **Checkbox tree**: add `disabled` option to disable the whole tree [mathilde-pellerin]
- **Checkbox group**: add `disabled` option to disabled the whole group [mathilde-pellerin]
- **Checkbox group**: Add `noSelectAll` option to remove select all button [mathilde-pellerin]

# 1.13.0 (2020-03-09)

### Features
- New `checkbox-group` component [mathilde-pellerin]

### Breaking changes
- **Checkbox tree** doesn't have a `type` input anymore: use `checkbox-group` with type radio instead

# 1.12.7 (2020-03-06)

### Bug fixes
- Make sure placeholder is displayed in select when no value [ebrehault]
- Fix focus for Chrome [ebrehault]
- Fix checked icon in password rules [ebrehault]

# 1.12.6 (2020-03-05)

### Bug fixes
- **Checkbox tree**: prevent toggling children while they're loading [mathilde-pellerin]
- **Checkbox tree**: update expand button icon when loading children [mathilde-pellerin]
- **Checkbox tree**: children tree should inherit shouldSort option [mathilde-pellerin]

# 1.12.5 (2020-03-04)

### Bug fix
- Fix Angular Universal related problems [ebrehault]

# 1.12.4 (2020-03-03)

### Improvements
- **Icon model**: Add `IconData` interface to type expected data for Icon constructor [mathilde-pellerin]

# 1.12.3 (2020-02-28)

### Bug fix
- **calendar**: set sunday as first day of the week [mathilde-pellerin]

# 1.12.2 (2020-02-27)

### Improvements

- **styles**: move common styles into globally imported style to avoid massive CSS duplication in resulting bundles [ebrehault]

# 1.12.1 (2020-02-26)

### Bug fixes

- **date-input**: fix calendar positioning [mathilde-pellerin]
- **date-input**: give more time to enter a valid date and reset error state when new value [mathilde-pellerin]

### Improvements

- **Toast**: utility method to get a default toast close button [mathilde-pellerin]

# 1.12.0 (2020-02-24)

### Breaking change
- Upgrade to Angular 9 [ebrehault]

# 1.11.1 (2020-02-25)

### Bug fixes
- **dropdown-checkbox component**: fix displayed values [mathilde-pellerin]
- **icon component**: add optional color and padding in icon model [mathilde-pellerin]
- **icon component**: large size is 30px [mathilde-pellerin]
- **icon component**: add name support in icon model [mathilde-pellerin]
- **date-input component**: use help Input from TextFieldCommon [mathilde-pellerin]

# 1.11.0 (2020-02-20)

### Bug fixes
- **Calendar component**: Updating month page when passed date is not a range [raul-onna]

### Features
- New `date-input` component [raul-onna]

# 1.10.2 (2020-02-19)

### Bug fixes
- **Button-link component**: Fix button link rendering when displayed as button [ebrehault]

### Improvements
- **Icon component**: Allow to create a large icon via the icon property [ebrehault]

# 1.10.1 (2020-02-18)

### Improvements
- **Button component**: Support coerceBoolean on all button properties [mathilde-pellerin]
- **Icon component**: Support icon as object with icon path and background [mathilde-pellerin]
- **Icon component**: Better management of classes and styles [mathilde-pellerin]
- **Checkbox component**: Add optional icon block to checkbox [mathilde-pellerin]
- **Dropdown item component**: dropdown items in checkbox mode now support subLabel displayed as checkbox help [mathilde-pellerin]
- **Dropdown item component**: support icon for checkbox mode [mathilde-pellerin]

# 1.10.0 (2020-02-14)

### Bug fixes
- **Input component**: Do not break if input value is a number [mathilde-pellerin]

### Features
- New `password-input` component [mathilde-pellerin]
- New `input-icon` component [mathilde-pellerin]

### Improvements
- **Input and textarea component**: Add focus event triggered by input and textarea [mathilde-pellerin]
- **Input component**: Allow to disable autocomplete with `noAutoComplete` option [mathilde-pellerin]
- Update demo app to have a clearer view of inputs different states [mathilde-pellerin]

# 1.9.4 (2020-02-14)

### Improvements
- Use utility functions for change detection

# 1.9.3 (2020-02-11)

### Bug fixes
- **Textarea component:** Fix textarea readonly padding [barcafa]

# 1.9.2 (2020-02-11)

### Bug fixes
- **Toggle component:** Vertically align toggle element when there is an image [mathilde-pellerin] 

### Improvements
- Improve changelog structure by adding **Bug fixes**, **Features**/**Improvements** and **Breaking changes** sections (starting at version 1.9.0)

# 1.9.1 (2020-02-07)

### Bug fixes
- **Checkbox tree component:** [mathilde-pellerin] 
  - fix lazy loading
  - style when last checkbox has children expanded
  - better typing

# 1.9.0 (2020-02-05)

### Bug fixes

- **Checkbox tree component:** [mathilde-pellerin]
  - Fix selection state to work properly with onPush strategy
  - Fix bugs on indeterminate state
  - Fix ellipsis

### Features

- **Checkbox tree component:** [mathilde-pellerin]
  - Add mode: categorized (by default), nested, fileSystem
  - Add `subLabels` and `labelIcons` optional inputs
  - Add unit tests
- **Checkbox component:** [mathilde-pellerin]
  - add coerce boolean for all inputs
  - add `squareCheck` optional input (replace the check mark '✓' by a square '■' when selected)

### BREAKING CHANGES

- **Checkbox component:** [mathilde-pellerin]
  - `onSelection` event emitter become `selection`
  - rename boolean inputs removing `is` prefix for better consistency between components:
    - `isDisabled` -> `disabled`
    - `isSelected` -> `selected`
    - `isIndeterminate` -> `indeterminate`
    - `isLabelHidden` -> `labelHidden`
  - remove some inputs which were used only by checkbox tree (now checkbox tree is managing them itself)
    - `totalChildren`
    - `selectedChildren`
    - `isBadgeVisible`

# 1.8.0 (2020-01-29)

- New avatar component
- New optional avatar input to display avatar in a badge

# 1.7.2 (2020-01-28)

- Differentiate emitted event when dropdown closed by clicking outside

# 1.7.1 (2020-01-28)

- Fix right-positionned side-bar

# 1.7.0 (2020-01-26)

- Auto-release to NPM
- Support radio buttons in checkbox-tree (partially)

# 1.6.5 (2020-01-23)

- Fix toaster

# 1.6.4 (2020-01-23)

- Improvements on toggle component [mathilde-pellerin] 

# 1.6.3 (2020-01-21)

- Moving attributes accessed to public on sidebar [bloodbare]
- upgrading angular-traversal to 1.2.6 [mathilde-pellerin]

# 1.6.2 (2020-01-20)

- Adjust badge sizes to base 12 system

# 1.6.1 (2020-01-19)

- Update the global pastanaga service with the new recent services

# 1.6.0 (2020-01-14)

- Update checkbox style
- Add popup directive and component
- Add dropdown components
- Add calendar and date picker components
- Add utility methods for popup positioning and markForCheck/detectChange methods

# 1.5.0 (2020-01-03)

- Remove the richtext field component and the dependency to Medium

# 1.4.22 (2020-01-03)

- To prevent XSS injection, remove HTML tags in text input by default

# 1.4.21 (2019-12-18)

- remove default margin on small spinner

# 1.4.20 (2019-12-18)

- Remove transition from abbreviations

# 1.4.19 (2019-12-17)

- Do not allow external Javascript in toaster messages

# 1.4.18 (2019-12-13)

- Fix markForCheck calls in side bar

# 1.4.17 (2019-12-13)

- Side bar: allow to pass explicit value to toggleOpen()
- Added min-width to pa-badge

# 1.4.16 (2019-12-12)

- Export TextField common and added keypress event

# 1.4.15 (2019-12-05)

- Make disabled attribute input public 

# 1.4.14 (2019-12-05)

- Fix disabled attribute in input 
- Set tooltip type `action` by default

# 1.4.13 (2019-12-04)

- Update shades of gray

# 1.4.12 (2019-12-01)

- Add MIT license file

# 1.4.11 (2019-11-29)

- Progress circle refactoring with better input name and better performances

# 1.4.10 (2019-11-21)

- allow HTML in textarea help message

# 1.4.9 (2019-11-21)

- New folder icon

# 1.4.8 (2019-11-21)

- Added AutoFocus Directive

# 1.4.7 (2019-11-19)

- Emit instant changes from text inputs

# 1.4.6 (2019-11-13)

- Accept empty translations

# 1.4.5 (2019-11-11)

- Limit textarea to five lines

# 1.4.4 (2019-11-06)

- Fix pa-badge: don't set hexaColor on undefined value

# 1.4.3 (2019-11-04)

- Modified badge styles

# 1.4.2 (2019-10-31)

- Recover buttons animations

# 1.4.1 (2019-10-28)

- Changed default tooltip delay time

# 1.4.0 (2019-10-26)

- Sidebar component

# 1.3.32 (2019-10-20)

- Detect change when FormControl value changes

# 1.3.31 (2019-10-16)

- Remove useless BrowserAnimationsModule
- Do not display 'undefined' if no input value

# 1.3.30 (2019-10-16)

- Setup auto-tagging

# 1.3.29 (2019-10-16)

- Fix button link reference to text content

# 1.3.28 (2019-10-16)

- Set proper class if input not empty

# 1.3.27 (2019-10-16)

- Add accent style to inputs

# 1.3.26 (2019-10-15)

- Fix path in demo app

# 1.3.25 (2019-10-15)

- Move Richtext in its own module

# 1.3.24 (2019-10-11)

- Make sure translate pipe returns a string

# 1.3.23 (2019-10-11)

- Remove transition from buttons

# 1.3.22 (2019-10-11)

- Fix button-link

# 1.3.21 (2019-10-10)

- Resize textarea automatically

# 1.3.20 (2019-10-10)

- Changed replace function on translate pipe to globally

# 1.3.19 (2019-10-10)

- Add ability to provide icon full path
- Prevent error if iconPath not defined

# 1.3.18 (2019-10-08)

- Removed translate directive from pa-badge

# 1.3.17 (2019-10-03)

- Fix change detection because of OnPush

# 1.3.16 (2019-10-03)

-  use coerceBoolean in spinner

# 1.3.15 (2019-10-02)

- Support multiple languages with fallback to english
- Use OnPush strategy

# 1.3.14 (2019-09-16)

- Fix translate pipe when key is null

# 1.3.13 (2019-09-11)

- Support icon+text buttons

# 1.3.12 (2019-09-11)

- Fix the translate directive

# 1.3.11 (2019-09-11)

- Cleanup

# 1.3.10 (2019-09-11)

- Fix translate in tooltip

# 1.3.9 (2019-09-10)

- Better typings on button link event

# 1.3.8 (2019-09-09)

- Created translate pipe and directive

# 1.3.7 (2019-09-09)

- Add aria-label on remove button

# 1.3.6 (2019-09-04)

- Updating pa-textarea with latest changes on onna-textarea

# 1.3.5 (2019-09-04)

- pa-icon improvements: small, color, setters

# 1.3.4 (2019-09-04)

- Support traversing on button link

# 1.3.3 (2019-09-03)

- Fix prod build: don't try to access protected property in template

# 1.3.2 (2019-09-03)

- Improve performances by using setters instead of ngChanges on Input and badges

# 1.3.1 (2019-08-01)

- Remove password strength from generic input
- Add theming to inputs
- Fix label sliding on input

# 1.3.0 (2019-06-17)

- Upgrade to Angular 8

# 1.2.13 (2019-06-16)

- Add simple pagination component (displaying always all pages)

# 1.2.12 (2019-06-15)

- o-sr doesn't exists in pastanaga, pa-sr does

# 1.2.11 (2019-06-14)

- Changed color of badge deletion button to secondary and vertically aligned

# 1.2.10 (2019-06-11)

- Adjust pa-expand margin

# 1.2.9 (2019-05-31)

- Removed white space wraps in pa-button

# 1.2.8 (2019-05-14)

- Removed font size changed when resizing the window

# 1.2.7 (2019-05-09)

- Support lessen style on input and select

# 1.2.6 (2019-05-06)

- Fix pa-expand style: don't display box shadow around header when expand is opened

# 1.2.5 (2019-04-30)

- Translate badges labels

# 1.2.4 (2019-04-29)

- Add smaller button size named `tiny`

# 1.2.3 (2019-04-19)

- Support error badges, and improve pa-badge themability

# 1.2.2 (2019-04-16)

- Put shadow on expand component itself

# 1.2.1 (2019-04-16)

- Fix Animation module import

# 1.2.0 (2019-04-16)

- Expand/collapse section

# 1.1.7 (2019-04-15)

- Add an optional offset to tooltip top position

# 1.1.6 (2019-04-14)

- Upgrade angular-svg-icon, add more tests

# 1.1.5 (2019-04-08)

Theming: Fix destructive color overwrite on accented buttons

# 1.1.4 (2019-04-08)

Fix tests

# 1.1.3 (2019-04-06)

Setup Jest and use Travis

# 1.1.2 (2019-04-01)

Restore `onClick` on pa-button-link (as default `click` gets skipped by routing)

# 1.1.1 (2019-04-01)

Theming: Fix overwriting on button and legend styles

# 1.1.0 (2019-03-28)

Theming: SCSS variable overloading

# 1.0.1 (2019-01-16)

Enforce strictNullChecks and strictPropertyInitialization

# 1.0.0 (2019-01-16)

First release
