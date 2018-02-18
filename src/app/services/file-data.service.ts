import { Injectable } from '@angular/core';
import { FileSet } from '../models/models';

@Injectable()
export class FileDataService {
    fileData: { [key: string]: FileSet } = {};
    activeSet: string;

    constructor() { }

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
