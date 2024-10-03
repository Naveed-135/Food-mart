// Add active class to the current page in the navigation
var currentPage = window.location.pathname.split('/').pop();
var navLinks = document.querySelectorAll('nav ul li a');
for (var i = 0; i < navLinks.length; i++) {
  if (navLinks[i].getAttribute('href') === currentPage) {
    navLinks[i].classList.add('active');
  }
}
