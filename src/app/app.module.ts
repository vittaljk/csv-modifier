import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SetsListComponent } from './components/sets-list/sets-list.component';
import { DrapDemoComponent } from './components/drap-demo/drap-demo.component';

// Modules
import { DndListModule } from 'ngx-drag-and-drop-lists';

// services
import { PapaParseService } from 'ngx-papaparse';

const routes: Routes = [
    { path: '', redirectTo: 'demo', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'sets-list', component: SetsListComponent },
    { path: 'demo', component: DrapDemoComponent }
];

const components = [
    HomeComponent,
    SetsListComponent,
    DrapDemoComponent
];

@NgModule({
    declarations: [
        AppComponent,
        ...components
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        DndListModule
    ],
    providers: [PapaParseService],
    bootstrap: [AppComponent]
})

export class AppModule {}
