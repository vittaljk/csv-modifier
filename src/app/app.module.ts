import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SetsListComponent } from './pages/sets-list/sets-list.component';
import { DrapDemoComponent } from './components/drap-demo/drap-demo.component';

// Modules
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DndListModule } from 'ngx-drag-and-drop-lists';
import { AppMaterialModule } from './app-material.module';

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
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        DndListModule,
        AppMaterialModule
    ],
    providers: [PapaParseService],
    schemas: [NO_ERRORS_SCHEMA],
    bootstrap: [AppComponent]
})

export class AppModule {}
