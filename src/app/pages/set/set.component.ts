import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-set',
    templateUrl: './set.component.html',
    styleUrls: ['./set.component.scss']
})

export class SetComponent implements OnInit, OnDestroy {
    subscriptions = [];

    constructor(private aRoute: ActivatedRoute) {}

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

    readFile(event) {
        console.log(event);
    }
}
