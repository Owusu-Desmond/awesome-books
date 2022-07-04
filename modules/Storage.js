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
      // Check if books exist or not, if not then add them to Local Storage
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

  export default Storage;