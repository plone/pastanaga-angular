import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlModel } from 'pastanaga-angular';

@Component({
    templateUrl: './filtered-checkbox-group-doc.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilteredCheckboxGroupDocComponent {
    codeSample = `<pa-filtered-checkbox-group id="filteredCheckboxGroup"
                            [checkboxes]="filteredCheckboxes"
                            (selection)="filteredCheckboxSelection = $event">
    Checkbox group with virtual scroll
</pa-filtered-checkbox-group>`;

    domains: string[] = ['onna.com', 'example.com', 'gmail.com', 'outlook.com', 'yahoo.fr'];
    filteredCheckboxes: ControlModel[] = this.generateCheckboxes();
    filteredCheckboxSelection: string[] = [];

    private generateCheckboxes(): ControlModel[] {
        const existingNames: string[] = [];
        const checkboxes: ControlModel[] = [];
        const firstNames: string[] = [
            'Maddie', 'Esme', 'Hannah', 'Rhea', 'Flora', 'Connie', 'Constance', 'Sasha', 'Sarah', 'Alexa',
            'Aiden', 'Tania', 'Marvin', 'Leo', 'Alfred', 'Herman', 'Umar', 'Dewey', 'Juan', 'Alain',
        ];
        const lastNames: string[] = [
            'French', 'Tran', 'Kelley', 'Taylor', 'Clarke', 'Saunders', 'Johnson', 'Lyons', 'Daniel', 'Hoffman',
            'Mack', 'Dupond', 'Curry', 'Santos', 'Thompson', 'Romero', 'Mcleod', 'Mcgrath', 'Cole', 'Frazier',
            'Michel', 'Bond', 'Tully', 'Universe'
        ];
        let round1 = 0;
        let round2 = 0;
        for (let i = 0; i < 700; i++) {
            const firstModulo = i % firstNames.length;
            const lastModulo = i % lastNames.length;
            if (firstModulo === 0) {
                round1++;
            }
            if (lastModulo === 0) {
                round2++;
            }
            const firstI = firstModulo - round1 > 0 ? firstModulo - round1 : firstModulo;
            const lastI = lastModulo - round2 > 0 ? lastModulo - round2 : lastModulo;
            const firstName = firstNames[firstI];
            const lastName = lastNames[lastI];
            const label = `${firstName} ${lastName}`;
            if (!existingNames.includes(label)) {
                checkboxes.push(new ControlModel({
                    label: `${firstName} ${lastName}`,
                    subLabel: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${this.domains[i % this.domains.length]}`,
                    value: 'f_' + i,
                    id: 'f_' + i,
                }));
                existingNames.push(label);
            }
        }
        return checkboxes;
    }
}
