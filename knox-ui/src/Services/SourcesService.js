//TODO: Move to ENV file
const sourcesEndpoint = 'http://localhost:8000/api/document-data-api/sources';

export class Source {
    id;
    name;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export function GetSources() {
    let sourceList = [];

    let response = fetch(sourcesEndpoint)
                    .then((response) => response.json())
                    .catch(e => { return []; });

    for (let jsonContent in response) {
        let source = new Source(jsonContent);
        sourceList.push(source);
    }

    return sourceList;
}

export default GetSources;
