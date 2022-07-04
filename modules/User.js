import { booksContainer, form } from './Variables.js';
// User Class : Updates Specific parts of the User Interface
class UI {
  // get books from storage and show them to the UI
  static retrieveBooks(books) {
    if (books) books.forEach((book) => this.addBook(book));
  }

  // add book
  static addBook(book) {
    const uniqueBookId = (book.title + book.author).replace(/\s/g, '');
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
    document.getElementById(uniqueBookId).remove();
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
}

export default UI;