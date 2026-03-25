// === PRELOADER ===
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }, 1000); 
    
    document.getElementById('year').textContent = new Date().getFullYear();
    updateTime();
    setInterval(updateTime, 1000);
});

// === LOCAL TIME LOGIC ===
function updateTime() {
    const timeDisplay = document.getElementById('local-time');
    if(timeDisplay) {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString('id-ID', {
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });
    }
}

// === DARK MODE LOGIC ===
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    html.classList.remove('dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        localStorage.theme = 'dark';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.theme = 'light';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// === MOBILE MENU ===
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('close-menu');
const links = document.querySelectorAll('.mobile-link');

const toggleMenu = () => {
    const isOpen = menu.style.opacity === '1';
    menu.style.opacity = isOpen ? '0' : '1';
    menu.style.pointerEvents = isOpen ? 'none' : 'auto';
};

btn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
links.forEach(link => link.addEventListener('click', toggleMenu));

// === SCROLL TO TOP & ACTIVE NAVIGATION (ScrollSpy) ===
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const floatingCvBtn = document.getElementById('floating-cv-btn');
const sections = document.querySelectorAll('.section-spy');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Floating Buttons Visibility
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.add('pointer-events-auto');
        
        if (floatingCvBtn) {
            floatingCvBtn.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
            floatingCvBtn.classList.add('pointer-events-auto');
        }
    } else {
        scrollToTopBtn.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.remove('pointer-events-auto');
        
        if (floatingCvBtn) {
            floatingCvBtn.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
            floatingCvBtn.classList.remove('pointer-events-auto');
        }
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'dark:text-white', 'font-bold');
        link.classList.add('text-slate-600', 'dark:text-slate-400');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('text-primary', 'dark:text-white', 'font-bold');
            link.classList.remove('text-slate-600', 'dark:text-slate-400');
        }
    });
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === PROJECT FILTER LOGIC ===
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projects.forEach(project => {
            const categories = project.getAttribute('data-filter-category').split(' ');
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                project.style.display = 'block';
                project.classList.add('reveal-on-scroll', 'is-visible');
            } else {
                project.style.display = 'none';
                project.classList.remove('reveal-on-scroll', 'is-visible');
            }
        });
    });
});

// === 3D TILT EFFECT ===
if (window.matchMedia("(min-width: 768px)").matches) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3; 
            const rotateY = ((x - centerX) / centerX) * 3;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// === PARALLAX EFFECT ===
window.addEventListener('scroll', () => {
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach(img => {
        const rect = img.parentElement.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
            const speed = 0.08;
            const yPos = (window.innerHeight - rect.top) * speed;
            img.style.transform = `translateY(${yPos - 20}px) scale(1.1)`;
        }
    });
});

// === PROJECT MODAL LOGIC ===
const modal = document.getElementById('project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const triggers = document.querySelectorAll('.project-trigger');

const mTitle = document.getElementById('modal-title');
const mCategory = document.getElementById('modal-category');
const mImage = document.getElementById('modal-image');
const mDesc = document.getElementById('modal-desc');
const mLink = document.getElementById('modal-link');
const mSource = document.getElementById('modal-source');
const mTechContainer = document.getElementById('modal-technologies');
const mTechSection = document.getElementById('modal-tech-section');

function openModal(data) {
    mTitle.textContent = data.title;
    mCategory.textContent = data.category;
    mImage.src = data.image;
    mDesc.textContent = data.desc;

    if (mLink) {
        if (data.link) {
            mLink.href = data.link;
            mLink.classList.remove('hidden');
        } else {
            mLink.classList.add('hidden');
            mLink.href = '#';
        }
    }

    if (mSource) {
        if (data.source) {
            mSource.href = data.source;
            mSource.classList.remove('hidden');
        } else {
            mSource.classList.add('hidden');
            mSource.href = '#';
        }
    }

    if (mTechContainer) {
        mTechContainer.innerHTML = '';
        if (data.technologies) {
            mTechSection.classList.remove('hidden');
            const techs = data.technologies.split(',').map(t => t.trim());
            techs.forEach(tech => {
                if (tech) {
                    const span = document.createElement('span');
                    span.className = 'px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300';
                    span.textContent = tech;
                    mTechContainer.appendChild(span);
                }
            });
        } else {
            mTechSection.classList.add('hidden');
        }
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
        modalBackdrop.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden'; 
}

function hideModal() {
    modalBackdrop.classList.add('opacity-0');
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const data = {
            title: trigger.dataset.title,
            category: trigger.dataset.category,
            image: trigger.dataset.image,
            desc: trigger.dataset.desc,
            link: trigger.dataset.link,
            source: trigger.dataset.source,
            technologies: trigger.dataset.technologies
        };
        openModal(data);
    });
});

closeModal.addEventListener('click', hideModal);
modalBackdrop.addEventListener('click', hideModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideModal();
});

// === TOAST NOTIFICATION LOGIC ===
const toastContainer = document.getElementById('toast-container');
const contactForm = document.getElementById('contact-form');

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    
    const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
    const colorClass = type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-black' : 'bg-red-500 text-white';

    toast.className = `flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl font-medium text-sm toast-enter toast-enter-active ${colorClass}`;
    toast.innerHTML = `${icon} <span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('toast-enter-active');
        toast.classList.add('toast-exit-active');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-circle-notch animate-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
        showToast('Message sent successfully! We will contact you shortly.');
        e.target.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
});

// === SCROLL REVEAL ANIMATION [MODERN] ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
});

// === MAGNETIC BUTTON EFFECT ===
const magneticBtns = document.querySelectorAll('.magnetic-btn');

if (window.matchMedia("(min-width: 768px)").matches) {
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

// === SPOTLIGHT EFFECT LOGIC [NEW] ===
const spotlightCards = document.querySelectorAll('.spotlight-card');

spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        
    });
});

// === GITHUB DASHBOARD LOGIC ===
const githubUsername = 'Athexdev';

async function fetchGitHubData() {
    try {
        const userRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        const userData = await userRes.json();
        
        const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`);
        const reposData = await reposRes.json();

        // Total Stars
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        // Update Counter Data Targets
        if (document.getElementById('repo-count')) document.getElementById('repo-count').setAttribute('data-target', userData.public_repos || 0);
        if (document.getElementById('followers-count')) document.getElementById('followers-count').setAttribute('data-target', userData.followers || 0);
        if (document.getElementById('following-count')) document.getElementById('following-count').setAttribute('data-target', userData.following || 0);
        if (document.getElementById('stars-count')) document.getElementById('stars-count').setAttribute('data-target', totalStars || 0);

        // Render Repositories
        const reposContainer = document.getElementById('github-repos');
        if (reposContainer) {
            const latestRepos = reposData.filter(repo => !repo.fork).slice(0, 4);
            
            latestRepos.forEach((repo, index) => {
                const repoCard = document.createElement('div');
                repoCard.className = `bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-3xl p-6 spotlight-card hoverable flex flex-col justify-between group reveal-on-scroll delay-${(index % 4) * 100}`;
                repoCard.innerHTML = `
                    <div class="spotlight-overlay"></div>
                    <div class="relative z-10">
                        <div class="flex justify-between items-start mb-4">
                            <h4 class="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                            </h4>
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-primary transition-colors">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                        <p class="text-slate-500 text-sm mb-6 line-clamp-2">
                            ${repo.description || 'No description available for this repository.'}
                        </p>
                    </div>
                    <div class="flex items-center gap-4 text-xs font-bold text-slate-500 relative z-10">
                        ${repo.language ? `<span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-primary"></span> ${repo.language}</span>` : ''}
                        <span class="flex items-center gap-1"><i class="fas fa-star text-yellow-500"></i> ${repo.stargazers_count}</span>
                        <span class="flex items-center gap-1"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    </div>
                `;
                
                repoCard.addEventListener('mousemove', (e) => {
                    const rect = repoCard.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    repoCard.style.setProperty('--mouse-x', `${x}px`);
                    repoCard.style.setProperty('--mouse-y', `${y}px`);
                });
                
                reposContainer.appendChild(repoCard);
                
                if (window.observer) {
                    window.observer.observe(repoCard);
                } else if (observer) {
                    observer.observe(repoCard);
                }
            });
        }

        initCounters();

    } catch (error) {
        console.error('Error fetching GitHub data:', error);
    }
}

function initCounters() {
    const counters = document.querySelectorAll('.github-counter');
    const speed = 200; 

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const githubSection = document.getElementById('github-counters');
    if (githubSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        counterObserver.observe(githubSection);
    }
}

window.addEventListener('load', fetchGitHubData);

// === TYPING EFFECT LOGIC ===
const typedTextElement = document.getElementById('typed-text');
const typedRoles = ['Software Developer', 'Cloud Enthusiast', 'Open Source Contributor','Cyber Security Enthusiast','AI/ML Enthusiast'];
let typedRoleIndex = 0;
let typedCharIndex = 0;
let isTypingDeleting = false;

function typeRoleEffect() {
    if (!typedTextElement) return;

    const currentRole = typedRoles[typedRoleIndex];
    
    if (isTypingDeleting) {
        typedTextElement.textContent = currentRole.substring(0, typedCharIndex - 1);
        typedCharIndex--;
    } else {
        typedTextElement.textContent = currentRole.substring(0, typedCharIndex + 1);
        typedCharIndex++;
    }

    let typeSpeed = isTypingDeleting ? 40 : 100;

    if (!isTypingDeleting && typedCharIndex === currentRole.length) {
        typeSpeed = 2000; 
        isTypingDeleting = true;
    } else if (isTypingDeleting && typedCharIndex === 0) {
        isTypingDeleting = false;
        typedRoleIndex = (typedRoleIndex + 1) % typedRoles.length;
        typeSpeed = 500; 
    }

    setTimeout(typeRoleEffect, typeSpeed);
}

if (typedTextElement) {
    setTimeout(typeRoleEffect, 1200); 
}
