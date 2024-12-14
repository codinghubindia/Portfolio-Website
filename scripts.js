// GSAP Animations

// Text Animation: "I am Manjunatha" Letter by Letter
const textElement = document.querySelector(".hero-content h1");
const text = "Hi, I am Manjunatha N";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 150);
    } else {
        setTimeout(() => {
            textElement.textContent = "";
            index = 0;
            typeEffect();
        }, 2000); // Pause before looping
    }
}

typeEffect();

// Enhanced Hero Section Animation with Better Design and Progress Bar
const heroTl = gsap.timeline();
heroTl
    .from(".hero-content h1", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: "power4.out",
    })
    .from(".hero-content p", {
        duration: 1.2,
        opacity: 0,
        y: 30,
        ease: "power4.out",
    }, "-=1")
    .from(".hero-content .cta-button", {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: "power4.out",
    }, "-=0.8")
    .to(".progress-bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.out",
    }, "-=1");

// Navbar Links Hover Animation
const navLinks = document.querySelectorAll(".nav-links li a");
navLinks.forEach((link) => {
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
            color: "#fff",
            scale: 1,
        });
    });
});

// Sections Scroll Animations
const sections = document.querySelectorAll("section");

sections.forEach((section, index) => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
        },
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: index * 0.2,
    });

    // Add unified background for all sections to maintain a professional theme
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none",
        },
        backgroundColor: "#f8f9fa", // Light gray for consistency across sections
        duration: 1,
        ease: "power2.out",
    });
});

// Skills Section Animation
const skillsTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".skills-section",
        start: "top 80%",
        toggleActions: "play none none none",
    },
});

skillsTl.from(".skill", {
    duration: 0.6,
    scale: 0.8,
    opacity: 0,
    stagger: 0.15,
    ease: "back.out(1.7)",
});

// Project Cards Float-In Effect
gsap.from(".project", {
    scrollTrigger: {
        trigger: ".projects-section",
        start: "top 85%",
    },
    duration: 1,
    x: 100,
    opacity: 0,
    stagger: 0.3,
    ease: "power2.out",
});

// Footer Fade-In Animation
gsap.from("footer", {
    scrollTrigger: {
        trigger: "footer",
        start: "top 90%",
    },
    duration: 1.2,
    y: 30,
    opacity: 0,
    ease: "power2.out",
});
