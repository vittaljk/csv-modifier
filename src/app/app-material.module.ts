import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule
} from '@angular/material';

const MaterialModules = [
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule
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
