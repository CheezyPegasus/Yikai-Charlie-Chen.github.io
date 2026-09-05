/*
AI USAGE (15-113 Project 1):
ChatGPT helped explain and prototype the navigation interaction and debugging process.
I adapted the JavaScript to this site and specifically changed the earlier reveal-animation
approach so page content remains visible even if JavaScript is delayed or unavailable.
*/

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


// Interactive portrait medallion:
// Hover/focus flips the Marian image to Charlie's portrait in CSS.
// Click/tap and Enter/Space provide the same interaction on touch and keyboard devices.
const medallionFrame = document.querySelector('.medallion-frame');
if (medallionFrame) {
  const toggleMedallion = () => medallionFrame.classList.toggle('is-flipped');

  medallionFrame.addEventListener('click', toggleMedallion);
  medallionFrame.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMedallion();
    }
  });
}
