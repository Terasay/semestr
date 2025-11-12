const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        }, 50);
    });

    const clickables = document.querySelectorAll('a, button, .project-card, .skill-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

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
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    document.querySelectorAll('.shape').forEach(shape => {
        const speed = parseFloat(shape.dataset.speed);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });

    if (scrolled > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

const typingText = document.getElementById('typingText');
const texts = ['Веб-разработчик', 'Frontend разработчик', 'UI/UX дизайнер', 'Фрилансер'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

setTimeout(typeText, 1000);

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
                <img src="${project.image}" alt="${project.title}" loading="lazy">
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
        if (stat.classList.contains('counted')) return;
        
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
                stat.classList.add('counted');
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        if (bar.classList.contains('animated')) return;
        
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
            bar.classList.add('animated');
        }, 100);
    });
}

const testimonials = [
    {
        name: 'Анна Иванова',
        role: 'CEO Tech Solutions',
        text: 'Отличная работа! Сайт получился современным и функциональным. Все было сделано в срок и с высоким качеством.',
        avatar: 'А'
    },
    {
        name: 'Дмитрий Петров',
        role: 'Владелец бизнеса',
        text: 'Профессиональный подход к работе. Рекомендую как надежного разработчика, который понимает потребности клиента.',
        avatar: 'Д'
    },
    {
        name: 'Елена Смирнова',
        role: 'Marketing Manager',
        text: 'Превосходный результат! Дизайн сайта полностью соответствует нашему бренду. Очень довольны сотрудничеством.',
        avatar: 'Е'
    }
];

const testimonialsWrapper = document.getElementById('testimonialsWrapper');
const sliderDots = document.getElementById('sliderDots');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
let currentSlide = 0;

function renderTestimonials() {
    testimonialsWrapper.innerHTML = '';
    sliderDots.innerHTML = '';
    
    testimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-avatar">${testimonial.avatar}</div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <h4 class="testimonial-author">${testimonial.name}</h4>
            <p class="testimonial-role">${testimonial.role}</p>
        `;
        testimonialsWrapper.appendChild(card);
        
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    updateSlider();
}

function updateSlider() {
    testimonialsWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    const dots = sliderDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    updateSlider();
}

sliderNext.addEventListener('click', nextSlide);
sliderPrev.addEventListener('click', prevSlide);

setInterval(nextSlide, 5000);

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
    if (errorSpan) {
        errorSpan.textContent = message;
        input.style.borderColor = '#e53e3e';
    }
}

function clearError(input) {
    const errorSpan = document.getElementById(input.id + 'Error');
    if (errorSpan) {
        errorSpan.textContent = '';
        input.style.borderColor = '#e2e8f0';
    }
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
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('reveal-left') || 
                entry.target.classList.contains('reveal-right') || 
                entry.target.classList.contains('reveal-bottom')) {
                entry.target.classList.add('active');
            }
            
            if (entry.target.classList.contains('about-stats')) {
                animateNumbers();
            }
            if (entry.target.classList.contains('skills-grid')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom').forEach(el => {
    observer.observe(el);
});

const aboutStats = document.querySelector('.about-stats');
const skillsGrid = document.querySelector('.skills-grid');

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

document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card, .service-card, .skill-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const xRotation = ((y - rect.height / 2) / rect.height) * -10;
            const yRotation = ((x - rect.width / 2) / rect.width) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-5px)`;
        } else {
            card.style.transform = '';
        }
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

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderTestimonials();
    
    parallaxEffect();
    setActiveLink();
    toggleScrollTopBtn();
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent)';
    ripple.style.left = e.clientX - 10 + 'px';
    ripple.style.top = e.clientY - 10 + 'px';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple-effect 0.6s ease-out';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(10);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
