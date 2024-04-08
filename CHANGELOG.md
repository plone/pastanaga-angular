# 2.65.11 (2024-04-08)

### Improvements

- **Radio groups**:
  - Display radio with a background different for odd and even items by default when there are more than 2 radios in the group
  - Display a different background color on hover
  - Replace flex gap by a padding on radio items
  - Add `noBackground` option to prevent the background to be shown on the radios
- **Radio**: Add `popoverHelp` option allowing to display help on a popover when hovering an `info` icon on the right of the radio label
- **Popover**: Set a min-width to prevent popover displayed on the side to be too small.

### Bug fix

- **Popover**: fix border-radius to be the same as popups
- **Date picker**: fix bad typing used in input change detection

# 2.65.10 (2024-04-05)

### Bug fix

- **Dropdown**: when the dropdown is included in a container with `position: fixed` (like in a modal for instance), and in a scrollable container, we automatically close the dropdown on scroll event to prevent the dropdown to move while scrolling.

# 2.65.9 (2024-04-05)

### Bug fix

- **Toggle**: Use the same font-size and line-height as checkboxes (using `$font-size-checkbox-label`, `$line-height-checkbox-label` tokens).

# 2.65.8 (2024-04-04)

### Bug fix

- **Table**: Fix border radius of `pa-table-cell-menu` when `pa-table-row-header` is the last child

# 2.65.7 (2024-04-02)

### Bug fix

- revert previous fix on table header

# 2.65.6 (2024-04-02)

### Bug fix

- **Table**: Fix z-index of `.pa-table-grid--header` to prevent table content to go over the header when scrolling

### Improvements

- Upgrade to angular 17.3.2 (fix dependabot issue)

# 2.65.5 (2024-03-29)

### Improvements

- **Buttons**: Remove the min-width set on the buttons
- **Typography**: Create mixin for each typography class, so it can be used in any other class.
- **Toggle**: Make sure toggle label is always vertically aligned
- **Select**: Adjust `popupVerticalOffset` on select component to place the dropdown right below the input
- **Popup** and **Dropdown**: Add `sameWidth` attribute to `popupComponent`, allowing to manage properly the `max-width` applied in Dropdowns.

### Bug fix

- **Table**: Fix border radius of `pa-table-cell` when `pa-table-row-header` is the last child 

# 2.65.4 (2024-03-19)

### Bug fixes

- **Table**: Prevent round corners for cells in the middle of the table

# 2.65.3 (2024-03-19)

### Bug fixes

- **Table**: Fix button height in table header

### Improvements

- **Chip**: Fix demo page where there was a closable chip in the basic examples
- **Table**:
  - Add an option `noBackground` on both `pa-table-header` directive and `pa-table-sortable-header` component
  - Add an option `border` on the table

# 2.65.2 (2024-03-19)

### Bug fixes

- **Chip**: Fix button height in closeable chips


# 2.65.1 (2024-03-18)

### Bug fixes

- **Button**: fix alignment of text inside buttons in Chrome

# 2.65.0 (2024-03-18)

### Breaking changes

- **Buttons**: change how the buttons sizes are computed and update the tokens accordingly.
  - `$dimension-button-{size}` is renamed into `$height-button-{size}`. The button height is no longer depending on button’s padding and line-height, instead button’s height is defined by `$dimension-button-{size}` tokens.
  - `$padding-button-{size}` is renamed into `$padding-sides-button-{size}`. Vertical padding is no longer needed now button’s height is defined with a token.
  - `$padding-button-icon-text-{size}` is split into `$padding-left-button-icon-text-{size}` and `$padding-right-button-icon-text-{size}`.

### Improvements

- **Toggle**: tokenize toggle style, so it can be easily overridden
- **Buttons**: add specific button border tokens for icon buttons 
- **Chips**: tokenize chip padding, so it can be easily overridden

### Bug fixes

- **Text fields**:
  - go back to normal border of fields, as the custom border top trick was not working well and preventing to use bigger border-radius
  - use same border-radius inside the input as in the field to prevent input background color to go over the borders 

# 2.64.9 (2024-03-11)

### Improvements

- **Card**: tokenize card style, so it can be easily overridden

# 2.64.8 (2024-02-20)

### Improvements

- **Expander**: 
  - Fix expander style to allow having a card expander inside a "normal" expander.
  - Fix `expanded` option to work on card expander (allowing to have the expander open by default also for card expander)

# 2.64.7 (2024-02-15)

### Improvements

- **Security**: Fix dependabot issues

# 2.64.6 (2024-02-12)

### Bugfixes

- **Text field**: when the field was programmatically disabled while the focus was in, the field still had the focus state (even though it didn't have the focus) when the field was then enabled again.
To prevent this bug, we now call `blur` on the field on `setDisableState` method.

# 2.64.5 (2024-01-29)

### Improvements

- **Textarea**: add resizing event triggered by resizable textarea 

# 2.64.4 (2024-01-04)

### Bugfixes

- **Tooltip**:
  - Fix tooltip position when directive parent has `container-type: size`
  - Display tooltip from dropdown option on the first hover event
  - Prevent tooltip content to be duplicated
- **Ellipsis Tooltip**:
  - Update ellipsis tooltip in options when dropdown is displayed
  - Add `noEllipsis` option to disable the ellipsis tooltip if needed: we cannot optionally add ellipsis tooltip directive,
but in some components like checkbox, we need the ability to display an ellipsis or not.
`noEllipsis` option allows to use `paEllipsisTooltip` and optionally disable it.    
- **Checkbox**: Display a tooltip when the label has en ellipsis

# 2.64.3 (2023-12-19)

### Improvements

- **Icons**: New `SPRITE_CACHE_VERSION` injection token allowing to manage the cache version of svg sprite

### Bugfix

- **Popup**: Fix popup position when one of the popup’s parent has `container-type: size`

# 2.64.2 (2023-12-12)

### Bugfix

- **Option**: Don't display icon when there is no icon set

# 2.64.1 (2023-12-11)

### Bugfix

- Fix option side padding

# 2.64.0 (2023-12-11)

### Breaking change

- **paEllipsisTooltip**: Rename `content` attribute to `paEllipsisContent`

### Bugfix

- **Select**: Use `paEllipsisTooltip` and `paEllipsisContent` to properly display long selected value
- **Option**: Use `paEllipsisContent` to properly display the tooltip on hover when the option has an ellipsis 

# 2.63.3 (2023-12-11)

### Bugfix

- Add `ChipComponent` in index.ts to fix the library build
- Update peer dependencies declaration to angular 17

# 2.63.2 (2023-12-11)

### Improvements

- **Side nav**: tokenize side nav background color

# 2.63.1 (2023-11-28)

### Improvements

- **Tabs**: tokenize tab slider height, and make it 2px by default
- **RadioGroup**: 
  - Improve the radio-group style by using flexbox with a gap (default to 8px between each radio, can be overridden using the `$gap-radio-group` token)
  - Add a class `horizontal-group` changing the flexbox direction to row
- **Radio**: Add `noEllipsis` option to radio component

### Security

- Remove `jest-preset-angular` dependency, which is not used anymore and has a security vulnerability  

# 2.63.0 (2023-11-21)

### Breaking changes

- Upgrade Angular to v17
- No more `noCloseButton` option on `closeableChip` component. Use basic `pa-chip` component instead.
- On fields, `showAllErrors` is now false by default

### Improvements

- Use new Angular control flow syntax
- **Button**: Icon size is now the same as button size by default, and can be overridden with `iconSize` property

### Bugfixes

- **Popover**: Fix popover arrow left and right background color

# 2.62.7 (2023-11-17)

### Bugfix
- **Text fields**: Add missing token for select field’s chevron top position

# 2.62.6 (2023-11-17)

### Improvement
- **Text fields**: tokenize text fields height and padding so we can easily override them

# 2.62.5 (2023-11-03)

### Bug fix
- **date-picker**: Fix input initialization

# 2.62.4 (2023-08-17)

### Security fixes

- Bumps word-wrap from 1.2.3 to 1.2.4.
- Update Angular to version 16.2.1
- Update ng-mocks, ng-packagr, jest, and prettier

# 2.62.3 (2023-06-22)

### Improvement
- **Radio**: Support help on radio buttons 

# 2.62.2 (2023-06-16)

### Bug fix
- **Slider**: Fix slider style (which wasn't working on webkit browsers)

# 2.62.1 (2023-06-13)

### Improvements
- **Slider**:
  - Support reactive forms by extending `PaFormControlDirective`
  - Default to `min` value when no value is set
  - Improve style (more flexible + better state management)
- **PaFormControlDirective**: 
  - factorize `errorMessages`, `help` and `describedById` as well as `_checkDescribedBy` method (which were defined on a lot of form fields components)
  - mark for changes when control status changes
- **Checkbox**: add support for help message in `pa-form-field-hint`
- Form fields documentation improvements
- Align `.editorconfig` with prettier config

# 2.62.0 (2023-06-09)

### Breaking changes
- Upgrade to angular 16
- Update tests tooling accordingly: 
  - upgrade @angular-builders/jest to v16
  - upgrade Jest to v29
  - upgrade jest-preset-angular to v13.1
  - upgrade @ngneat/spectator to v15
  - upgrade ng-mocks to v 14.10
- Update Prettier configuration for better standards

# 2.61.12 (2023-06-09)

### Bugfix
- **Modal**: do not try to observe on `modalContent` when it's not present [mpellerin42]

# 2.61.11 (2023-06-08)

### Improvements
- **Modal**: [mpellerin42]
  - modal advanced: Set `max-width` to `80vw` when option `fitContent` is set
  - update `hasScrollbar` (allowing to display a line above the footer when the content is scrollable) on content resize

# 2.61.10 (2023-06-06)

### Bug fixes
- **date-picker**: [mpellerin42]
  - Fix date format validator 
  - Add missing support for `externalLabel` option
  - Use translate pipe instead of directive for years and month selector translations (because translate directive doesn't work on all contexts)

# 2.61.9 (2023-06-06)

### Bug fixes
- **pa-input**: fix type of value returned by `pa-input[type=number]` to be `number` as expected [mpellerin42]

# 2.61.8 (2023-06-05)

### Bug fixes
- **date-picker**: [mpellerin42]
  - Prevent `setDate` to be called infinitely when a date is set from the FormControl
  - Fix highlight of selected date
  - Fix ability to clear the date

# 2.61.7 (2023-06-02)

### Bug fixes
- **date-picker**: [mpellerin42]
  - Prevent `setDate` to be called infinitely after selecting a date
  - Make sure the date selected is returned in UTC without changing the actual date because of a timezone difference.

# 2.61.6 (2023-06-02)

### Bug fixes
- **date-picker**: Fix prefilled date-picker display [mpellerin42]
- **Radio documentation page**: Fix disabled radio group [mpellerin42]

# 2.61.5 (2023-05-15)

### Improvements

- Replace deprecated `ComponentFactoryResolver` in `ModalService`, `ToastService` and `TooltipDirective` [mpellerin42]
- **Toast**: [mpellerin42]
  - Prevent toast container to capture clicks 
  - Add ability to close toasts by pressing escape

# 2.61.4 (2023-04-27)

### Bug fixes

- **Text fields**: [mpellerin42]
  - Fix border top right position
  - Fix border top color when field is disabled
- **Avatar**: Improve typing [mpellerin42]

# 2.61.3 (2023-04-25)

### Improvements

- **Modal advanced**: add `fitContentHeight` option to advanced modal, when true it fits its content height  [operramon]

# 2.61.2 (2023-04-18)

### Improvements

- **Modals**: [mpellerin42]
  - improve alignment of the close button of modal advanced header
  - add some margin to dialog content when there's no footer on modal dialog

# 2.61.1 (2023-04-06)

### Improvements
- **Modals**: add a border on top of the footer when the content overflow [mpellerin42]
- **Modal advanced**: add `fitContent` option to advanced modal, when true we don't set the modal width, so it fits its content width [mpellerin42]

### Bug fixes
- **Modals**: fix modal style so the dropdowns are properly positioned in their content [mpellerin42]
- **Text fields**: increase the delay before computing label width to prevent the label to be crossed by the top border [mpellerin42]

# 2.61.0 (2023-04-04)

### Feature
- New **Typeahead select** component: it is like a `pa-select` component on which you can start typing to find the option you're looking for. [mpellerin42]

### Improvements
- Update angular to version 15.2.5 [mpellerin42]


# 2.60.1 (2023-04-04)

### Improvements

- **Table**: Fix typing for stricter compiler [mpellerin42]
- **CI/CD**: Upgrade to nodejs 18 [mpellerin42]

# 2.60.0 (2023-04-03)

### Improvements
- **Dropdown documentation**: add example on how to build a dropdown list of checkboxes [mpellerin42] 

### Feature
- Slider component [operramon]

# 2.59.5 (2023-03-27)

### Improvements
- **Table** improvements [mpellerin42]
  - add center option to table cells
  - tokenize text-transform on header cells
  - add `ng-content` on `table-sortable-header` allowing the addition of free content on first column. This is specially useful when we want to have a first column made of checkboxes for instance.

# 2.59.4 (2023-03-21)

### Improvements
- Improve **table** theming [mpellerin42]
  - add tokens for spacing
  - add transition on background color change
  - add hoverable option on rows

# 2.59.3 (2023-03-17)

### Improvements

- Improve typings on select and tooltip [mpellerin42]

# 2.59.2 (2023-03-3)

### Bugfix
- Make sure base modal listen to onClose before user can close it [mpellerin42]

# 2.59.1 (2023-02-27)

### Bugfixes
- Add `styleIncludePaths` in `ng-package.json` (fix library build) [mpellerin42]
- Fix CDK text field style import in `input.component.scss` [mpellerin42] 

### Improvements
- Extract build command in a new `build.sh` script [mpellerin42]

# 2.59.0 (2023-02-27)

### Breaking change:

- Upgrade to Angular 15.2 [mpellerin42]
- Update peerDependencies to their latest version [mpellerin42]
  - rxjs ^7.8.0
  - date-fns ^2.29.3
  - @ng-web-apis/common ^2.1.0

# 2.58.14 (2023-02-27)

### Bugfix

- **Sortable table**: Fix `table-sortable-header-cell` component to update the icon when `enabled` changes [mpellerin42]

# 2.58.13 (2023-02-09)

### Bugfix

- **Text field**: Don't set fixed height for multiline fields [operramon]

# 2.58.12 (2023-02-07)

### Bugfix

- **Expander**: Fix expander's content visibility when `card` input is set [operramon]

# 2.58.11 (2023-01-26)

### Improvements

- **Expander**: [mpellerin42]
  - Add tokens allowing to change default expander theme
  - Add `emitOnly` and `expanded` options allowing accordion use case
  - Update the documentation accordingly

# 2.58.10 (2023-01-13)

### Bugfix

- **Text field**: Fix top border on firefox (which was broken by 2.58.7 fix for chrome) [mpellerin42]

# 2.58.9 (2023-01-12)

### Bugfix

- **Radio fields**: Fix (again) style when radio is checked and disabled [ebrehault]

# 2.58.8 (2023-01-11)

### Bugfix

- **Radio fields**: Fix style when radio is checked and disabled [ebrehault]

# 2.58.7 (2023-01-10)

### Bugfix
- **Text fields**: Fix text field label position on chrome autofilled fields [mpellerin42]

# 2.58.6 (2023-01-06)

### Improvement
- **Checkbox**: Add `noEllipsis` option [mpellerin42] 

# 2.58.5 (2023-01-02)

### Bugfix
- **Popover / Popup**: when a popover is set on a button which has an `active` state set programmatically, don't remove the active state when closing the popup [mpellerin42]

# 2.58.4 (2022-12-26)

### Improvements
- **Popover**: [mpellerin42]
  - Move popover style to global + tokenize its colors
  - Fix popover position when parent is using flex
  - Add method to open popover programmatically
  - Add `paPopoverOffset` Input to define a specific vertical offset
  - Replace popover `width` by `max-width` to prevent large popover when content is quite small

# 2.58.3 (2022-12-19)

### Improvements
- **Typography**: Remove useless class in typography documentation
- **Theme**: [mpellerin42]
  - Add tokens for side nav item font-size and item height
  - Add token for button font-size

# 2.58.2 (2022-12-13)

### Bug fix
- **Text area**: [mpellerin42]
  - Prevent repetition of resize icon when text area in error
  - Prevent top border to disappear when pressing the resize icon on chrome
- **Select**: Prevent top border to disappear when mouse is down while clicking on the dropdown [mpellerin42]
- **Text fields**: Make sure text field height is always the same for one line fields [mpellerin42]

### Improvements
- Add error example and fix a typo on textarea documentation page

# 2.58.1 (2022-12-12)

### Bug fix
- **Select**: Fix select spacing to be same height as other fields [mpellerin42]

# 2.58.0 (2022-12-08)

### Breaking changes
- Text fields: [mpellerin42]
  - No more background color on text fields by default
  - Improve text field border so label doesn't require a background color and border keep space for the label on active and focus states
  - Replace border-text-field tokens by border-color-text-field token
  - Text field borders management:
      - No more borders on input themselves
      - Add a new `pa-field-container` carrying the classes for all the states (error, disabled, readonly, focus, has content)
      - No more background required on labels to have them displayed over the top border
  - Replace border-text-field tokens by border-color-text-field tokens
  - Use this new style structure on all our fields (input, textarea, select)
  - New `TextFieldDirective` managing label width as well as focus and content states
  - Update label position to be properly aligned with the top border
    - Add `rhythm(3.5)` value in rhythm map
    - Add class `no-internal-label` to remove the label space from the top border when label width is 0

### Improvements
- Add autofilled input example [mpellerin42]
- Text fields: [mpellerin42]
  - Add `pa-field-icon` class on input icon to prevent style leak 
  - Add `externalLabel` input on `TextFieldDirective` (used by all text fields)
- Toggle: [mpellerin42]
  - add `labelOnRight` option
  - improve style (spacing, help, cursor state)
  - improve documentation
- Typography: Add `xs` support for line-height [mpellerin42]

### Dependencies
- Bumps loader-utils from 2.0.2 to 2.0.3 [Dependabot]

# 2.57.2 (2022-11-07)

### Pipeline Maintenance
- Update GitHub actions to use node 16 [mpellerin42]

# 2.57.1 (2022-10-21)

### Bug fix
- **Tabs**: Remove tab item extra padding [mpellerin42]

# 2.57.0 (2022-10-21)

### Breaking Changes
- **Tabs**: [mpellerin42]
  - Remove option `displayAsTabOnMobile`: tabs are always displayed as tabs for all breakpoints 
  - Rename `$tab-menu-item-padding-mobile` and `$tab-menu-item-padding-desktop` tokens into `$padding-tab-item-small` and `$padding-tab-item-medium` to follow our naming convention 

### Improvements
- **Tabs**: [mpellerin42]
  - Add scss tokens to improve tabs theming
  - Add `noSlider` option to tab list

# 2.56.0 (2022-10-18)

### Breaking Changes
- **Popup directive**: [mpellerin42]
  - rename `popupOnRight` into `alignPopupOnLeft` to align the attribute name with its behavior
  - rename `popupMargin` into `popupVerticalOffset` to align the attribute name with its behavior
  - implement `popupOnRight` with a behavior aligned to its name: when true the popup is positioned on the right of the directive element
  - CSS position is now fixed instead of absolute 

### Documentation improvements
- **Popup**: [mpellerin42]
  - Add documentation for `popupOffset` attribute
- **Dropdown**: [mpellerin42] 
  - Fix and document multi-level dropdown demo (`keepOthersOpen` attribute was missing)
  - Add popup usage section in dropdown usage
  - Improve global look and feel of dropdown documentation page

# 2.55.6 (2022-09-19)

### Bug fix
- **Radio group**: Fix radio checked state when belonging to radio group [mpellerin42]

# 2.55.5 (2022-09-16)

### Bug fix
- **Radio group**: mark radio group control as dirty when a radio change event is emitted [mpellerin42]

# 2.55.4 (2022-09-16)

### Bug fix
- **Radio group**: wait for radios to be on the DOM before applying group name and value [mpellerin42]

# 2.55.3 (2022-08-17)

### Bug fix
- **Popup**: close all popups when opening a new one and `keepOthersOpen` is false [mpellerin42]

# 2.55.2 (2022-08-16)

### Improvements
- **Modals**: [mpellerin42]
  - **service**: make sure to trigger detectChanges after instantiation of the modal
  - **style**: compute modal z-index based on z-index of the modal backdrop
- **Confirmation dialogs**:  [mpellerin42]
  - add `cancelAspect` option in `ConfirmationData`
  - add `onlyConfirm` option in `ConfirmationData`
- **Radio groups**: add `display: block` on `paRadioGroup` directive [mpellerin42]

# 2.55.1 (2022-08-16)

### Bug fix
- Fix pa-option usage with pa-select importing only PaTextFieldModule [mpellerin42]

### Improvements
- Improve button link documentation [mpellerin42]
- Improve icon documentation [mpellerin42]

# 2.55.0 (2022-08-05)

### Feature
- **Radio** and **radio-group**: Add a radio component and a radio-group directive. [mpellerin42]

# 2.54.3 (2022-08-04)

### Improvements
- **Expander**: [mpellerin42]
  - Add `buttonOnlyToggle` option preventing the expander to toggle when clicking on the title
  - Don't display empty extra side block on expander's header
  - Improve expander documentation
- **Popup**: Add documentation for `keepOthersOpen` input [mpellerin42]
- **Dropdown**: Add documentation for multi-level dropdowns [mpellerin42]

### Bug fix
- **Dropdown**: Remove the extra space on the right of the option when `iconOnRight` is set [mpellerin42]

# 2.54.2 (2022-08-02)

### Improvements
- **Buttons**: [mpellerin42]
  - Add style in _button.scss for button wrapping links
  - Improve button documentation

# 2.54.1 (2022-07-06)

### Bug fix
- **Toasts**: Fix text alignment in toasts without icon nor button [mpellerin42]

### Improvements
- **Toasts**: Add a token allowing to change the padding when there is a button [mpellerin42]

# 2.54.0 (2022-07-05)

### Breaking changes
- **Toasts**: [mpellerin42]
  - refactor toast config: `buttonLabel` and `action` are replaced by a `button` property containing the button configuration (this button configuration is including `label` and `action` properties)
  - `toastStatus` observable was useless and has been removed

### Improvements
- **Toasts**: [mpellerin42]
  - add tokens defining toasts spacing
  - add tokens defining toast button background colors
  - add optional title and autoClose options to toasts
  - refactor toast template and style using pa-button
  - update the documentation

### Bug fix
- **Glyphs**: add missing `warning` glyph [mpellerin42]
- **Icon demo**: fix the configuration, so we can reset icon and background colors [mpellerin42]

# 2.53.0 (2022-07-01)

### Improvement
- New set of glyphs from [quanta-icons](https://github.com/plone/quanta-icons) [mpellerin42]

### Bug fix
- **Translate**: [mpellerin42]
  - `getValue` is now always returning a string: either the translation found, either the key
  - `getValue` will throw an error if `args` parameter is not an object

# 2.52.3, 2.52.4  and 2.52.5 (2022-07-01)

### Bug fix
- Fix demo deployment [mpellerin42]

# 2.52.2 (2022-07-01)

### Improvements
- **Documentation**: [mpellerin42]
  - improving README
    - Add Table of content
    - Add Setup and configuration section
    - Fix outdated links and references
  - moving demo to the root, so it is now accessible at https://plone.github.io/pastanaga-angular/. This should fix the routing and reloading problem.
- **Typography**: Adding tokens allowing to override Pastanaga typography rules

# 2.52.1 (2022-06-29)

### Improvements
- **Buttons**: [mpellerin42]
  - Update size of large button based on their padding instead of based on their line-height
  - Add iconSize option on buttons
  - Improve example section of button documentation page

# 2.52.0 (2022-06-27)

### Breaking changes
- Remove all translation keys not used by pastanaga components from Pastanaga's internal translation file [mpellerin42]

### Improvements
- upgrade rxjs to version 7 [mpellerin42]
- **Translate**: [mpellerin42]
  - Translation files can be flat or hierarchical (or a mix of both)
  - Pipe refactoring so translations and lang can be updated dynamically
  - Provide default empty values for PA_LANG and PA_TRANSLATIONS injection tokens
  - Fix dynamic translations when using translate directive 

# 2.51.2 (2022-06-21)

### Fix
- fix build: specify project to build now angular 14 removed default project from angular.json [mpellerin42]

# 2.51.1 (2022-06-21)

### Improvements
- **Dropdown**: add ability to change the background color of destructive dropdown options [mpellerin42]

# 2.51.0 (2022-06-21)

### Breaking changes
- Migration to Angular 14 [mpellerin42]

# 2.50.7 (2022-06-17)

### Improvements
- **Text fields**: [mpellerin42]
  - Add better demo for inputs and select error state
  - Add token for changing the background color of text fields for error state

# 2.50.6 (2022-06-17)

### Fix
- **Icon demo**: load the icon list from a typescript file instead of a json one [mpellerin42]
- **icon_list**: new script generating the icon list in typescript from the sprite svg [mpellerin42]

# 2.50.5 (2022-06-16)

### Fixes
- Fix repo URL in package.json [mpellerin42]
- Fix compilation errors when included as lib in a new Angular 13.3.0 project [mpellerin42]
- Fix side nav item header's color [mpellerin42]
- Fix background color for disabled inverted solid buttons [mpellerin42]
- Fix expandable chips: don't trigger expanded event on disabled chip [mpellerin42]
- Fix documentation: [mpellerin42]
  - Fix the description and add documentation on expandable chips
  - Fix some typos in modal documentation

### Improvements
- **Typography**:  [mpellerin42]
  - Add typography demo page
  - Add a class with `-mobile` suffix on all typography classes which are different on mobile and larger screens, so we can display how they render on desktop.
- **Button**: [mpellerin42]
  - Add a CSS transition on button color
  - Tokenize button icon border radius
- **Demo**: Improve readability of usage by using a darker neutral color for `small` tags [mpellerin42]
- **Checkboxes**: Add tokens for checkbox disabled colors [mpellerin42]
- **Scrollbars**: Add tokens for scrollbar border radius and distinction between active and inactive state [mpellerin42]
- **Chips**: [mpellerin42]
  - Tokenize chip colors and borders
  - Add `backgroundColor`, `textColor` and `borderColor` inputs to all the chips

# 2.50.4 (2022-06-13)

### Improvements:
- **Date picker**: customizable label (placeholder) [dgsmith2]
  - Accepts text as well as key to be processed by `TranslatePipe`

# 2.50.3 (2022-05-25)

### Improvements:
- **Date picker**: subclass `PaFormControlDirective` and demo [dgsmith2]

# 2.50.2 (2022-05-24)

### Improvements:
- **Date picker**: add calendar icon [mpellerin42]
- **Input**: add iconOnRight option [mpellerin42]

# 2.50.1 (2022-05-23)

### Fixes
- **Select**: Fix error state: red border but grey label when not expanded [mpellerin42]
- **Text fields**: Lighter border color when the field is not active [mpellerin42] 

# 2.50.0 (2022-05-20)

### Breaking changes:
- **Table sortable header**: viewport mode is now an input instead of coming directly from breakpoint observer [mpellerin42]

### Improvements:
- Better documentation for table components and directives [mpellerin42]

# 2.49.1 (2022-05-18)

### Fix
- npm deps update to fix the publish step of Pastanaga workflow [mpellerin42]

# 2.49.0 (2022-05-18)

### Breaking changes:
- **Demo**: replace traversing by routing in the demo [mpellerin42]


# 2.48.0 (2022-05-07)

### Feature
- Date picker component [dgsmith2]

# 2.47.1 (2022-05-09)

### Improvements
- Update dependencies: [mpellerin42]
  - @angular: 13.3.6
  - @ngneat/spectator: 10.0.1
  - ng-mocks: 13.5.1
  - @briebug/jest-schematic: 4.0.0
  - @ng-web-apis/common: 2.0.0

# 2.47.0 (2022-05-05)

### Feature
- **Layout**: add a dock+wide layout [mpellerin42]

### Breaking changes:
- **Sidenav**: `pa-side-nav-content` doesn't wrap the content projection into an `ul` anymore. [mpellerin42]


# 2.46.1 (2022-05-05)

### Improvements
- Manually update dependencies [barcafa]

# 2.46.0 (2022-05-04)

### Breaking changes
- Removal of variable `$color-neutral-strong` and color `$_steam` [barcafa]
- Downscale of all greys to have only 4 [barcafa]

# 2.45.6 (2022-05-02)

### Improvements
- **Text fields**: Prevent read-only style to override disabled one [mpellerin42]

# 2.45.5 (2022-04-28)

### Improvements
- Added unit tests to Toast Component [luispalomo]

# 2.45.4 (2022-04-25)

- update `icon_list` script to use python3 as python 2 is not provided in Mac OS X package anymore [mpellerin42]

# 2.45.3 (2022-04-12)

### Improvements
- Add dual button styling for buttons [barcafa]

# 2.45.2 (2022-04-07)

### Improvements
- Add new `sync` symbol [raul-onna]

# 2.45.1 (2022-03-14)

### Style changes
- Modal dialog header's image, title and description changes: [faustoona]
    - ***centered aligned*** when the modal has an image;
    - ***left aligned*** when the modal doesn't have an image;
    - setting title size to medium;
    - setting description top margin to 12px;

# 2.45.0 (2022-03-14)

### Breaking changes
- `DATE_FORMAT` enum changed into `DateFormat` type [mpellerin42]
- `Size`, `Aspect`, `Kind` enums changed into types [mpellerin42]

### Improvements
- **Stricter compiler option**: [mpellerin42]
  - replace fullTemplateTypeCheck by strictTemplates
  - add noPropertyAccessFromIndexSignature compiler option

# 2.44.5 (2022-03-11)

### Bugfix
- **Select**: Fix on hover styling for chevron icon [barcafa]

# 2.44.4 (2022-03-09)

### Bugfix
- Restore the license [ebrehault]

# 2.44.3 (2022-03-09)

### Improvements
**Dropdown**: [barcafa]
  - Add a new property `iconOnRight` to display an icon to the right on a dropdown option

# 2.44.2 (2022-03-07)

### Bugfix
- **Side nav**: fix active item's font-weight [mpellerin42]

# 2.44.1 (2022-02-25)

### Bugfix
- **Documentation**: fix side nav on the demo pages to prevent it to disappear when scrolling the page content [mpellerin42]

# 2.44.0 (2022-02-24)

### Breaking changes
- **Side nav**: [mpellerin42]
  - improve support for custom header
  - no more footer supported in sidenav

# 2.43.3 (2022-02-11)

### Improvements
- **Side nav menu**: Improved and fix some minor issues in style [mpellerin42]
- **Demo**: Add a filter input in the demo side nav [mpellerin42]

# 2.43.2 (2022-02-02)

### Bugfix
- **Text fields**: Adjust the label position when the field is active [mpellerin42]

# 2.43.1 (2022-01-31)

### Bugfix
- **Select**: component should close when blur event is triggered by keyboard [jCarret]

# 2.43.0 (2022-01-28)

### Improvements
- **Side nav menu**: updating style, animation (it opens from the left now) and removing deprecated input (icon and inverted) [faustoonna]

# 2.42.1 (2022-01-21)

### Bugfix
- **Translate demo**: don't import pastanaga variable in demo page to prevent compilation error on projects extending pastanaga documentation [mpellerin42]

# 2.42.0 (2022-01-13)

### Breaking change
- Upgrade to Angular 13 [ebrehault]

# 2.41.1 (2022-01-11)

### Bugfix
- **Translation**: fix translation by attribute like `<span translate="translation-key"></span>` [mpellerin42]

### Improvements
- Increase test coverage on translate directive and pipe [mpellerin42]

# 2.41.0 (2022-01-11)

### Improvements
- **TranslateService**: Allow changing current language of the application [mpellerin42] (based on [rboixaderg] feature on pastanaga 1)
- **Select**: Fix style (which has been broken on version 2.40.1) [mpellerin42]

### Breaking changes
- **TranslatePipe**: constructor now uses TranslateService instead of `PA_LANG` string [mpellerin42] (based on [rboixaderg] feature on pastanaga 1)

# 2.40.1 (2022-01-07)

### Improvements
- **Input**: Add optional icon to input fields [mpellerin42]

# 2.40.0 (2022-01-06)

### Breaking changes
- Revert all changes done on the select dropdown position (revert version 2.38.7, 2.38.6, 2.38.5 and 2.38.4) [mpellerin42]

### Bugfix
- **Select**: Close the select on option selection [mpellerin42]

# 2.39.4 (2022-01-04)

### Bugfix
- **Card**: trigger `cardClick` event when pressing enter on a focused card [mpellerin42]

# 2.39.3 (2021-12-09)

### Bugfix
- **Native text field**: fixed error state not displayed with updateOn blur [jCarret]

# 2.39.2 (2021-11-17)

### Improvement
- **Form field hint**: translate form field hints [mpellerin42]

# 2.39.1 (2021-11-10)

### Feature
- **Card**: New generic card wrapper component [mpellerin42]

# 2.39.0 (2021-11-03)

### Improvements
- Upgrade dependencies, including Angular to the latest version (12.2.0) and Jest to the latest version (27.3.1) [mpellerin42]
- Update angular and typescript configuration to the latest standards [mpellerin42]
- Fix scss compilation errors [mpellerin42]
- Improve import paths in pastanaga demo [mpellerin42]
- Fix most of the code smells found by sonar [mpellerin42]
- **Select**: Remove the debounce so the dropdown follows the select on scroll [mpellerin42]

# 2.38.7 (2021-11-02) 

### Improvements
- **Dialog** updating `--containerTranslateY` value when dialog's height changes. [faustoonna]

# 2.38.6 (2021-10-29)

### Bugfix
- **Dialog** fixing Document token injection. [faustoonna]

# 2.38.5 (2021-10-28)

### Improvements
- **Dialog**: Dialog TranslateY affects fixed position children, in order to patch this behaviour we expose the dialog top position in computed styled properties (`--containerTranslateY`). [faustoonna]
- **Select**: reverting previous changes, calculating the popup position on scroll and on toggle (taking in consideration the container offset y if available). [faustoonna] 
- **PopupDirective**: managing `popupPosition` with setter and getter. It updates the popup style when the input value changes. [faustoonna]

# 2.38.4 (2021-10-20)

### Improvements
- **Select**: Add `optionsPosition` input to select component to apply custom position on dropdown options [faustoonna]


# 2.38.3 (2021-10-12)

### Improvements
- **Popup**: Add `keepOthersOpen` input to popup component to control if other popups should be closed or not when current one is opened [mpellerin42]


# 2.38.2 (2021-10-11)

### Improvements
- **Documentation**: Improve list style in description section [mpellerin42]

# 2.38.1 (2021-10-06)

### Improvements
- Scss token files consistency: add `.tokens` suffix to all scss token files for consistency and readability [mpellerin42]

# 2.38.0 (2021-10-01)

### Breaking changes
- **Colors**: Don't name color categories with a real color name [mpellerin42]
  - Rename `$color-black` to `$color-dark-stronger`
  - Rename `$color-white` to `$color-light-stronger`

### Bugfix
- Fix white checkbox selected mark: use hexadecimal color code instead of HSL for white to prevent SASS to convert it into the keyword `white` [mpellerin42] 

### Improvements
- Update palette documentation page [mpellerin42]

# 2.37.1 (2021-09-30)

### Bugfix
- **Popup**: replace `markForCheck` by `detectChanges` on `close` method so the UI is properly refreshed when it is called from an observable [mpellerin42]

# 2.37.0 (2021-09-28)

### Breaking changes
- **Colors**: [mpellerin42]
  - Move black and white in their own color categories (which will carry alpha colors later)
  - Keep only one category of neutral colors (no more primary/secondary on their token name)
  - Simplify color token by removing the `accent` part for primary, secondary and tertiary colors 
  - Replace darker/dark/default variations by stronger/strong/regular

### Improvements
  - Update color documentation [mpellerin42]

# 2.36.26 (2021-09-14)

### Bugfix
- **Popup** / **Dropdown**: [mpellerin42]
  - Add a new popupType `menu` so popups and menus are closed on `closeAllPopups` event, while dropdowns are not
  - Set dropdown default `popupType` to `menu` instead of `dropdown`
  - Update dropdown `popupType` when dropdown `role` changes

# 2.36.25 (2021-09-13)

### Bugfix
- **Table**: don't display hover/active states on rows which are not clickable [mpellerin42]

# 2.36.24 (2021-09-13)

### Improvements
- **Popup**: [mpellerin42]
  - Close only popups (not dropdowns) when receiving `closeAllPopups` event
  - Decrease complexity in adjust popup method

# 2.36.23 (2021-09-02)

### Improvement
- **Ellipsis tooltip**: set updateEllipsisTooltip method public, so it can be called externally [mpellerin42]

# 2.36.22 (2021-09-02)

### Improvement
- **Modal advanced**: Compute content min-height to take all available space [mpellerin42]

# 2.36.21 (2021-09-01)

### Bugfix
- **TableSortableHeader**: fix sorting dropdown position [mpellerin42]

# 2.36.20 (2021-09-01)

### Bugfix

- **Button**: Reverting small size button's icon size to "medium" [faustoonna] 

# 2.36.19 (2021-09-01)

### Bugfix
- **Layout**: Fix layout footer gradient [barcafa]

# 2.36.18 (2021-08-31)
### Improvements
- **Button**: updating small size button styling [faustoonna]

# 2.36.17 (2021-08-26)

### Bugfix
- **Tables**: Fix styling for buttons inside tables [barcafa]

# 2.36.16 (2021-08-24)

### Bugfix
- **Popup**: Fix margin when using popupOnTop [mpellerin42]

# 2.36.15 (2021-08-20)

### Improvements
- **Modal dialog**: Increase the delay for setting modal header height on mobile [mpellerin42] 

# 2.36.14 (2021-08-13)

### Bugfix
- **Toggle**: Add margin between toggle and text [barcafa]

# 2.36.13 (2021-08-13)

### Improvements
- **Toasts**: Tokenize and update toast colors [mpellerin42]

# 2.36.12 (2021-08-13)

### Improvements
- **Avatar**: Allow overriding the tooltip displayed when hovering the avatar [mpellerin42]

# 2.36.11 (2021-08-10)

### Improvements
- **Distribute**: New scss variables to define the space between blocks of content [mpellerin42] 

# 2.36.10 (2021-07-22)

### Bugfix
- Change chevron expander color [barcafa]

# 2.36.9 (2021-07-10)

### Improvements
- Allow exporting standalone css [ebrehault]

# 2.36.8 (2021-07-05)

### Bugfix
- Fix library build one more time [ebrehault]

# 2.36.7 (2021-07-05)

### Bugfix
- Fix library build [ebrehault]

# 2.36.6 (2021-07-05)

### Improvements
- Restore skipped tests [ebrehault]
- Move pa-icon style to global [ebrehault]

# 2.36.5 (2021-07-05)

### Bugfix
- Fix input size to be 48px [mpellerin42]

### Improvements
- **Drodpown options**: translate option description [mpellerin42]
- **Toast**: Translate toast messages [mpellerin42]

# 2.36.4 (2021-06-30)

### Bugfix
- **Modal**:  Fix modal variables imports [mpellerin42]

# 2.36.3 (2021-06-28)

### Bugfix
- **Modal**: Fix modal positioning and header/footer visibility on safari [mpellerin42] 

# 2.36.2 (2021-06-28)

### Improvements
- **Infinite scroll**: more padding at infinite scroll bottom [ebrehault]

# 2.36.1 (2021-06-28)

### Improvements
- **Scrollable container**: [mpellerin42]
    - Automatically close all popups on scroll
    - Remove fading style on scrollbar
    - Improve scrollbar style: colors and dimensions

# 2.36.0 (2021-06-28)

### Feature
- **Popover**: New popover component – popup with arrow which is displayed on hover on desktop [mpellerin42]

### Breaking changes
- **Popup**: Remove `openOnHover` property from paPopup directive [mpellerin42]

### Improvement
- **Modal**: Update modal's footer to not be on top of potential popover [mpellerin42]

# 2.35.2 (2021-06-23)

### Bugfix
- **Table**: display pointer cursor on clickable table row [ebrehault]

# 2.35.1 (2021-06-23)

### Improvements
- **Modal**: Optional class for pa-modal to take all available space in height [mpellerin42]
- `pa-lead-image` class accessible outside tables [mpellerin42]

# 2.35.0 (2021-06-17)

### Feature
- **Scrollbar**: New paScrollableContainer directive styling scrollbars [mpellerin42]

### Improvement
- **Modal**: paScrollableContainer on modal's content [mpellerin42]

# 2.34.0 (2021-06-17)

### Improvements
- Upgrade to Angular 12 [ebrehault]

# 2.33.3 (2021-06-15)

### Improvements
- **Modals**: adapt content's margin-bottom to the presence of a footer [mpellerin42]
- **Modal advanced**: [mpellerin42]
    - footer with one button display it fullscreen on mobile and aligned on the right bigger viewport,
    - footer with two buttons display them taking the whole space

# 2.33.2 (2021-06-15)

### Improvements
- **Containers**: Supports a fixed footer in tight compact containers [ebrehault]

# 2.33.1 (2021-06-14)

### Improvements
- **Confirmation dialog**: Accept HTML on confirmation dialog description [mpellerin42]

### Bugfix
- **Confirmation dialog**: Emit `onClose` when closing the dialog [mpellerin42]

# 2.33.0 (2021-06-14)

### Feature
- **Ellipsis tooltip**: New Ellipsis tooltip directive [mpellerin42]

### Improvements
- **Avatar**: Add avatar input to avatar component [mpellerin42]
- **pa-option**: Add ellipsis tooltip on `pa-option` content and description [mpellerin42] 

### Bugfix
- **Select**: Fix change detection to display preselected option on pa-select [mpellerin42]

# 2.32.1 (2021-06-11)

### Improvements
- **Tooltip**: move style to global [ebrehault]

# 2.32.0 (2021-06-11)

### Breaking changes
- **Modal**: [mpellerin42]
    - `DialogComponent`
        - renamed `ModalDialogComponent` and corresponding selector `pa-modal-dialog`
        - displayed in fullscreen on small viewport
    - `ModalComponent`
        - renamed `ModalAdvancedComponent` and corresponding selector `pa-modal-advanced`
        - displayed in fullscreen on small viewport
        - Doesn't support `description` anymore 
    - `ModalConfig`:
        - suppression of the following options: `fullscreen`, `showOverlay`, `withCloseButton`
        - replacement of `blocking` by `dismissable`: all modals are dismissable by default
    - The backdrop overlay behind the modals is always visible

### Feature
- **Confirmation dialog**: [mpellerin42]
    - new confirmation dialog component
    - new `openConfirm` method in `ModalService` to open a confirmation dialog

### Improvements
- **Modal**: [mpellerin42]
    - modal internal spacing and sizes updated
    - in and out transition updated
    - out transition now properly triggered when closing a modal from the template

# 2.31.1 (2021-06-08)

### Bugs fixes
- **Containers**: set a max-width on containers for all screen sizes

### Improvements
- **Avatar pile**:  [mpellerin42]
    - Add `buttonAlwaysVisible` option to avatar pile component
    - Prevent clip mask to take space in avatar pile

# 2.31.0 (2021-06-04)

### Feature
- **Infinite scroll**: New infinite scroll component [mpellerin42]

# 2.30.4 (2021-06-01)

### Bug fix
- Fix library build [ebrehault]

# 2.30.3 (2021-05-31)

### Bug fix
- **Table**: add margin after table-lead-image [ebrehault]
- **Button**: no min-width for icon+text buttons [ebrehault]

# 2.30.2 (2021-05-31)

### Bug fix
- **Toggle**: update toggle state by clicking on its label [mpellerin42]

# 2.30.1 (2021-05-27)

### Bug fixes
- **Button**: Set pa-button host `display: inline-block` to fix button tooltip position [mpellerin42] 
- **Tooltip**: [mpellerin42]
    - Fix system tooltip positioning relative to the cursor: 16px below and 16px on the right of the cursor
    - Fix action and system tooltip position to take into account window scroll position
    - Fix tooltip position when element near the side of the screen to prevent the tooltip to cover the element

# 2.30.0 (2021-05-25)

### Features
- **Avatar pile**: New avatar pile component displaying a list of avatars [mpellerin42]
- **Dropdown option**: [mpellerin42]
    - New avatar option on dropdown options
    - New readonly option on dropdown options
    
### Improvements
- **Buttons**: Min width of 160px for text buttons [mpellerin42]
- **Dropdown**: [mpellerin42]
    - Set a max-height of 5.5 options so dropdown doesn't grow full screen
    - Remove internal padding on dropdowns
- **Tooltip**: Update duration so tooltips are displayed faster [mpellerin42]
- **Tokens**: Add generic duration tokens [mpellerin42]

# 2.29.7 (2021-05-19)

### Bugfix
- **Input Formatter**: Use `input` event [dgsmith2]

# 2.29.6 (2021-05-19)

### Improvements
- **Expander**: Added expandable card option to expander component [barcafa]

# 2.29.5 (2021-05-17)

### Bugfix
- **Toggle**: Fix toggle color [barcafa]

# 2.29.4 (2021-05-17)

### Bugfix
- **Toggle**: Fix toggle styling [barcafa]

# 2.29.3 (2021-05-06)

### Improvements
- **Tabs**: Enable row tabs on mobile [barcafa]

# 2.29.2 (2021-05-06)

### Improvements
- **Popup**: add active state on pa-button carrying the popup directive whenever the popup is opened [mpellerin42] 

# 2.29.1 (2021-05-05)

### BugFix
- **Select**: refresh displayed value when options change [ebrehault]

# 2.29.0 (2021-05-03)

### Breaking change
- **Theme**: `.pa-sr` renamed in `.pa-sr-only` [ebrehault]

### Improvements
- **Select**: `pa-select` supports dim mode [ebrehault]

# 2.28.1 (2021-04-22)

### BugFix
- **Typography**: Update d1-md token to prevent low and high characters from being cut [mpellerin42]

# 2.28.0 (2021-04-22)

### Breaking change
- **Translate**: [ebrehault]
    - Translations are now added from any module using the `addTranslations` static method
    - `mergeTranslations` is not available anymore
    
### BugFix
- **Sortable Table Header**: Prevent sortable table header mobile dropdown to impact table rows [mpellerin42]
- **Expander**: Update content height on expand to prevent overlap when window is resized while collapsed [mpellerin42]
- **Typography**: Update display line-height to prevent low and high characters from being cut [mpellerin42]

# 2.27.1 (2021-04-21)

### Bugfix
- **Tooltip**: Fix tooltip background color on safari [mpellerin42]

# 2.27.0 (2021-04-19)

### Improvements
- **Chip**: Added expandable chip [barcafa]

# 2.26.3 (2021-04-19)

### Improvements
- **Modal**: Add a fullscreen option on modal config to display fullscreen modal on mobile [mpellerin42]

### Bugfix
- **Expander**: Prevent expander content to go over following expand (even if invisible) [mpellerin42]

# 2.26.2 (2021-04-16)

### Improvements
- **Modal**: [mpellerin42]
    - Allow the display of an overlay for non-blocking modals
    - Update spacing

# 2.26.1 (2021-04-15)

### Improvements
- **Expander**: [mpellerin42]
    - Rename Expand to Expander for better clarity
    - Add `contentLoaded` input which update content height whenever it changes
- **Transitions**: Update transition tokens [mpellerin42]

# 2.26.0 (2021-04-14)

### Feature
- **Expand**: New pa-expand component [mpellerin42]
- **Transitions**: Create transition tokens [mpellerin42]

# 2.25.6 (2021-04-13)

### Bugfix
- **Layout**: Fix wide+panel on xLarge screens [mpellerin42]

# 2.25.5 (2021-04-12)

### Improvement
- **Layout**: Add support for wide+panel layout (with panel on the right) [mpellerin42]

# 2.25.4 (2021-04-06)

### Bugfix
- **Checkbox**: fix border on checkbox to prevent wrong dashed border on safari [mpellerin42]
    - checkbox always has a 1px solid border
    - replace `$border-toggle` by `$color-border-toggle` tokens  
    - set box-sizing to `content-box` and update size to take borders into account

# 2.25.3 (2021-04-01)

### Improvement
- **Avatar**: Update avatar default background color to be slightly darker [mpellerin42]

# 2.25.2 (2021-03-30)

### Improvement
- **Table**:
    - support pa-icon as lead-image [mpellerin42]
    - Fix focus state on cells [mpellerin42]

# 2.25.1 (2021-03-29)

### Improvement
- **Chip**: set inner icon size to 16px in close button [mpellerin42]

# 2.25.0 (2021-03-26)

### Feature
- **Table**: [mpellerin42]
    - New component `pa-table-sortable-header` allowing managing the sorting seamlessly
    - New `pa-table-lead-cell-multi-line` component providing a layout for cells with a lead image, a title and a description
    - Fixing spacing on cells
    - Add `noAutoColumnStyle` option on table, allowing setting grid template by CSS
    - Add `disabled` property on all kind of cells and on rows
    - Add `noWrap` property on cells and provide `pa-ellipsis` class to support ellipsis on cell content
    - Rename `clickable` class to `pa-clickable` for consistency

# 2.24.4 (2021-03-22)

### Improvements
- **Toasts**: add some getters to allow toast service composition [mpellerin42]

# 2.24.3 (2021-03-22)

### Improvements
- **Buttons**: center button text by default [mpellerin42]
- **Popup**: Manage popup visibility with a class to allow transitions [mpellerin42]

# 2.24.2 (2021-03-18)

### Improvements
- **Buttons**: provide mixins for button style [mpellerin42]

# 2.24.1 (2021-03-15)

### Improvements
- **Colors**: better documentation of color palette, making it easier to be reused by other pastanaga based demo [mpellerin42]

# 2.24.0 (2021-03-15)

### Breaking changes
- **Size**: no more `xxsmall` nor `xsmall` sizes [mpellerin42]
- **Icons**: [mpellerin42]
    - no more svg provided in assets (icons are in `glyphs-sprite.svg`)
    - the icon list provided and some of their names changed
    - documentation and components have been updated with the new names
- **Button**: [mpellerin42]
    - `xsmall` button not supported anymore, use `small` button instead
    - display medium size icon in small button
    - fix small and medium button padding

# 2.23.7 (2021-03-12)

### Bugfix
- **Chips**: change chip max-width to be working on mobile without impacting chip look and feel when container is flex [mpellerin42]

# 2.23.6 (2021-03-12)

### Bugfix
- **Chips**: prevent chips to be wider than their container [mpellerin42] 

# 2.23.5 (2021-03-11)

### Improvements
- **PopupDirective**: Add `openOnly` input to prevent popup from closing when clicking on the element carrying the directive while the popup is visible [mpellerin42]

# 2.23.4 (2021-03-10)

### Improvements
- **OptionComponent**: fix line-height on options without icons [mpellerin42]

# 2.23.3 (2021-03-10)

### Improvements
- **OptionComponent**: [mpellerin42]
    - support `string` and `IconModel` for icon property
    - no more check mark on selected options
    - rhythm 8 spacing

# 2.23.2 (2021-03-09)

### Improvements
- **PopupDirective**: Allow to toggle popup programmatically [ebrehault]

# 2.23.1 (2021-03-05)

### Improvements
- **PopupDirective**: Allow to override popup margin [mpellerin42]
- **Chips**: Fix minor spacing issues [mpellerin42]

# 2.23.0 (2021-03-04)

### Breaking changes
- **Chip**: `pa-chip` renamed to `pa-chip-closeable` [mpellerin42]

### Improvements
- **Chips**: New kind of chip – `pa-chip-selectionable` (without close button) allowing to chip selection [mpellerin42]
- **Icon**: Support `IconModel` to fill all arguments of `pa-icon` at once [mpellerin42]

# 2.22.0 (2021-03-03)

### Breaking changes
- **Table**: [mpellerin42]
    - No more `tableHeaderButton` component: use normal pa-button instead. On header cell pa-button are now styled without background nor box-shadow.
    - `pa-table-cell-header-sortable` renamed to `pa-table-sortable-header-cell`
    - replace `label` input of `pa-table-sortable-header-cell` by `ng-content` to stay consistent with other cell components
    - rename `reversed` input by `isDescending` to improve code clarity
    - rename `sorted` output by `sort`
    - update the documentation accordingly

# 2.21.2 (2021-03-02)

### Improvement:
- **Button**: add active state property on buttons [mpellerin42]

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
