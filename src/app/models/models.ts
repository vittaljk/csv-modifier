class FileSet {
    headers = [];
    files = [];

    constructor() {}
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
