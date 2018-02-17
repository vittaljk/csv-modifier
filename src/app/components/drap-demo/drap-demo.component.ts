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

    ngOnInit() { }

    readFile(event): void {
        this.papa.parse(event.target.files[0], {
            complete: (result) => {
                this.simpleList.push(result.data);
                const csv = this.papa.unparse(result.data);
                console.log(csv);
            }
        });
    }

    removeItem(item: any, list: any[]): void {
        list.splice(list.indexOf(item), 1);
    }
}
