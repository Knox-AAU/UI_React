import Category from '../Models/CategoryModel';

const categoriesEndpoint = process.env.REACT_APP_ACCESS_API + process.env.REACT_APP_CATEGORIES_ENDPOINT;

export function GetCategories() {
    let categoryList = [];

    let response = fetch(categoriesEndpoint)
                    .then((response) => response.json())
                    .catch(() => { return []; });

    for (let jsonContent in response) {
        let category = new Category(jsonContent);
        categoryList.push(category);
    }

    return categoryList;
}

export default GetCategories;
