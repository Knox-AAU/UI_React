import Source from '../Models/SourceModel';

const sourcesEndpoint = process.env.REACT_APP_ACCESS_API + process.env.REACT_APP_SEARCH_ENDPOINT;

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
