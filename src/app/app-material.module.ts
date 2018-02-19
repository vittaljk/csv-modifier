import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule
} from '@angular/material';

const MaterialModules = [
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule
];

@NgModule({
    imports: [
        CommonModule,
        ...MaterialModules
    ],
    declarations: [],
    exports: MaterialModules,
    providers: []
})

export class AppMaterialModule {}
