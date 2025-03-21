import { Routes } from '@angular/router';
import { PaletteComponent } from './pages/core/palette/palette.component';
import { IMenuSection } from './menu/menu.model';
import { OverviewComponent } from './pages/overview/overview.component';
import { InstallationComponent } from './pages/installation/installation.component';
import { IconsComponent } from './pages/core/icons/icons.component';
import { ButtonsComponent } from './pages/components/buttons/buttons.component';

export const menu: IMenuSection[] = [
  {
    title: 'Introduction',
    pages: [
      {
        title: 'What is Pastanaga?',
        path: 'overview',
        type: OverviewComponent,
      },
      {
        title: 'Installation',
        path: 'install',
        type: InstallationComponent,
      },
    ],
  },
  {
    title: 'Core',
    pages: [
      {
        title: 'Palette',
        path: 'palette',
        type: PaletteComponent,
      },
      {
        title: 'Icons',
        path: 'icons',
        type: IconsComponent,
      },
    ],
  },
  {
    title: 'Components',
    pages: [
      {
        title: 'Buttons',
        path: 'buttons',
        type: ButtonsComponent,
      },
    ],
  },
];

function buildRoutesFromMenu() {
  const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'overview' },
  ];
  menu.forEach((section) =>
    section.pages.forEach((page) =>
      routes.push({ path: page.path, component: page.type }),
    ),
  );
  return routes;
}

export const routes: Routes = buildRoutesFromMenu();
