import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PapaParseService } from 'ngx-papaparse';
import { FileSet } from '../../models/models';
import { FileDataService } from '../../services/file-data.service';
import * as _ from 'underscore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { EditRowDialog } from '../../components/edit-row-dialog/edit-row-dialog';

@Component({
    selector: 'app-set',
    templateUrl: './set.component.html',
    styleUrls: ['./set.component.scss']
})

export class SetComponent implements OnInit, OnDestroy {
    subscriptions = [];
    fileSet: FileSet;
    fileSetId: string;
    pageReady = false;
    rowForm: FormGroup;
    foods = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    constructor(
        private aRoute: ActivatedRoute,
        private papa: PapaParseService,
        private fileDataService: FileDataService,
        public dialog: MatDialog,
        public router: Router
    ) { }

    ngOnInit() {
        const paramSub = this.aRoute.params.subscribe(params => {
            this.fileSetId = params['id'];
            if (!this.fileDataService.fileData[this.fileSetId]) {
                this.router.navigate(['/sets-list']);
            }
            this.fileSet = this.fileDataService.fileData[this.fileSetId];
            this.fileDataService.setActiveSet(this.fileSetId);
        });
        this.subscriptions.push(paramSub);
    }

    ngOnDestroy() {
        for (let i = 0; i < this.subscriptions.length; i++) {
            if (this.subscriptions[i].unsubscribe) {
                this.subscriptions[i].unsubscribe();
            }
        }
    }

    readFile(event): void {
        this.papa.parse(event.target.files[0], {
            complete: result => {
                this.fileDataService.fileData[this.fileSetId].headers.push(result.data[0]);
                this.fileDataService.fileData[this.fileSetId].files.push(result.data);
                this.pageReady = true;
                this.fileSet = this.fileDataService.getSetBykey(this.fileSetId);
            }
        });
    }

    swapHeaders(source: number, destination: number, fileIndex): void {
        for (let index = 0; index < this.fileSet.files[fileIndex].length; index++) {
            this.fileSet.files[fileIndex][index] = this.swapCells(source, destination, this.fileSet.files[fileIndex][index]);
        }
        const headers = [...this.fileSet.headers[fileIndex]];
        const temp = headers[source];
        headers[source] = headers[destination];
        headers[destination] = temp;
        this.fileSet.headers[fileIndex] = headers;
    }

    swapCells(source: number, destination: number, arr: Array<any>): Array<any> {
        const arrCopy = [...arr];
        const temp = arrCopy[source];
        arrCopy[source] = arrCopy[destination];
        arrCopy[destination] = temp;
        return arrCopy;
    }

    download(index: number): void {
        const csvString = this.papa.unparse(this.fileSet.files[index]);
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    removeItem(item: any, list: any[]): void {
        list.splice(list.indexOf(item), 1);
    }

    editRow(row, headerIndex, rowIndex): void {
        const rowObj = _.object(this.fileSet.headers[headerIndex], row);
        for (const key in rowObj) {
            if (rowObj.hasOwnProperty(key)) {
                rowObj[key] = new FormControl(rowObj[key]);
            }
        }
        this.rowForm = new FormGroup(rowObj as { [key: string]: FormControl });

        // open edit form
        const dialogRef = this.dialog.open(EditRowDialog, {
            disableClose: true,
            height: 'auto',
            width: '40%',
            data: this.rowForm
        });

        dialogRef.afterClosed().subscribe(result => {
            this.fileSet.files[headerIndex][rowIndex] = _.values(result)
        });
    }

    getControlNames(control): Array<string> {
        return _.keys(control);
    }

    getSelected(): number {
        return 1;
    }

    changeOrder(event, initialIndex: number, fileIndex: number): void {
        this.swapHeaders(initialIndex, event.value, fileIndex);
    }
}
