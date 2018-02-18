import { Component, OnInit } from '@angular/core';
import { SetItem } from '../../models/models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sets-list',
    templateUrl: './sets-list.component.html',
    styleUrls: ['./sets-list.component.scss']
})

export class SetsListComponent implements OnInit {
    sets: Array<SetItem> = [
        new SetItem({id: 'set_1', name: 'set 1'}),
        new SetItem({id: 'set_2', name: 'set 2'})
    ];

    constructor(private router: Router) {}

    ngOnInit() { }

    addSet(): void {
        this.sets.push({ id: 'set_3', name: 'set 3' });
    }

    goToSet(setId: string): void {
        this.router.navigate([`set/${setId}`]);
    }
}
