import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PapaParseService } from 'ngx-papaparse';
import { FileSet } from '../../models/models';
import { FileDataService } from '../../services/file-data.service';
import * as _ from 'underscore';
import { FormControl, FormGroup } from '@angular/forms';

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
    showForm = false;
    rowForm: FormGroup;

    constructor(private aRoute: ActivatedRoute, private papa: PapaParseService, private fileDataService: FileDataService) {}

    ngOnInit() {
        const paramSub = this.aRoute.params.subscribe(params => {
            this.fileSetId = params['id'];
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
                // result.data.shift();
                this.fileDataService.fileData[this.fileSetId].files.push(result.data);
                this.pageReady = true;
                this.fileSet = this.fileDataService.getSetBykey(this.fileSetId);
            }
        });
    }

    swapHeaders(source: number, destination: number, fileIndex = 0): void {
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

    editRow(row, headerIndex): void {
        this.showForm = true;
        const rowObj = _.object(this.fileSet.headers[headerIndex], row);
        for (const key in rowObj) {
            if (rowObj.hasOwnProperty(key)) {
                rowObj[key] = new FormControl(rowObj[key]);
            }
        }
        this.rowForm = new FormGroup(rowObj as { [key: string]: FormControl });
    }

    saveEditedRow(): void {
        // this.fileSet.files[0][0] = _.values(this.rowForm.value);
        console.log(this.rowForm.value);
    }

    getControlNames(control): Array<string> {
        return _.keys(control);
    }
}
