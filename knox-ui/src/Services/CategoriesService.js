const categoriesEndpoint = 'http://localhost:8000/api/document-data-api/categories';

export class Category {
    id;
    name;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export function GetCategories() {
    let categoryList = [];

    let response = fetch(categoriesEndpoint)
                    .then((response) => response.json())
                    .catch(e => { return []; });

    for (let jsonContent in response) {
        let category = new Category(jsonContent);
        categoryList.push(category);
    }

    return categoryList;
}

export default GetCategories;
