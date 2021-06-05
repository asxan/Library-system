import BooksEdition from "./bookEditions";
import Genre from "./genre";
import Author from './author'

export default class Book {
    _id: string;
    name: string;
    publishingHouse: string;
    publicationYear: number;
    booksEditions: Array<BooksEdition>;
    authors: Array<Author>;
    genres: Array<string>;
    description: string;
    photo: string;

    constructor(
    _id: string,
    name: string,
    publishingHouse: string,
    publicationYear: number,
    booksEditions: Array<BooksEdition>,
    authors: Array<Author>,
    genres: Array<string>,
    description: string,
    photo: string,
    ) {
        this._id = _id;
        this.authors = authors;
        this.name = name;
        this.publicationYear = publicationYear;
        this.publishingHouse = publishingHouse;
        this.booksEditions = booksEditions;
        this.genres = genres;
        this.description = description;
        this.photo = photo;
    }
}