// Inisialisasi AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
});

// Animasi progress bar skills saat discroll
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card .progress');
    skillCards.forEach((bar) => {
        bar.style.width = '0';
    });

    function animateSkills() {
        const skillsSection = document.getElementById('skills');
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            skillCards.forEach((bar) => {
                bar.style.width = bar.getAttribute('style').match(/width:\s*(\d+%)/)[1];
            });
            window.removeEventListener('scroll', animateSkills);
        }
    }
    window.addEventListener('scroll', animateSkills);
    animateSkills();
});

// Form kontak dinamis
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('formMessage').textContent = "Terima kasih! Pesan Anda sudah terkirim.";
    this.reset();
});

// Toggle tema dark/light
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const userTheme = localStorage.getItem('theme');

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    } else {
        document.body.classList.remove('dark');
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    }
    localStorage.setItem('theme', theme);
}

// Set theme saat load
if (userTheme === 'dark' || (userTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme('dark');
} else {
    setTheme('light');
}

themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

// Update lebar progress bar sesuai dengan data-skills
document.querySelectorAll('.skill-card').forEach(card => {
    const progressBar = card.querySelector('.bar-fill');
    const skillLevel = progressBar.style.getPropertyValue('--bar-width');
    progressBar.style.width = skillLevel;
});