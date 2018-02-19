import { Component, OnInit } from '@angular/core';
import { SetItem, FileSet } from '../../models/models';
import { Router } from '@angular/router';
import * as _ from 'underscore';

// services
import { FileDataService } from '../../services/file-data.service';

@Component({
    selector: 'app-sets-list',
    templateUrl: './sets-list.component.html',
    styleUrls: ['./sets-list.component.scss']
})

export class SetsListComponent implements OnInit {
    sets: Array<SetItem>;

    constructor(private router: Router, private fileDataService: FileDataService) {
        this.initializeSets();
        this.initializeFileData();
    }

    initializeSets(): void {
        if (this.fileDataService.sets.length === 0) {
            this.fileDataService.sets.push(
                new SetItem({ id: 'set_1', name: 'set 1' }),
                new SetItem({ id: 'set_2', name: 'set 2' })
            );
        }
        this.sets = this.fileDataService.sets;
    }

    initializeFileData(): void {
        if (_.isEmpty(this.fileDataService.fileData)) {
            this.fileDataService.sets.forEach(set => {
                this.fileDataService.fileData[set.id] = new FileSet({
                    headers: [],
                    files: []
                });
            });
        }
    }

    ngOnInit() { }

    addSet(): void {
        const setsCount = this.fileDataService.sets.length + 1;
        this.fileDataService.sets.push(new SetItem({ id: `set_${setsCount}`, name: `set ${setsCount}` }));
        this.fileDataService.fileData[`set_${setsCount}`] = new FileSet({
            headers: [],
            files: []
        });
    }

    goToSet(setId: string): void {
        this.router.navigate([`set/${setId}`]);
    }
}
