import Storage from './Storage.js';
import UI from './UI.js';
import { booksContainer, sections, main, navLinks} from './modules/Variables.js';
// Remove completely from storage and UI
const removeBook = () => {
    booksContainer.addEventListener('click', (e) => {
        const books = Storage.getBooks();
        books.forEach((b) => {
            const uniqueBookId = (b.title + b.author).replace(/\s/g, '');
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
// display sections base on the active link on

const displayPage = (num) => {
    sections.forEach((section) => section.classList.add('hide'));
    main.children[num].classList.remove('hide');
    navLinks.forEach((link) => { link.className = 'nav-link'; });
    navLinks[num].classList.add('active');
};

export {displayPage, removeBook}