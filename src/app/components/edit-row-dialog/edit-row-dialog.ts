import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import * as _ from 'underscore';
import { FormGroup } from "@angular/forms";

@Component({
    selector: "edit-row-dialog",
    templateUrl: "edit-row-dialog.html",
    styleUrls: ['./edit-row-dialog.scss']
})

export class EditRowDialog {
    dataCopy = {};
    rowForm: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.rowForm = this.data;
        this.dataCopy = { ...this.rowForm.value };
    }

    getControlNames(control): Array<string> {
        return _.keys(control);
    }
}
