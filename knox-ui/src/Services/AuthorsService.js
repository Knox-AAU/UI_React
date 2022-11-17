const authorsEndpoint = 'http://localhost:8000/api/document-data-api/authors';

export class Author {
    firstname;
    middleName;
    lastname;

    constructor(firstname, middleName, lastname) {
        this.firstname = firstname;
        this.middleName = middleName;
        this.lastname = lastname;
    }

    static from(json) {
        return Object.assign(new Author(), json);
    }
}

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
