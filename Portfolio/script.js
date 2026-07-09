const roles = [
  "Angular UI Developer",
  "TypeScript Specialist",
  "Frontend Performance Enthusiast",
];

const typedRole = document.getElementById("typedRole");
const themeToggle = document.getElementById("themeToggle");
const toTopBtn = document.getElementById("toTopBtn");
const scrollProgress = document.getElementById("scrollProgress");
const skillSearch = document.getElementById("skillSearch");
const skillCards = [...document.querySelectorAll(".skill-card")];
const year = document.getElementById("year");
const awardsYearFilter = document.getElementById("awardsYearFilter");
const awardsScroll = document.getElementById("awardsScroll");
const awardItems = [...document.querySelectorAll(".award-item")];

year.textContent = new Date().getFullYear();

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  if (!deleting) {
    charIndex += 1;
    typedRole.textContent = currentRole.slice(0, charIndex);
    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeRole, 1100);
      return;
    }
  } else {
    charIndex -= 1;
    typedRole.textContent = currentRole.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 55 : 90);
}

typeRole();

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;

  toTopBtn.style.display = scrollTop > 360 ? "grid" : "none";
  toTopBtn.style.placeItems = "center";
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

skillSearch.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  skillCards.forEach((card) => {
    const matches = card.textContent.toLowerCase().includes(query);
    card.style.display = matches ? "block" : "none";
  });
});

if (awardsYearFilter && awardItems.length > 0) {
  awardsYearFilter.addEventListener("change", (event) => {
    const selectedYear = event.target.value;
    awardItems.forEach((item) => {
      const isVisible = selectedYear === "all" || item.dataset.year === selectedYear;
      item.style.display = isVisible ? "block" : "none";
    });

    if (awardsScroll) {
      awardsScroll.scrollLeft = 0;
    }
  });
}
