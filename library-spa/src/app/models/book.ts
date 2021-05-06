import BooksEdition from "./bookEditions";

export default class Book {
    _id?: string;
    name?: string;
    publishingHouse?: string;
    publicationYear?: number;
    numberCopies?: number;
    nameEn?: string;
    booksEditions?: Array<BooksEdition>;
    authors?: Array<string>;
    genres?: Array<string>;
    description?: string;
    photo?: string;
}