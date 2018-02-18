import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PapaParseService } from 'ngx-papaparse';
import { FileSet } from '../../models/models';

@Component({
    selector: 'app-set',
    templateUrl: './set.component.html',
    styleUrls: ['./set.component.scss']
})

export class SetComponent implements OnInit, OnDestroy {
    subscriptions = [];
    fileSet: FileSet = new FileSet();

    constructor(private aRoute: ActivatedRoute, private papa: PapaParseService) {}

    ngOnInit() {
        const paramSub = this.aRoute.params.subscribe(params => {
            console.log(params['id']);
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
                this.fileSet.headers.push(result.data[0]);
                result.data.shift();
                this.fileSet.files.push(result.data);
                console.log(this.fileSet);
            }
        });
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
}
