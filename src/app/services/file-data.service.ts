import { Injectable } from '@angular/core';
import { FileSet } from '../models/models';

@Injectable()
export class FileDataService {
    fileSet: FileSet = new FileSet();

    constructor() {}
}
