const main = document.querySelector('main');
const sections = Array.from(document.querySelectorAll('section'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

// display sections base on the active link on
const displayPage = (num) => {
  sections.forEach((section) => section.classList.add('hide'));
  main.children[num].classList.remove('hide');
  navLinks.forEach((link) => { link.className = 'nav-link'; });
  navLinks[num].classList.add('active');
};