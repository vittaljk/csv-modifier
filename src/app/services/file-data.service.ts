import { Injectable } from '@angular/core';
import { FileSet, SetItem } from '../models/models';

@Injectable()
export class FileDataService {
    sets: Array<SetItem> = [];
    fileData: { [key: string]: FileSet } = {};
    activeSet: string;

    constructor() {

    }

    getFileData(): { [key: string]: FileSet } {
        return this.fileData;
    }

    getSetBykey(key) {
        return this.fileData[key];
    }

    setActiveSet(activeSet: string): void {
        this.activeSet = activeSet;
    }

    getActiveSet(): string {
        return this.activeSet;
    }
}
