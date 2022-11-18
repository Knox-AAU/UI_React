import Author from '../Models/AuthorModel';

//TODO: Move to ENV file
const authorsEndpoint = 'http://localhost:8000/api/document-data-api/authors';

export function GetAuthors() {
    let authorList = [];

    let response = fetch(authorsEndpoint)
                    .then((response) => response.json())
                    .catch(e => { return []; });

    for (let jsonContent in response) {
        let author = new Author(jsonContent);
        authorList.push(author);
    }

    return authorList;
}

export default GetAuthors;
