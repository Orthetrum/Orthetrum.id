// Initialize Lucide Icons
lucide.createIcons();

// --- DARK MODE LOGIC ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

const updateThemeUI = (isDark) => {
    themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
};

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeUI(isDark);
});

// Load preferred theme
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    updateThemeUI(true);
}

// --- MOBILE MENU LOGIC ---
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

const toggleMenu = () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
};

menuOpen.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// --- SCROLL REVEAL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- NAVBAR SCROLL ADAPTIVE ---
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const navContainer = nav.querySelector('div');
    if (window.scrollY > 20) {
        nav.classList.add('py-3');
        navContainer.classList.add('shadow-2xl', 'bg-white/95', 'dark:bg-slate-900/95');
    } else {
        nav.classList.remove('py-3');
        navContainer.classList.remove('shadow-2xl', 'bg-white/95', 'dark:bg-slate-900/95');
    }
});

// --- HERO PARALLAX ---
document.addEventListener('mousemove', (e) => {
    const img = document.querySelector('.animate__animated img');
    if (!img) return;
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    img.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${x / 10}deg)`;
});

// --- ADDED: DRAGONFLY SWARM LOGIC ---
// Logika untuk membuat capung terbang secara acak dan alami
const createDragonfly = () => {
    const garden = document.getElementById('dragonfly-garden');
    if (!garden) return;

    const df = document.createElement('div');
    df.className = 'dragonfly-body';

    // Struktur sayap capung Orthetrum
    df.innerHTML = `
        <div class="dragonfly-wing-left"></div>
        <div class="dragonfly-wing-right"></div>
        <div class="dragonfly-wing-left" style="top:12px; width:22px; opacity:0.6;"></div>
        <div class="dragonfly-wing-right" style="top:12px; width:22px; opacity:0.6;"></div>
    `;

    // Posisi dan parameter terbang acak
    let posX = Math.random() * window.innerWidth;
    let posY = Math.random() * window.innerHeight;
    let angle = Math.random() * 360;
    let speed = 1.5 + Math.random() * 2.5;
    let turnSpeed = (Math.random() - 0.5) * 2;

    const move = () => {
        // Simulasi gerakan terbang serangga yang tidak kaku
        angle += turnSpeed;
        if (Math.random() > 0.95) turnSpeed = (Math.random() - 0.5) * 4;

        const rad = angle * Math.PI / 180;
        posX += Math.cos(rad) * speed;
        posY += Math.sin(rad) * speed;

        // Muncul kembali di sisi berlawanan jika keluar layar
        if (posX < -100) posX = window.innerWidth + 100;
        if (posX > window.innerWidth + 100) posX = -100;
        if (posY < -100) posY = window.innerHeight + 100;
        if (posY > window.innerHeight + 100) posY = -100;

        df.style.left = `${posX}px`;
        df.style.top = `${posY}px`;
        df.style.transform = `rotate(${angle + 90}deg)`;

        requestAnimationFrame(move);
    };

    garden.appendChild(df);
    move();
};

// Inisialisasi 6 capung dengan jeda waktu agar muncul bergantian
window.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 6; i++) {
        setTimeout(createDragonfly, i * 1200);
    }
});

// --- NEWLY ADDED: RESPONSIVE RESIZE HANDLER ---
// Memastikan posisi capung tetap dalam jangkauan saat layar di-resize
window.addEventListener('resize', () => {
    const dragonflies = document.querySelectorAll('.dragonfly-body');
    dragonflies.forEach(df => {
        const x = parseFloat(df.style.left);
        const y = parseFloat(df.style.top);
        if (x > window.innerWidth) df.style.left = `${window.innerWidth - 50}px`;
        if (y > window.innerHeight) df.style.top = `${window.innerHeight - 50}px`;
    });
});