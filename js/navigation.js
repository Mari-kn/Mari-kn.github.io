/**
 * Navigation Controller
 * 
 * Handles smooth scrolling navigation, mobile menu functionality,
 * and active section highlighting.
 * 
 * Features:
 * - Smooth scrolling with header offset
 * - Active section highlighting based on scroll position
 * - Accessible mobile hamburger menu
 * - Keyboard navigation support
 * 
 * @author Maria Kiani
 */

class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.isScrolling = false;
        this.starsContainer = null;
        
        this.init();
    }

    /**
     * Initialize navigation functionality
     */
    init() {
        this.setupSmoothScrolling();
        this.setupActiveNavHighlighting();
        this.setupMobileMenu();
        this.setupKeyboardNavigation();
        this.setupShootingStarEffect();
    }

    /**
     * Setup smooth scrolling for navigation links
     */
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.closeMobileMenu();
                this.announceNavigation(targetId);
            });
        });
    }

    /**
     * Scroll to specific section with offset for fixed header
     */
    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;

        const headerOffset = 80; // Account for fixed header
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Smooth scroll with fallback for older browsers
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            // Fallback smooth scroll for older browsers
            this.smoothScrollTo(offsetPosition, 800);
        }
    }

    /**
     * Fallback smooth scroll implementation
     */
    smoothScrollTo(target, duration) {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    /**
     * Easing function for smooth scrolling
     */
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    /**
     * Setup active navigation highlighting based on scroll position
     */
    setupActiveNavHighlighting() {
        let ticking = false;

        const updateActiveNav = () => {
            if (this.isScrolling) return;

            const scrollPosition = window.scrollY + 100; // Offset for better detection
            let current = '';

            // Find current section
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            // Update active states and ARIA
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
                const href = link.getAttribute('href').substring(1);
                
                if (href === current) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            });

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveNav);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Setup mobile menu functionality with improved event handling
     */
    setupMobileMenu() {
        if (!this.mobileMenuBtn || !this.mobileMenu) return;

        // Improved click handler with debouncing
        let clickTimeout = null;
        this.mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Clear any pending timeout
            if (clickTimeout) {
                clearTimeout(clickTimeout);
            }
            
            // Debounce multiple rapid clicks
            clickTimeout = setTimeout(() => {
                this.toggleMobileMenu();
                clickTimeout = null;
            }, 100);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && !this.mobileMenu.classList.contains('hidden')) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.mobileMenu.classList.contains('hidden')) {
                this.closeMobileMenu();
                this.mobileMenuBtn.focus();
            }
        });

        // Handle mobile menu links
        const mobileNavLinks = this.mobileMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    /**
     * Toggle mobile menu visibility with state management
     */
    toggleMobileMenu() {
        const isHidden = this.mobileMenu.classList.contains('hidden');
        const isVisible = this.mobileMenu.getAttribute('aria-hidden') === 'false';
        
        // Use both class and aria-hidden for reliable state detection
        if (isHidden || !isVisible) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    openMobileMenu() {
        this.mobileMenu.classList.remove('hidden');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
        this.mobileMenu.setAttribute('aria-hidden', 'false');
        
        // Focus management for accessibility
        const firstLink = this.mobileMenu.querySelector('.nav-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
        
        // Update button icon
        const icon = this.mobileMenuBtn.querySelector('svg');
        if (icon) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        }
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.mobileMenu.classList.add('hidden');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        this.mobileMenu.setAttribute('aria-hidden', 'true');
        
        // Update button icon
        const icon = this.mobileMenuBtn.querySelector('svg');
        if (icon) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        // Handle arrow key navigation in mobile menu
        this.mobileMenu.addEventListener('keydown', (e) => {
            const focusableElements = this.mobileMenu.querySelectorAll('.nav-link');
            const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % focusableElements.length;
                    focusableElements[nextIndex].focus();
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
                    focusableElements[prevIndex].focus();
                    break;

                case 'Home':
                    e.preventDefault();
                    focusableElements[0].focus();
                    break;

                case 'End':
                    e.preventDefault();
                    focusableElements[focusableElements.length - 1].focus();
                    break;
            }
        });

        // Handle tab key navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && !this.mobileMenu.classList.contains('hidden')) {
                const focusableElements = this.mobileMenu.querySelectorAll('.nav-link');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    /**
     * Announce navigation changes to screen readers
     */
    announceNavigation(sectionId) {
        const announcements = document.getElementById('announcements');
        if (!announcements) return;

        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            const heading = sectionElement.querySelector('h1, h2, h3');
            if (heading) {
                setTimeout(() => {
                    announcements.textContent = `Navigated to ${heading.textContent} section`;
                }, 500);
            }
        }
    }

    /**
     * Update navigation for language changes
     */
    updateLanguage() {
        // Language updates are handled by the language manager
        // This method can be extended if needed
    }

    /**
     * Get current active section
     */
    getCurrentSection() {
        const scrollPosition = window.scrollY + 100;
        let current = 'home';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        return current;
    }

    /**
     * Scroll to top of page
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Setup shooting star effect on nav item hover
     */
    setupShootingStarEffect() {
        // Create container for shooting stars
        this.starsContainer = document.createElement('div');
        this.starsContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(this.starsContainer);

        // Add event listeners only to desktop navigation
        const desktopNav = document.querySelector('.nav-menu');
        if (desktopNav) {
            const navLinks = desktopNav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    this.createShootingStar();
                });
            });
        }
    }

    /**
     * Create a single shooting star
     */
    createShootingStar() {
        // Create star element
        const star = document.createElement('div');
        
        // Variable size (mostly small, sometimes bigger)
        const sizeVariant = Math.random();
        let size, glowIntensity;
        
        if (sizeVariant < 0.7) {
            // 70% small stars
            size = 2 + Math.random() * 2; // 2-4px
            glowIntensity = 10 + Math.random() * 10; // 10-20px glow
        } else if (sizeVariant < 0.9) {
            // 20% medium stars
            size = 4 + Math.random() * 3; // 4-7px
            glowIntensity = 15 + Math.random() * 15; // 15-30px glow
        } else {
            // 10% large stars
            size = 6 + Math.random() * 4; // 6-10px
            glowIntensity = 25 + Math.random() * 20; // 25-45px glow
        }
        
        // Variable angles - different starting positions and trajectories
        const angleVariant = Math.random();
        let startX, startY, endX, endY;
        
        if (angleVariant < 0.4) {
            // 40% - Classic top to bottom (slight diagonal)
            startX = Math.random() * window.innerWidth;
            startY = -20;
            endX = startX + (Math.random() - 0.5) * 200;
            endY = window.innerHeight + 20;
        } else if (angleVariant < 0.7) {
            // 30% - Steeper diagonal from top-left to bottom-right
            startX = -50 + Math.random() * (window.innerWidth * 0.3);
            startY = -20;
            endX = startX + 150 + Math.random() * 200;
            endY = window.innerHeight + 20;
        } else {
            // 30% - Steeper diagonal from top-right to bottom-left
            startX = window.innerWidth * 0.7 + Math.random() * (window.innerWidth * 0.3);
            startY = -20;
            endX = startX - 150 - Math.random() * 200;
            endY = window.innerHeight + 20;
        }
        
        // Variable glow effects
        const glowVariant = Math.random();
        let glowColor1, glowColor2;
        
        if (glowVariant < 0.8) {
            // 80% standard cyan glow
            glowColor1 = '#64ffda';
            glowColor2 = '#64ffda';
        } else {
            // 20% slightly different glow variations
            const variations = [
                { color1: '#64ffda', color2: '#00bcd4' }, // cyan to blue
                { color1: '#64ffda', color2: '#40e0d0' }, // cyan to turquoise
                { color1: '#5dfdcb', color2: '#64ffda' }  // slightly green cyan
            ];
            const chosen = variations[Math.floor(Math.random() * variations.length)];
            glowColor1 = chosen.color1;
            glowColor2 = chosen.color2;
        }
        
        // Set initial position and style with variations
        star.style.cssText = `
            position: absolute;
            left: ${startX}px;
            top: ${startY}px;
            width: ${size}px;
            height: ${size}px;
            background: ${glowColor1};
            border-radius: 50%;
            box-shadow: 0 0 ${glowIntensity}px ${glowColor1}, 0 0 ${glowIntensity * 2}px ${glowColor2}, 0 0 ${glowIntensity * 3}px rgba(100, 255, 218, 0.3);
            opacity: 1;
            transition: all 2s linear;
        `;
        
        // Add to container
        this.starsContainer.appendChild(star);
        
        // Animate to end position
        setTimeout(() => {
            star.style.left = `${endX}px`;
            star.style.top = `${endY}px`;
            star.style.opacity = '0';
            star.style.boxShadow = `0 0 ${glowIntensity * 0.3}px ${glowColor2}`;
        }, 50);
        
        // Remove after animation
        setTimeout(() => {
            if (star.parentNode) {
                star.remove();
            }
        }, 2100);
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}