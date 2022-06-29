// Declare constant variables that are the elments that will be altered universally
const form = document.getElementById('form');
const booksContainer = document.querySelector('.added-books-container');
const main = document.querySelector('main');
const sections = Array.from(document.querySelectorAll('section'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

// Book Class : Creates a Book when Instantiated
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
// Store Class: Handles all Operations on Local Storage
class Store {

    static setBook(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    // Retrieve books from Storage
    static getBooks() {
        const books = JSON.parse(localStorage.getItem('books'));
        return books;
    }

    static addBook(book) {
        const books = JSON.parse(localStorage.getItem('books'));
        // Check if books exist then add them to Local Storage
        if (!books) {
            const books = [];
            this.setBook(books);
            books.push(book);
            this.setBook(books);
        } else {
            books.push(book);
            this.setBook(books);
        }
    }

    static removeBook(bookTitle, bookAuthor) {
        const books = this.getBooks();
        books.forEach((b, index) => {
            if (bookTitle === b.title && bookAuthor === b.author) {
                books.splice(index, 1);
                this.setBook(books);
            }
        });
    }
}
// display sections base on the active link on
const displayPage = (num) => {
    sections.forEach((section) => section.classList.add('hide'));
    main.children[num].classList.remove('hide');
    navLinks.forEach((link) => { link.className = 'nav-link'; });
    navLinks[num].classList.add('active');
};