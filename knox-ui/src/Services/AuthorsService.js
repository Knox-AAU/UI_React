import Author from '../Models/AuthorModel';

const authorsEndpoint = process.env.REACT_APP_ACCESS_API + process.env.REACT_APP_AUTHORS_ENDPOINT;

export function GetAuthors() {
    let authorList = [];

    let response = fetch(authorsEndpoint)
                    .then((response) => response.json())
                    .catch(() => { return []; });

    for (let jsonContent in response) {
        let author = new Author(jsonContent);
        authorList.push(author);
    }

    return authorList;
}

export default GetAuthors;
