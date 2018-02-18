import { Injectable } from '@angular/core';
import { FileSet } from '../models/models';

@Injectable()
export class FileDataService {
    fileData: { [key: string]: FileSet };

    constructor() {}
}
