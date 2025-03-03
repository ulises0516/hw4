

// pop up
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const contactModal  = document.getElementById('contactModal');

openModalBtn.addEventListener('click', () => {
  contactModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
  contactModal.close();
});

// theme switcher
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  const storedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', storedTheme);

  themeIcon.src = storedTheme === 'dark' ? "images/sun-icon.webp" : "images/moon-icon.svg";
  themeToggle.setAttribute("aria-label", storedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");

  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    themeIcon.src = newTheme === "dark" ? "images/sun-icon.webp" : "images/moon-icon.svg";
    themeToggle.setAttribute("aria-label", newTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
  });
});



