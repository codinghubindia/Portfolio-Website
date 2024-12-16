// GSAP Animations

// Hero Section Typing Effect
const textElement = document.querySelector(".hero-content h1");
const text = "Hi, I am Manjunatha N";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 150);
    } else {
        textElement.style.borderRight = "2px solid #fff"; // Cursor effect
    }
}

if (textElement) {
    typeEffect();
}

// Enhanced Hero Section Animation
const heroTl = gsap.timeline();
heroTl
    .from(".hero-image", {
        duration: 1.5,
        opacity: 0,
        scale: 0.8,
        ease: "power4.out",
    })
    .from(".hero-content p", {
        duration: 1.2,
        opacity: 0,
        y: 30,
        ease: "power4.out",
    }, "-=1")
    .from(".cta-button", {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: "power4.out",
    }, "-=0.8");

// Projects Section Hover Effect
const projectLinks = document.querySelectorAll(".project a");
projectLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        gsap.to(link, {
            duration: 0.3,
            color: "#ffcc00",
            scale: 1.1,
        });
    });

    link.addEventListener("mouseleave", () => {
        gsap.to(link, {
            duration: 0.3,
            color: "#007acc",
            scale: 1,
        });
    });
});

// Contact Form Animation
const formTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 90%",
    },
});
formTl.from(".contact-form input, .contact-form textarea, .contact-form button", {
    duration: 0.5,
    opacity: 0,
    y: 20,
    stagger: 0.2,
    ease: "power2.out",
});
