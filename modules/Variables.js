// Declare constant variables that are the elments that will be altered universally
const form = document.getElementById('form');
const booksContainer = document.querySelector('.added-books-container');
const main = document.querySelector('main');
const sections = Array.from(document.querySelectorAll('section'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const bookLists = document.getElementById('books-lists');
const addNew = document.getElementById('add-new');
const contact = document.getElementById('contact');

export {
  form,
  booksContainer,
  bookLists,
  main,
  sections,
  navLinks,
  addNew,
  contact,
};