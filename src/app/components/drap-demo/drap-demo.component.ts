import { Component, OnInit } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { FileSet } from '../../models/models';
import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'underscore';

@Component({
    selector: 'app-drap-demo',
    templateUrl: './drap-demo.component.html',
    styleUrls: ['./drap-demo.component.scss']
})

export class DrapDemoComponent implements OnInit {
    fileSet: FileSet;
    showForm = false;
    rowForm: FormGroup;

    constructor(private papa: PapaParseService) {
        this.fileSet = new FileSet({
            headers: [],
            files: []
        });
    }

    ngOnInit() {}

    readFile(event): void {
        this.papa.parse(event.target.files[0], {
            complete: result => {
                this.fileSet.headers.push(result.data[0]);
                result.data.shift();
                this.fileSet.files.push(result.data);
            }
        });
    }

    removeItem(item: any, list: any[]): void {
        list.splice(list.indexOf(item), 1);
    }

    download(index: number): void {
        const csvString = this.papa.unparse(this.fileSet.files[index]);
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
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

    swapHeaders(source: number, destination: number, setIndex = 0): void {
        for (let index = 0; index < this.fileSet.files[setIndex].length; index++) {
            this.fileSet.files[setIndex][index] = this.swapArray(source, destination, this.fileSet.files[setIndex][index]);
        }
        const headers = [...this.fileSet.headers[setIndex]];
        const temp = headers[source];
        headers[source] = headers[destination];
        headers[destination] = temp;
        this.fileSet.headers[setIndex] = headers;
    }

    swapArray(source: number, destination: number, arr: Array<any>): Array<any> {
        const arrCopy = [...arr];
        const temp = arrCopy[source];
        arrCopy[source] = arrCopy[destination];
        arrCopy[destination] = temp;
        return arrCopy;
    }

    getControlNames(control): Array<string> {
        return _.keys(control);
    }

    saveEditedRow(): void {
        this.fileSet.files[0][0] = _.values(this.rowForm.value);
    }
}
