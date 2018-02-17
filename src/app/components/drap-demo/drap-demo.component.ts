import { Component, OnInit } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';

@Component({
    selector: 'app-drap-demo',
    templateUrl: './drap-demo.component.html',
    styleUrls: ['./drap-demo.component.scss']
})

export class DrapDemoComponent implements OnInit {
    simpleList = [];

    constructor(private papa: PapaParseService) {}

    ngOnInit() {}

    readFile(event): void {
        this.papa.parse(event.target.files[0], {
            complete: result => {
                this.simpleList.push(result.data);
            }
        });
    }

    removeItem(item: any, list: any[]): void {
        list.splice(list.indexOf(item), 1);
    }

    download(): void {
        const csvString = this.papa.unparse(this.simpleList[0]);
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        // or
        // window.open(window.URL.createObjectURL(new Blob([this.papa.unparse(this.simpleList[0])], { type: 'text/csv' })));
    }
}
