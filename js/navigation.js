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
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}