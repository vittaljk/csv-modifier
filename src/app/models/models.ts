interface IFileSet {
    headers: Array<any>;
    files: Array<any>;
}

class FileSet {
    headers = [];
    files = [];

    constructor(options: IFileSet) {
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
    }
}

interface ISet {
    id: string;
    name: string;
}

class SetItem {
    id: string;
    name: string;

    constructor(options: ISet) {
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
    }
}

export { FileSet, SetItem };
