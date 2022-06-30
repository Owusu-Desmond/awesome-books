// Declare constant variables that are the elments that will be altered universally
const form = document.getElementById('form');
const booksContainer = document.querySelector('.added-books-container');
const main = document.querySelector('main');
const sections = Array.from(document.querySelectorAll('section'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const bookLists = document.getElementById('books-lists');
const addNew = document.getElementById('add-new');
const contact = document.getElementById('contact');

// Book Class : Creates a Book when Instantiated
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
// Storage Class: Handles all Operations on Local Storage
class Storage {
  // set new or modified books to storage
  static setBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  // Retrieve books from Storage
  static getBooks() {
    const books = JSON.parse(localStorage.getItem('books'));
    return books;
  }

  // add book to already existing books in storage
  static addBook(book) {
    const books = this.getBooks();
    // Check if books exist then add them to Local Storage
    if (!books) {
      const books = [];
      this.setBooks(books);
      books.push(book);
      this.setBooks(books);
    } else {
      books.push(book);
      this.setBooks(books);
    }
  }

  static removeBook(bookTitle, bookAuthor) {
    const books = this.getBooks();
    books.forEach((b, index) => {
      if (bookTitle === b.title && bookAuthor === b.author) {
        books.splice(index, 1);
        this.setBooks(books);
      }
    });
  }
}
// User Class : Updates Specific parts of the User Interface ======
class UI {
  // get books from storage and show them to the UI
  static updateBooks(booksContainer) {
    const books = Storage.getBooks();
    booksContainer.innerHTML = '';
    if (books) books.forEach((book) => this.addBook(book));
  }

  // add book
  static addBook(book) {
    const uniqueBookId = (book.title + book.author).replace(/\s/g, "")
    const bookUI = document.createElement('div');
    bookUI.className = 'book';
    bookUI.setAttribute('id', (uniqueBookId));
    
    bookUI.innerHTML = `
                  <p class="book-title">"
                      <span id='${uniqueBookId}title'>${book.title}</span>" by 
                      <span id='${uniqueBookId}author'>${book.author}</span>
                  </p>
                  <button class="${uniqueBookId}btn remove-button" type="button" class="remove-button">
                      &times;
                  </button>
          `;
    booksContainer.append(bookUI);
  }

  // clear book after from submit
  static clearInputs() {
    form.elements.title.value = '';
    form.elements.author.value = '';
  }

  // remove book
  static removeBook(uniqueBookId) {
    document.getElementById(uniqueBookId).remove()
  }

  // display error message
  static displayError(message) {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.innerHTML = message;
    // remove error massage after 5s time
    setTimeout(() => {
      errorMessage.innerHTML = '';
    }, 5000);
  }

  // validation
  static validate(book) {
    const books = Storage.getBooks();
    if (!books) return true;
    let userExist = 'No';
    books.forEach((b) => {
      if (b.title === book.title && b.author === book.author) userExist = 'Yes';
    });
    if (userExist === 'No') return true;
    this.displayError('Book title and author already added');
    return false;
  }
}
// Form Function : Listens for Form Submission then executes Functions
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const book = new Book(title, author);
  // Test String for letters
  const validate = /[a-zA-Z]/g;

  if (validate.test(title) && validate.test(author) && UI.validate(book)) {
    Storage.addBook(book);
    UI.addBook(book);
    UI.updateBooks(booksContainer);
    UI.clearInputs();
  }
});
// Display Books When Page is loads
UI.updateBooks(document.querySelector('.added-books-container'));
// Remove completely from storage and UI
const removeBook = () => {
  booksContainer.addEventListener('click', (e) => {
    const books = Storage.getBooks();
    books.forEach((b) => {
    const uniqueBookId = (b.title + b.author).replace(/\s/g, "")
    if (e.target.classList.contains(`${uniqueBookId}btn`)) {
        const bookTitle = document.getElementById(`${uniqueBookId}title`).innerHTML;
        const bookAuthor = document.getElementById(`${uniqueBookId}author`).innerHTML;
        Storage.removeBook(bookTitle, bookAuthor);
        // from from UI
        UI.removeBook(uniqueBookId);
      }
    });
  });
};
// call removeBook function whenever document is click
document.addEventListener('click', () => {
  removeBook();
});
// display sections base on the active link on
const displayPage = (num) => {
  sections.forEach((section) => section.classList.add('hide'));
  main.children[num].classList.remove('hide');
  navLinks.forEach((link) => { link.className = 'nav-link'; });
  navLinks[num].classList.add('active');
};
bookLists.onclick = () => displayPage(0);
addNew.onclick = () => displayPage(1);
contact.onclick = () => displayPage(2);