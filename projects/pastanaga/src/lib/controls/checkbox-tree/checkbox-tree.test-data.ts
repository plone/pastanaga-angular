import { ControlModel } from '../control.model';

export const ids = {
    root1: 'root-1',
    root2: 'root-2',
    root3: 'root-3',
    root4: 'root-4',
    child1: 'level-1.1',
    child2: 'level-1.2',
    subChild1: 'level-1.2.1',
    subChild2: 'level-1.2.2',
};

export function getInitialGroupWithADisabled(): ControlModel[] {
    return [
        new ControlModel({
            id: ids.root1,
            label: 'Root 1',
            value: 'root-1',
            children: [],
        }),
        new ControlModel({
            id: ids.root2,
            label: 'Root 2',
            value: 'root-2',
            isDisabled: true,
            children: [],
        }),
        new ControlModel({
            id: ids.root3,
            label: 'Root 3',
            value: 'root-3',
            children: [],
        }),
        new ControlModel({
            id: ids.root4,
            label: 'Root 4',
            value: 'root-4',
            children: [],
        }),
    ];
}
export function getInitialTree(expanded = true): ControlModel[] {
    return [
        new ControlModel({
            id: ids.root1,
            label: 'Root 1 with a very longer name to test ellipsis in checkbox tree',
            value: 'root-1',
            isExpanded: expanded,
            children: [
                new ControlModel({
                    id: ids.child1,
                    label: 'Level 1.1',
                    value: 'level-1.1',
                    children: [],
                }),
                new ControlModel({
                    id: ids.child2,
                    label: 'Level 1.2',
                    value: 'level-1.2',
                    isExpanded: expanded,
                    children: [
                        new ControlModel({
                            id: ids.subChild1,
                            label: 'Level 1.2.1',
                            value: 'level-1.2.1',
                            children: [],
                        }),
                        new ControlModel({
                            id: ids.subChild2,
                            label: 'Level 1.2.2',
                            value: 'level-1.2.2',
                            children: [],
                        }),
                    ],
                }),
            ],
        }),
        new ControlModel({
            id: ids.root2,
            label: 'Root 2',
            value: 'root-2',
            children: [],
        }),
    ];
}
