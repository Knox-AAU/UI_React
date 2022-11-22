export class Document {
    id;
    sourceId;
    categoryId;
    publication;
    title;
    author;

    constructor(id, sourceId, categoryId, publication, title, author) {
        this.id = id;
        this.sourceId = sourceId;
        this.categoryId = categoryId;
        this.publication = publication;
        this.title = title;
        this.author = author;
    }
}

export default Document;