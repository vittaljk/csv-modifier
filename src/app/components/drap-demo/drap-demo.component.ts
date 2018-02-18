import { Component, OnInit } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';

@Component({
    selector: 'app-drap-demo',
    templateUrl: './drap-demo.component.html',
    styleUrls: ['./drap-demo.component.scss']
})

export class DrapDemoComponent implements OnInit {
    fileSet = [];

    constructor(private papa: PapaParseService) {}

    ngOnInit() {}

    readFile(event): void {
        this.papa.parse(event.target.files[0], {
            complete: result => {
                this.fileSet.push(result.data);
                console.log(this.fileSet);
            }
        });
    }

    removeItem(item: any, list: any[]): void {
        list.splice(list.indexOf(item), 1);
        console.log(this.fileSet);
    }

    download(index: number): void {
        const csvString = this.papa.unparse(this.fileSet[index]);
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    changeOrder(header, dest: number) {
        // console.log(header, dest);
        // console.log(this.fileSet[0][0].indexOf(header));
        console.log(this.fileSet[0][0]);
        // console.log(this.fileSet[0][0][this.fileSet[0][0].indexOf(header)]);
    }

    printItems(items): void {
        console.log(items);
    }
}
