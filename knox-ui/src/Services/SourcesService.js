import Source from '../Models/SourceModel';

const sourcesEndpoint = 'http://knox-master01.srv.aau.dk/accessapi/api/document-data-api/sources';

export function GetSources() {
    let sourceList = [];

    let response = fetch(sourcesEndpoint)
                    .then((response) => response.json())
                    .catch(() => { return []; });

    for (let jsonContent in response) {
        let source = new Source(jsonContent);
        sourceList.push(source);
    }

    return sourceList;
}

export default GetSources;
