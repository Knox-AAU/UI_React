const authorEndpoint = 'http://localhost:5501/document-data-api/authors';
const categoriesEndpoint = 'http://localhost:5501/document-data-api/categories';

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

export class Category {
    id;
    name;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export function GetCategories() {
    try {
        let categoryList = [];

        let response = fetch(categoriesEndpoint).then((response) => response.json());

        for (let jsonKey in response) {
            let category = new Category(jsonKey);
            categoryList.push(category);
        }

        return categoryList;
    } catch (e) {
        return;
    }
}

export function GetAuthors() {
    try {
        let authorList = [];

        let response = fetch(authorEndpoint).then((response) => response.json());

        for (let jsonKey in response) {
            let author = new Category(jsonKey);
            authorList.push(author);
        }

        return authorList;
    } catch (e) {
        return;
    }
}