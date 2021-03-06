import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule
} from '@angular/material';

const MaterialModules = [
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule
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
