import Category from '../Models/CategoryModel';

const categoriesEndpoint = 'http://knox-master01.srv.aau.dk/accessapi/api/document-data-api/categories';

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
