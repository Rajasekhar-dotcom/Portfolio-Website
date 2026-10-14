const roles = [
    "Full-Stack Developer",
    "GenAI Developer",
    "AI Enthusiast",
    "Problem Solver"
];

const typingText = document.getElementById("typing-text");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, charIndex++);

        if (charIndex > currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typingText.textContent =
            currentRole.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            roleIndex = (roleIndex + 1) % roles.length;

            charIndex = 0;

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();


const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the menu after clicking a navigation link
navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

document.getElementById("current-year").textContent =
    new Date().getFullYear();


const revealElements = document.querySelectorAll(
    ".hero-section, .skills-section, .skill-item, " +
    ".experience-section, .experience-card, " +
    ".projects-section, .project-card, " +
    ".contact-section, .contact-info, .contact-form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            el.classList.add("visible");
            observer.unobserve(el);

            const cleanup = (e) => {
                // ignore transitions bubbling up from children (img, span, etc.)
                if (e.target !== el || e.propertyName !== "transform") return;
                el.classList.remove("reveal", "visible");
                el.removeEventListener("transitionend", cleanup);
            };
            el.addEventListener("transitionend", cleanup);
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


const contactForm = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const originalText = sendBtn.textContent;

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.style.color = "";

    try {
        const response = await fetch(
            "https://formspree.io/f/xppqybal",
            {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Message submission failed.");
        }

        formStatus.textContent =
            "Message sent successfully! I'll get back to you soon.";
        formStatus.style.color = "green";

        contactForm.reset();

    } catch (error) {
        formStatus.textContent =
            "Unable to send your message. Please try again.";
        formStatus.style.color = "red";

    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = originalText;
    }
});
