const scrollContainer = document.querySelector('.scroll-container');
const cursorGlow = document.getElementById('cursor-glow');

// ===== MOUSE TRACKING GLOW =====
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = (e.clientX - 250) + 'px';
    cursorGlow.style.top = (e.clientY - 250) + 'px';
});

// ===== SCROLL PROGRESS BAR =====
scrollContainer.onscroll = function() {
    let winScroll = scrollContainer.scrollTop;
    let height = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
};

// ===== HACKER TEXT EFFECT =====
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function applyHackerEffect(element) {
    const originalText = element.innerText;
    let interval = null;

    element.onmouseover = event => {
        let iteration = 0;
        clearInterval(interval);
        
        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            
            if(iteration >= originalText.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30);
    };
}

document.querySelectorAll('.section-title').forEach(applyHackerEffect);

// ===== REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');
function revealOnScroll() {
    const containerHeight = window.innerHeight;
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < containerHeight - 100) {
            element.classList.add('active');
        }
    });
}
scrollContainer.addEventListener('scroll', revealOnScroll);

// ===== HERO TYPING =====
const heroText = "Architecting AI-driven platforms with secure backend foundations.";
const heroElement = document.getElementById("hero-text");
let heroIndex = 0;

function typeHero() {
    if (heroIndex < heroText.length) {
        heroElement.innerHTML += heroText.charAt(heroIndex);
        heroIndex++;
        setTimeout(typeHero, 30);
    }
}
typeHero();

// ===== SEQUENTIAL TYPING =====
const aboutContent = `I architect intelligent, production-grade AI systems that integrate large language models, real-time evaluation engines, structured backend workflows, and behavioral analytics. My work focuses on building scalable platforms that are resilient under load, secure by design.`;
const philosophyContent = `Great systems are built with clarity, modularity, and defensive thinking. Clean design is not aesthetic preference — it is engineering discipline.`;

function typeText(content, element, cursor, speed, callback) {
    let index = 0;
    cursor.style.display = "inline-block";
    function typing() {
        if (index < content.length) {
            element.innerHTML += content.charAt(index);
            index++;
            setTimeout(typing, speed);
        } else {
            cursor.style.display = "none";
            if (callback) callback();
        }
    }
    typing();
}

function startSequentialTyping() {
    let hasStarted = false;
    const section = document.getElementById("about-philosophy");
    scrollContainer.addEventListener("scroll", () => {
        const rect = section.getBoundingClientRect();
        if (!hasStarted && rect.top <= window.innerHeight * 0.5) {
            hasStarted = true;
            typeText(aboutContent, document.getElementById("about-text"), document.getElementById("about-cursor"), 15, () => {
                typeText(philosophyContent, document.getElementById("philosophy-text"), document.getElementById("philosophy-cursor"), 15);
            });
        }
    });
}
startSequentialTyping();

// ===== ONE-BY-ONE REVEAL =====
const fadeItems = document.querySelectorAll('.fade-item');
scrollContainer.addEventListener('scroll', () => {
    fadeItems.forEach((item) => {
        if (item.getBoundingClientRect().top < window.innerHeight * 0.85) {
            item.classList.add('active');
        }
    });
});

// ===== PROJECT DATA & MODAL LOGIC =====
const projectDetails = {
    'PrepAura AI': {
        title: "PrepAura AI – Intelligent Interview Architect",
        description: "A comprehensive AI-driven placement preparation platform. It utilizes Gemini 2.5 Flash for dynamic question generation and real-time behavioral analysis.",
        features: [
            "Integrated STAR Method specialist for content structure feedback.",
            "Real-time audio transcription via AssemblyAI and facial expression tracking.",
            "Multi-round logic including Aptitude (JSON-validated), Technical (Judge0 integration), and Managerial rounds."
        ],
        tech: "Python, FastAPI, Gemini API, AssemblyAI, Judge0, PostgreSQL",
        link: "https://prepmateai-project.vercel.app/"
    },
    'GuardPay': {
        title: "GuardPay – Adaptive Fraud Detection Engine",
        description: "A real-time transaction monitoring system that uses 3-Sigma anomaly detection and behavioral fingerprinting to identify fraudulent activity.",
        features: [
            "Implements a 'Ghost Card' system with self-destructing card identifiers for secure merchant payments.",
            "Layered Risk Scoring Engine based on account age, velocity spikes, and scam blacklists.",
            "Escrow-based payment release system with 'Aura Score' reputation rewards."
        ],
        tech: "Python, FastAPI, SQLAlchemy, SQLite, CryptContext (Bcrypt)",
        link: "https://github.com/vishalgouda486/GuardPay"
    }
};

const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-modal");

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectName = card.querySelector('h3').innerText;
        const data = projectDetails[projectName];

        if (data) {
            modalBody.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                <h4>Core Engineering Features:</h4>
                <ul>
                    ${data.features.map(f => `<li style="color:#b0b0b0; margin-bottom:8px;">${f}</li>`).join('')}
                </ul>
                <h4>Tech Stack:</h4>
                <p class="modal-tech-list">${data.tech}</p>

                <div class="modal-footer">
                    <a href="${data.link}" target="_blank" class="btn-test">Test Live Project 🚀</a>
                </div>
            `;
            modal.style.display = "block";
            scrollContainer.style.overflowY = "hidden"; // Lock background scroll
        }
    });
});

closeBtn.onclick = () => {
    modal.style.display = "none";
    scrollContainer.style.overflowY = "scroll";
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
        scrollContainer.style.overflowY = "scroll";
    }
};