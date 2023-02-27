import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { menu } from './app.component';

function buildRoutesFromMenu() {
    const routes: Routes = [{ path: '', pathMatch: 'full', component: WelcomePageComponent }];
    menu.forEach((section) =>
        section.pages.forEach((page) => routes.push({path: page.view, component: page.type})),
    );
    return routes;
}

const appRoutes: Routes = buildRoutesFromMenu();

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
    paramsInheritanceStrategy: 'always',
    initialNavigation: 'enabledBlocking'
}),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
