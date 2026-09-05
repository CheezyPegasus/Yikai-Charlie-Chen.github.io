const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.primary-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

// V10.2 visibility fix:
// Page content no longer depends on IntersectionObserver/JavaScript to be visible.
// This prevents the hero and sections from disappearing if JS is blocked, delayed,
// cached incorrectly, or an observer fails to initialize.
