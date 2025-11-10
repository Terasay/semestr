const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(l => l.classList.remove('active'));
            if (link) link.classList.add('active');
        }
    });
}

function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        parallaxBg.style.setProperty('--scroll-offset', `${scrolled * 0.5}px`);
    }

    if (scrolled > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

const projects = [
    {
        id: 1,
        title: 'E-commerce платформа',
        category: 'web',
        description: 'Современный интернет-магазин с корзиной и оплатой',
        image: 'images/ecom.jpg'
    },
    {
        id: 2,
        title: 'Мобильное приложение',
        category: 'app',
        description: 'Приложение для трекинга задач и продуктивности',
        image: 'images/mobile.webp'
    },
    {
        id: 3,
        title: 'UI/UX дизайн',
        category: 'design',
        description: 'Дизайн-система для финтех стартапа',
        image: 'images/uiux.jpg'
    },
    {
        id: 4,
        title: 'Корпоративный сайт',
        category: 'web',
        description: 'Многостраничный сайт с админ-панелью',
        image: 'images/korp.jpg'
    },
    {
        id: 5,
        title: 'Социальная сеть',
        category: 'app',
        description: 'Платформа для обмена контентом',
        image: 'images/social.jpg'
    },
    {
        id: 6,
        title: 'Landing Page',
        category: 'design',
        description: 'Продающая страница для SaaS продукта',
        image: 'images/landing.png'
    }
];

const projectsGrid = document.getElementById('projectsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderProjects(filter = 'all') {
    projectsGrid.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    filteredProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" width="160" height="160" style="object-fit:cover;border-radius:12px;">
            </div>
            <div class="project-content">
                <span class="project-category">${getCategoryName(project.category)}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

function getCategoryName(category) {
    const names = {
        web: 'Веб-сайт',
        app: 'Приложение',
        design: 'Дизайн'
    };
    return names[category] || category;
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        renderProjects(filter);
    });
});

function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formStatus = document.getElementById('formStatus');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const errorSpan = document.getElementById(input.id + 'Error');
    errorSpan.textContent = message;
    input.style.borderColor = '#e53e3e';
}

function clearError(input) {
    const errorSpan = document.getElementById(input.id + 'Error');
    errorSpan.textContent = '';
    input.style.borderColor = '#e2e8f0';
}

nameInput.addEventListener('input', () => {
    if (nameInput.value.length < 2) {
        showError(nameInput, 'Имя должно содержать минимум 2 символа');
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener('input', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Введите корректный email');
    } else {
        clearError(emailInput);
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.value.length < 10) {
        showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
    } else {
        clearError(messageInput);
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;

    if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Имя должно содержать минимум 2 символа');
        isValid = false;
    }

    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Введите корректный email');
        isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
        isValid = false;
    }

    if (isValid) {
        formStatus.textContent = 'Сообщение успешно отправлено!';
        formStatus.className = 'form-status success';
        contactForm.reset();
        
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 3000);
    } else {
        formStatus.textContent = 'Пожалуйста, исправьте ошибки в форме';
        formStatus.className = 'form-status error';
    }
});

const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTopBtn() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const heroBtn = document.getElementById('heroBtn');
heroBtn.addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.classList.contains('about-stats')) {
                animateNumbers();
            }
            if (entry.target.classList.contains('skills-grid')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

const sections = document.querySelectorAll('.section');
const aboutStats = document.querySelector('.about-stats');
const skillsGrid = document.querySelector('.skills-grid');

sections.forEach(section => observer.observe(section));
if (aboutStats) observer.observe(aboutStats);
if (skillsGrid) observer.observe(skillsGrid);

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            parallaxEffect();
            setActiveLink();
            toggleScrollTopBtn();
            ticking = false;
        });
        ticking = true;
    }
});

document.addEventListener('DOMContentLoaded', () => {

    renderProjects();
    
    parallaxEffect();
    setActiveLink();
    toggleScrollTopBtn();
    
    const cards = document.querySelectorAll('.skill-card, .contact-item, .project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card, .skill-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

const footer = document.querySelector('.footer');
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = footer.querySelectorAll('.footer-section');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = `fadeInUp 0.6s ease both`;
                }, index * 150);
            });
        }
    });
}, { threshold: 0.1 });

footerObserver.observe(footer);

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(() => {
    setActiveLink();
}, 250));
