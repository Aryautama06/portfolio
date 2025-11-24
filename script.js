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

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeSwitcherBtn');
  const popup = document.getElementById('themeSwitcherPopup');
  const options = popup ? popup.querySelectorAll('.theme-switcher-option') : [];
  const navLinks = document.querySelectorAll('.custom-nav ul li a');
  const navUl = document.querySelector('.custom-nav ul');
  const header = document.querySelector('.custom-header');

  /* THEME SWITCHER */
  if (btn && popup) {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      popup.classList.toggle('active');
    });

    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !popup.contains(e.target)) popup.classList.remove('active');
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') popup.classList.remove('active');
    });

    if (options.length) {
      options.forEach(opt => {
        opt.addEventListener('click', () => {
          const theme = opt.dataset.theme === 'light' ? 'light' : 'dark';
          document.body.classList.toggle('light-theme', theme === 'light');
          options.forEach(o => o.classList.toggle('selected', o === opt));
          popup.classList.remove('active');
          localStorage.setItem('theme', theme);
        });
      });

      const saved = localStorage.getItem('theme');
      if (saved === 'light') {
        document.body.classList.add('light-theme');
        options.forEach(o => o.classList.toggle('selected', o.dataset.theme === 'light'));
      } else {
        options.forEach(o => o.classList.toggle('selected', o.dataset.theme === 'dark'));
      }
    }
  }

  /* SMOOTH SCROLL (nav) */
  if (navLinks && navLinks.length) {
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;
        const extraGap = 14;
        const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraGap;

        window.scrollTo({ top: Math.max(0, Math.round(targetY)), behavior: 'smooth' });

        if (navUl && navUl.classList.contains('show')) navUl.classList.remove('show');

        navLinks.forEach(n => n.classList.remove('active'));
        this.classList.add('active');

        setTimeout(() => {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }, 600);
      });
    });
  }

  /* AOS INIT (load if needed) */
  if (window.AOS && typeof AOS.init === 'function') {
    AOS.init({ duration: 700, once: true, offset: 60 });
  } else {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/aos@2.3.4/dist/aos.js';
    s.onload = () => { if (window.AOS) AOS.init({ duration: 700, once: true, offset: 60 }); };
    document.head.appendChild(s);
  }
});