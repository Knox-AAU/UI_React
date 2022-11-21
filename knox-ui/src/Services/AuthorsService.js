import Author from '../Models/AuthorModel';

const authorsEndpoint = 'http://knox-master01.srv.aau.dk/accessapi/api/document-data-api/authors';

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
