import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-drap-demo',
    templateUrl: './drap-demo.component.html',
    styleUrls: ['./drap-demo.component.scss']
})

export class DrapDemoComponent implements OnInit {
    public simpleList = [
        [
            { 'name': 'John' },
            { 'name': 'Smith' },
            { 'name': 'George' },
        ],
        [
            { 'name': 'Jennifer' },
            { 'name': 'Laura' },
            { 'name': 'Georgina' },
        ]
    ];

    public removeItem(item: any, list: any[]): void {
        list.splice(list.indexOf(item), 1);
    }

    constructor() {}

    ngOnInit() {}
}
