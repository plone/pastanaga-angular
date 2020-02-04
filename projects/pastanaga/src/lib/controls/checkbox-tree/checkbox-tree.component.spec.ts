import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ControlModel } from '../control.model';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CheckboxTreeComponent } from './checkbox-tree.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { AngularSvgIconModule, SvgLoader } from 'angular-svg-icon';
import * as en from '../../../../../../src/assets/i18n/en.json';
import { BadgeModule } from '../../badge/badge.module';
import { ButtonModule } from '../../button/button.module';
import { TooltipModule } from '../../tooltip/tooltip.module';
import { TranslateModule } from '../../translate/translate.module';
import { SvgModule } from '../../svg/svg.module';
import { svgLoaderFactory } from '../../test.utils';
import { getInitialGroupWithADisabled, getInitialTree, ids } from './checkbox-tree.test-data';

// tslint:disable:max-line-length

class BaseTestComponent {
    selection: string[] = [];
    allSelected = false;
}

@Component({
    selector: 'pa-test',
    template: `
        <pa-checkbox-tree [checkboxes]="tree" countVisible
                          (updatedTree)="tree = $event"
                          (selection)="selection = $event"
                          (allSelected)="allSelected = $event"></pa-checkbox-tree>
    `
})
class TestCountVisibleGroupComponent extends BaseTestComponent {
    tree: ControlModel[] = getInitialGroupWithADisabled();
}

@Component({
    selector: 'pa-test',
    template: `
        <pa-checkbox-tree [checkboxes]="tree"
                          (updatedTree)="tree = $event"
                          (selection)="selection = $event"
                          (allSelected)="allSelected = $event"></pa-checkbox-tree>
    `
})
class TestNormalUncheckedTreeComponent extends BaseTestComponent {
    tree: ControlModel[] = getInitialTree();
}
@Component({
    selector: 'pa-test',
    template: `
        <pa-checkbox-tree [checkboxes]="tree"
                          (updatedTree)="tree = $event"
                          (selection)="selection = $event"
                          (allSelected)="allSelected = $event"></pa-checkbox-tree>
    `
})
class TestNormalTree2Component extends BaseTestComponent {
    tree: ControlModel[] = getTreeAfterSelectingRoot1AndUnselectingSubChild1();
}

@Component({
    selector: 'pa-test',
    template: `
        <pa-checkbox-tree [checkboxes]="tree" fileSystem
                          (updatedTree)="tree = $event"
                          (selection)="selection = $event"
                          (allSelected)="allSelected = $event"></pa-checkbox-tree>
    `
})
class TestFileSystemUncheckedTreeComponent {
    tree: ControlModel[] = getInitialTree();
    selection: string[] = [];
    allSelected = false;
}

function getCheckboxSelector(id: string) {
    return `pa-checkbox[id="${id}"] .pa-field-control`;
}

function getRoot1Checkbox(fixture: ComponentFixture<BaseTestComponent>) {
    return fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.root1));
}

function getCheckbox(fixture: ComponentFixture<BaseTestComponent>, id: string) {
    return fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(id));
}

function getSelectAllButton(fixture: ComponentFixture<BaseTestComponent>) {
    return fixture.debugElement.nativeElement.querySelector(`button[id="checkbox-tree-select-all-button"]`);
}

function getCountBadge(fixture: ComponentFixture<BaseTestComponent>) {
    return fixture.debugElement.nativeElement.querySelector(`legend pa-badge .pa-badge`);
}

describe('CheckboxTree', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                CommonModule,
                BadgeModule,
                ButtonModule,
                TooltipModule,
                TranslateModule,
                SvgModule,
                AngularSvgIconModule.forRoot({
                    loader: {
                        provide: SvgLoader,
                        useFactory: svgLoaderFactory,
                    }
                }),
            ],
            declarations: [
                TestCountVisibleGroupComponent,
                TestNormalUncheckedTreeComponent,
                TestNormalTree2Component,
                TestFileSystemUncheckedTreeComponent,
                CheckboxTreeComponent,
                CheckboxComponent,
            ],
            providers: [
                {provide: 'LANG', useValue: 'en_US'},
                {provide: 'TRANSLATIONS', useValue: {en_US: en}},
            ],
        }).compileComponents();
    }));

    describe('count visible group', () => {
        it(`should display badge with 0 selection by default`, () => {
            const fixture = TestBed.createComponent(TestCountVisibleGroupComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getInitialGroupWithADisabled());
            expect(fixture.componentInstance.selection).toEqual([]);
            expect(fixture.componentInstance.allSelected).toBe(false);
            const badge = getCountBadge(fixture);
            expect(badge.textContent).toBe('0/4');
        });

        it(`should update badge value with selection count`, () => {
            const fixture = TestBed.createComponent(TestCountVisibleGroupComponent);
            fixture.detectChanges();
            getRoot1Checkbox(fixture).click();
            const badge = getCountBadge(fixture);
            fixture.detectChanges();
            expect(badge.textContent).toBe('1/4');
        });

        it(`should not select disabled checkbox when clicking on it`, () => {
            const fixture = TestBed.createComponent(TestCountVisibleGroupComponent);
            fixture.detectChanges();
            getCheckbox(fixture, ids.root2).click();
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getInitialGroupWithADisabled());
        });

        it(`should not select disabled checkbox when clicking on select all button`, () => {
            const fixture = TestBed.createComponent(TestCountVisibleGroupComponent);
            fixture.detectChanges();
            getSelectAllButton(fixture).click();
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getAllGroupButDisabledSelected());
        });
    });

    describe('normal checkbox tree', () => {
        it(`should render checkbox tree as it is passed`, () => {
            const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getInitialTree());
            expect(fixture.componentInstance.selection).toEqual([]);
            expect(fixture.componentInstance.allSelected).toBe(false);
        });

        it(`should select all children when selecting a parent`, () => {
            const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
            fixture.detectChanges();

            getRoot1Checkbox(fixture).click();
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getTreeAfterSelectingRoot1());
            expect(fixture.componentInstance.selection).toEqual([ids.root1, ids.child1, ids.child2, ids.subChild1, ids.subChild2]);
            expect(fixture.componentInstance.allSelected).toBe(false);
        });

        it(`should have parent unchecked and with indeterminate state when parent is selected and some children are unselected`, () => {
            const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
            fixture.detectChanges();

            getRoot1Checkbox(fixture).click();
            fixture.detectChanges();
            fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.child1)).click();
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getTreeAfterSelectingRoot1AndUnselectingChild1());
            expect(fixture.componentInstance.selection).toEqual([ids.child2, ids.subChild1, ids.subChild2]);
        });

        it(`should have parent unchecked and with indeterminate state when parent is selected and some subchildren are unselected`, () => {
            const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
            fixture.detectChanges();
            getRoot1Checkbox(fixture).click();
            fixture.detectChanges();
            fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.subChild1)).click();
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getTreeAfterSelectingRoot1AndUnselectingSubChild1());
            expect(fixture.componentInstance.selection).toEqual([ids.child1, ids.subChild2]);
        });

        it(`should select all tree when clicking on select all button`, () => {
            const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
            fixture.detectChanges();
            getSelectAllButton(fixture).click();
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getAllTreeSelected());
            expect(fixture.componentInstance.selection).toEqual([ids.root1, ids.child1, ids.child2, ids.subChild1, ids.subChild2, ids.root2]);
        });

        it(`should select all tree and remove indeterminate state when clicking on select all button`, () => {
            const fixture = TestBed.createComponent(TestNormalTree2Component);
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getTreeAfterSelectingRoot1AndUnselectingSubChild1());
            getSelectAllButton(fixture).click();
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getAllTreeSelected());
            expect(fixture.componentInstance.selection).toEqual([ids.root1, ids.child1, ids.child2, ids.subChild1, ids.subChild2, ids.root2]);
        });

        it(`should remove indeterminate state and select all children when selecting indeterminate parent`, () => {
            const fixture = TestBed.createComponent(TestNormalTree2Component);
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getTreeAfterSelectingRoot1AndUnselectingSubChild1());

            getRoot1Checkbox(fixture).click();
            fixture.detectChanges();
            expect(fixture.componentInstance.tree).toEqual(getTreeAfterSelectingRoot1());
            expect(fixture.componentInstance.selection).toEqual([ids.root1, ids.child1, ids.child2, ids.subChild1, ids.subChild2]);
        });

        // it(`should have parent with indeterminate state when parent is unselected and some or all children are selected `, () => {
        //     const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
        //     fixture.detectChanges();
        //     const rootExpandButton = getRoot1ExpandButton(fixture);
        //     rootExpandButton.click();
        //     fixture.detectChanges();
        //     fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.child1)).click();
        //     fixture.detectChanges();
        //     expect(fixture.componentInstance.tree).toMatchObject(getTreeAfterSelectingChild1());
        //     expect(fixture.componentInstance.selection).toMatchObject([ids.child1]);
        //
        //     fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.child2)).click();
        //     fixture.detectChanges();
        //     expect(fixture.componentInstance.tree).toMatchObject(getTreeAfterSelectingAllChildren());
        //     expect(fixture.componentInstance.selection).toMatchObject([ids.child1, ids.child2, ids.subChild1, ids.subChild2]);
        // });
    });

    // describe('isFileSystem = true', () => {
    //     it(`should render checkbox tree as it is passed`, () => {
    //         const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
    //         fixture.detectChanges();
    //         expect(fixture.componentInstance.tree).toMatchObject(getInitialTree());
    //         expect(fixture.componentInstance.selection).toMatchObject([]);
    //         expect(fixture.componentInstance.allSelected).toBe(false);
    //     });
    //
    //     it(`should select/unselect all children when selecting a parent`, () => {
    //         const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
    //         fixture.detectChanges();
    //
    //         const rootCheckbox = getRoot1Checkbox(fixture);
    //         rootCheckbox.click();
    //         fixture.detectChanges();
    //         expect(fixture.componentInstance.tree).toMatchObject(getTreeAfterSelectingRoot1());
    //         expect(fixture.componentInstance.selection).toMatchObject([ids.root1, ids.child1, ids.child2, ids.subChild1, ids.subChild2]);
    //         expect(fixture.componentInstance.allSelected).toBe(false);
    //
    //         rootCheckbox.click();
    //         fixture.detectChanges();
    //         expect(fixture.componentInstance.tree).toMatchObject(getInitialTree());
    //         expect(fixture.componentInstance.selection).toMatchObject([]);
    //         expect(fixture.componentInstance.allSelected).toBe(false);
    //     });
    //
    //     it(`should have parent with indeterminate state when parent is selected and some children are unselected`, () => {
    //         const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
    //         fixture.detectChanges();
    //
    //         const rootCheckbox = getRoot1Checkbox(fixture);
    //         const rootExpandButton = getRoot1ExpandButton(fixture);
    //         rootCheckbox.click();
    //         rootExpandButton.click();
    //         fixture.detectChanges();
    //         fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.child1)).click();
    //         fixture.detectChanges();
    //         expect(fixture.componentInstance.tree).toMatchObject(getTreeAfterSelectingRoot1AndUnselectingChild1());
    //         expect(fixture.componentInstance.selection).toMatchObject([ids.root1, ids.child2, ids.subChild1, ids.subChild2]);
    //     });
    //
    //     it(`should have parent with indeterminate state when parent is selected and some subchildren are unselected`, fakeAsync(() => {
    //         const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
    //         fixture.detectChanges();
    //         const rootCheckbox = getRoot1Checkbox(fixture);
    //         const rootExpandButton = getRoot1ExpandButton(fixture);
    //         rootCheckbox.click();
    //         rootExpandButton.click();
    //         fixture.detectChanges();
    //         tick();
    //         getChildExpandButton(fixture).click();
    //         fixture.detectChanges();
    //         fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.subChild1)).click();
    //         fixture.detectChanges();
    //         expect(fixture.componentInstance.tree).toMatchObject(getTreeAfterSelectingRoot1AndUnselectingSubChild1());
    //         expect(fixture.componentInstance.selection).toMatchObject([ids.root1, ids.child1, ids.child2, ids.subChild2]);
    //     }));
    //
    //     it(`should have parent with indeterminate state when parent is unselected and some or all children are selected `, () => {
    //         const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
    //         fixture.detectChanges();
    //         const rootExpandButton = getRoot1ExpandButton(fixture);
    //         rootExpandButton.click();
    //         fixture.detectChanges();
    //         fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.child1)).click();
    //         fixture.detectChanges();
    //         expect(fixture.componentInstance.tree).toMatchObject(getTreeAfterSelectingChild1());
    //         expect(fixture.componentInstance.selection).toMatchObject([ids.child1]);
    //
    //         fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.child2)).click();
    //         fixture.detectChanges();
    //         expect(fixture.componentInstance.tree).toMatchObject(getTreeAfterSelectingAllChildren());
    //         expect(fixture.componentInstance.selection).toMatchObject([ids.child1, ids.child2, ids.subChild1, ids.subChild2]);
    //     });
    //
    //     it(`should have parent with indeterminate state when parent is unselected and some or all subchildren are selected `, fakeAsync(() => {
    //         const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
    //         fixture.detectChanges();
    //         const rootExpandButton = getRoot1ExpandButton(fixture);
    //         rootExpandButton.click();
    //         fixture.detectChanges();
    //         tick();
    //         getChildExpandButton(fixture).click();
    //         fixture.detectChanges();
    //         fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.subChild1)).click();
    //         fixture.detectChanges();
    //         expect(fixture.componentInstance.tree).toMatchObject(getTreeAfterSelectingSubChild1());
    //         expect(fixture.componentInstance.selection).toMatchObject([ids.subChild1]);
    //
    //         fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.subChild2)).click();
    //         fixture.detectChanges();
    //         expect(fixture.componentInstance.tree).toMatchObject(getTreeAfterSelectingSubChild1());
    //         expect(fixture.componentInstance.selection).toMatchObject([ids.subChild1, ids.subChild2]);
    //     }));
    //
    //     // it(`should have parent with selected state and 'select children' button visible if parent is selected and all children are unselected`, () => {
    //     //
    //     // });
    //
    //     // it(`should unselect all children but keep parent selected when clicking on remove children`, () => {
    //     //     const fixture = TestBed.createComponent(TestNormalUncheckedTreeComponent);
    //     //     fixture.detectChanges();
    //     //
    //     //     const rootCheckbox = fixture.debugElement.nativeElement.querySelector(getCheckboxSelector(ids.root1));
    //     //     rootCheckbox.click();
    //     //     fixture.detectChanges();
    //     //     fixture.debugElement.nativeElement
    //     //         .querySelector(`onna-checkbox[data-qa-id="${ids.root1}"] .o-field`)
    //     //         .triggerEventHandler('mouseover', null);
    //     //     fixture.detectChanges();
    //     //     const toggleChildren = fixture.debugElement.nativeElement
    //     //         .querySelector(`onna-checkbox[data-qa-id="${ids.root1}"] .o-checkbox-children-button`);
    //     //     expect(toggleChildren).toBeDefined();
    //     // });
    // });
});


function getTreeAfterSelectingRoot1(): ControlModel[] {
    const tree = getInitialTree();
    tree[0].isSelected = true;
    tree[0].selectedChildren = 2;
    tree[0].children.forEach(child => {
        child.isSelected = true;
        if (child.children.length > 0) {
            child.children.forEach(subChild => subChild.isSelected = true);
            child.selectedChildren = 2;
        }
    });
    return tree;
}

function getTreeAfterSelectingRoot1AndUnselectingChild1(): ControlModel[] {
    const tree = getTreeAfterSelectingRoot1();
    tree[0].isSelected = false;
    tree[0].isIndeterminate = true;
    tree[0].selectedChildren = 1;
    tree[0].children[0].isSelected = false;
    tree[0].children[1].selectedChildren = 2;
    return tree;
}

function getTreeAfterSelectingRoot1AndUnselectingSubChild1(): ControlModel[] {
    const tree = getInitialTree();
    tree[0].isSelected = false;
    tree[0].isIndeterminate = true;
    tree[0].selectedChildren = 1;
    tree[0].children[0].isSelected = true;
    tree[0].children[1].isSelected = false;
    tree[0].children[1].isIndeterminate = true;
    tree[0].children[1].selectedChildren = 1;
    tree[0].children[1].children[0].isSelected = false;
    tree[0].children[1].children[1].isSelected = true;
    return tree;
}

function getTreeAfterSelectingChild1(): ControlModel[] {
    const tree = getInitialTree();
    tree[0].isIndeterminate = true;
    tree[0].children[0].isSelected = true;
    return tree;
}

function getTreeAfterSelectingAllChildren(): ControlModel[] {
    const tree = getTreeAfterSelectingChild1();
    tree[0].children[1].isSelected = true;
    tree[0].children[1].children.forEach(subChild => subChild.isSelected = true);
    return tree;
}

function getTreeAfterSelectingSubChild1(): ControlModel[] {
    const tree = getInitialTree();
    tree[0].isIndeterminate = true;
    tree[0].children[1].isIndeterminate = true;
    tree[0].children[1].children[0].isSelected = true;
    tree[0].children[1].selectedChildren = 1;
    tree[0].children[1].totalChildren = 2;
    return tree;
}

function getAllTreeSelected(): ControlModel[] {
    const tree = getInitialTree();
    tree[0].isSelected = true;
    tree[0].selectedChildren = 2;
    tree[0].children[0].isSelected = true;
    tree[0].children[1].isSelected = true;
    tree[0].children[1].selectedChildren = 2;
    tree[0].children[1].children[0].isSelected = true;
    tree[0].children[1].children[1].isSelected = true;
    tree[1].isSelected = true;
    return tree;
}

function getAllGroupButDisabledSelected(): ControlModel[] {
    const group = getInitialGroupWithADisabled();
    group.forEach(checkbox => {
        if (!checkbox.isDisabled) {
            checkbox.isSelected = true;
        }
    });
    return group;
}


