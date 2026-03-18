document.addEventListener("DOMContentLoaded", () => {

    // --- 1. THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        themeToggle.innerHTML = theme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // --- 2. DYNAMIC NAVBAR & SCROLL PROGRESS ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Progress Bar
        const scrolled = (winScroll / height) * 100;
        document.getElementById("scroll-progress").style.width = scrolled + "%";

        // Navbar Shadow & Shrink on Scroll
        if (winScroll > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
            navbar.style.padding = "0.5rem 5%"; 
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.padding = "1rem 5%";
        }
    });

    // --- 3. PROFESSIONAL AMBIENT BACKGROUND ---
    function createAmbientShapes() {
        for (let i = 0; i < 3; i++) {
            const shape = document.createElement("div");
            shape.classList.add("ambient-shape");
            
            const size = Math.random() * 300 + 300;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            
            shape.style.top = `${Math.random() * 100}vh`;
            shape.style.left = `${Math.random() * 100}vw`;
            shape.style.animationDelay = `${Math.random() * 5}s`;
            
            document.body.appendChild(shape);
        }
    }
    createAmbientShapes();

    // --- 4. ADVANCED GSAP CHOREOGRAPHY ---
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // A. Initial Page Load Sequence
        const tlLoad = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        tlLoad.fromTo(".nav-logo, .nav-links a, .toggle-btn", 
            { opacity: 0, y: -15 }, 
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }
        )
        .fromTo(".hero-text > *", 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 1, stagger: 0.15 }, 
            "-=0.4" 
        )
        .fromTo(".hero-image-backdrop", 
            { opacity: 0, x: -20 }, 
            { opacity: 1, x: 0, duration: 1 }, 
            "-=0.6"
        )
        .fromTo(".hero-image", 
            { opacity: 0, scale: 1.05, x: 20 }, 
            { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power2.out" }, 
            "-=0.8"
        );

        // B. Hero Image Zoom-Out & Parallax (Scrubbed)
        // As you scroll down, the image pushes up and scales down slightly, creating depth
        gsap.to(".hero-image-wrapper", {
            yPercent: 15,
            scale: 0.95,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true // Ties animation directly to the scrollbar
            }
        });

        // C. The "Cinematic Reveal" / Zoom-Out Effect (Philosophy Quote)
        // This replaces the ASUS laptop mask with a high-end corporate zoom-out
        gsap.fromTo(".quote-block",
            { 
                scale: 0.85, 
                opacity: 0.3,
                filter: "blur(10px)" // Starts slightly blurred and small
            },
            {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".philosophy-grid",
                    start: "top 90%",
                    end: "center 60%",
                    scrub: 1 // 1 second smoothing on the scroll scrub
                }
            }
        );

        // D. Magnetic Button Effect (High-end agency detail)
        const magnetBtn = document.querySelector('.btn-primary');
        if(magnetBtn) {
            magnetBtn.addEventListener('mousemove', (e) => {
                const rect = magnetBtn.getBoundingClientRect();
                // Calculate cursor position relative to button center
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Move button slightly towards cursor
                gsap.to(magnetBtn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
            });

            magnetBtn.addEventListener('mouseleave', () => {
                // Snap back to center with an elastic bounce
                gsap.to(magnetBtn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
            });
        }

        // E. Staggered Grid Cards (Lĩnh Vực & Năng Lực)
        gsap.utils.toArray('.grid-3').forEach(grid => {
            gsap.fromTo(grid.querySelectorAll('.card'),
                { opacity: 0, y: 50 },
                {
                    opacity: 1, 
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // F. Directional Timeline Animations
        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            const isEven = index % 2 === 0;
            const xOffset = isEven ? -50 : 50; 
            
            gsap.fromTo(item,
                { opacity: 0, x: xOffset, y: 20 },
                {
                    opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // G. Standard Fade for remaining text elements
        // (Removed quote-block from here since it has the custom zoom effect now)
        gsap.utils.toArray('.section-header, .philosophy-grid h2, .philosophy-grid p').forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    } else {
        console.warn("GSAP is not loaded. Animations will not play.");
    }
});