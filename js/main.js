/**
 * Application Controller
 * 
 * Main application orchestrator for Maria Kiani's portfolio website.
 * 
 * Responsibilities:
 * - Module initialization and coordination
 * - Scroll animations and intersection observers
 * - Error handling and graceful degradation
 * - Accessibility features and ARIA support
 * - Performance optimizations
 * 
 * @author Maria Kiani
 */

class App {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            // Set up error handling first
            this.setupErrorHandling();
            
            // Initialize modules in order
            await this.initializeModules();
            
            // Setup intersection observers for animations
            this.setupAnimationObservers();
            
            // Setup accessibility features
            this.setupAccessibility();
            
            // Setup performance optimizations
            this.setupPerformanceOptimizations();
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Announce successful initialization
            this.announceInitialization();
            
        } catch (error) {
            console.error('Application initialization failed:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Initialize all application modules
     */
    async initializeModules() {
        // Wait for content data to be available
        await this.waitForContent();
        
        // Initialize modules that depend on DOM being ready
        this.initializeDOM();
    }

    /**
     * Wait for content data to be loaded
     */
    waitForContent() {
        return new Promise((resolve) => {
            if (window.content) {
                resolve();
                return;
            }
            
            const checkContent = setInterval(() => {
                if (window.content) {
                    clearInterval(checkContent);
                    resolve();
                }
            }, 50);
            
            // Timeout after 5 seconds
            setTimeout(() => {
                clearInterval(checkContent);
                resolve();
            }, 5000);
        });
    }

    /**
     * Initialize DOM-dependent modules
     */
    initializeDOM() {
        // All modules are already initialized via their individual script files
        // This method can be extended for additional coordination
        
        // Verify all expected modules are available
        const expectedModules = ['starField', 'navigation', 'languageManager', 'contentLoader'];
        
        expectedModules.forEach(moduleName => {
            if (window[moduleName]) {
            } else {
            }
        });
    }

    /**
     * Setup error handling for the entire application
     */
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleError('JavaScript Error', event.error, event);
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError('Unhandled Promise Rejection', event.reason, event);
            event.preventDefault();
        });

        // Resource loading error handler
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleResourceError(event);
            }
        }, true);
    }

    /**
     * Handle various types of errors
     */
    handleError(type, error, event) {
        console.error(`${type}:`, error);
        
        // Log to analytics if available
        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: `${type}: ${error.message || error}`,
                fatal: false
            });
        }
        
        // Show user-friendly error message for critical errors
        if (this.isCriticalError(error)) {
            this.showErrorMessage();
        }
    }

    /**
     * Handle resource loading errors
     */
    handleResourceError(event) {
        const resource = event.target;
        console.warn(`Failed to load resource: ${resource.src || resource.href}`);
        
        // Handle specific resource types
        if (resource.tagName === 'IMG') {
            this.handleImageError(resource);
        } else if (resource.tagName === 'SCRIPT') {
            this.handleScriptError(resource);
        }
    }

    /**
     * Handle image loading errors
     */
    handleImageError(img) {
        // Already handled by the onerror attribute in HTML
        // This is a backup handler
        if (!img.src.includes('data:image/svg+xml')) {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjNkI3Mjg4Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNjAiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTEwMCAzMDBDMTAwIDI1NS44IDE1NS44IDIwMCAyMDAgMjAwUzMwMCAyNTUuOCAzMDAgMzAwSDEwMFoiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+';
        }
    }

    /**
     * Handle script loading errors
     */
    handleScriptError(script) {
        console.warn(`Script failed to load: ${script.src}`);
        // Implement fallback behavior if needed
    }

    /**
     * Determine if an error is critical
     */
    isCriticalError(error) {
        const criticalPatterns = [
            /Cannot read property/,
            /is not a function/,
            /undefined is not an object/
        ];
        
        const errorMessage = error.message || error.toString();
        return criticalPatterns.some(pattern => pattern.test(errorMessage));
    }

    /**
     * Show user-friendly error message
     */
    showErrorMessage() {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50';
        errorDiv.innerHTML = `
            <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <span>Something went wrong, but the site should still work.</span>
                <button class="ml-2 text-white hover:text-gray-300" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }

    /**
     * Setup intersection observers for scroll animations
     */
    setupAnimationObservers() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Detect iOS Safari
        const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        // Simpler observer for iOS Safari, complex one for other browsers
        if (isIOSSafari) {
            // Simple visibility observer for iOS Safari
            const sectionFadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Ensure section is visible
                        entry.target.style.opacity = '1';
                        entry.target.classList.add('section-visible');
                        entry.target.classList.remove('section-hidden');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px'
            });
            
            // Set initial state for all sections on iOS
            document.querySelectorAll('section').forEach(section => {
                section.style.opacity = '1'; // Start visible on iOS
                sectionFadeObserver.observe(section);
            });
        } else {
            // Original complex observer for desktop/other browsers
            const sectionFadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const section = entry.target;
                    const intersectionRatio = entry.intersectionRatio;
                    
                    // Calculate opacity based on intersection ratio
                    let opacity = 1;
                    
                    if (intersectionRatio < 0.05) {
                        opacity = 0;
                    } else if (intersectionRatio < 0.15) {
                        opacity = (intersectionRatio - 0.05) / 0.1;
                    } else {
                        opacity = 1;
                    }
                    
                    // Apply smooth transition
                    section.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    section.style.opacity = opacity;
                    
                    // Add/remove animation classes
                    if (entry.isIntersecting && intersectionRatio > 0.1) {
                        section.classList.add('section-visible');
                        section.classList.remove('section-hidden');
                    } else if (intersectionRatio < 0.05) {
                        section.classList.add('section-hidden');
                        section.classList.remove('section-visible');
                    }
                });
            }, {
                threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
                rootMargin: '50px 0px -50px 0px'
            });
            
            // Observe all major sections for fade effect
            document.querySelectorAll('section').forEach(section => {
                sectionFadeObserver.observe(section);
            });
        }


        // Intersection observer for section titles
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe section titles
        document.querySelectorAll('.section-title').forEach(title => {
            titleObserver.observe(title);
        });

        // Intersection observer for timeline items and content blocks
        const contentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    // Remove animation when out of view for re-triggering
                    entry.target.classList.remove('animate-in');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe experience cards (handled by content-loader.js initializeExperienceAnimations)
        
        // Observe other content blocks (skills, projects, education, etc.)
        document.querySelectorAll('.skill-category, .project-card, .education-item, .cert-item').forEach(item => {
            contentObserver.observe(item);
        });

    }

    /**
     * Setup additional accessibility features
     */
    setupAccessibility() {
        // Focus management
        this.setupFocusManagement();
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // ARIA live region updates
        this.setupLiveRegionUpdates();
    }

    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Track focus for better keyboard navigation
        let focusRing = true;
        
        document.addEventListener('mousedown', () => {
            focusRing = false;
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                focusRing = true;
            }
        });
        
        document.addEventListener('focusin', (e) => {
            if (focusRing) {
                e.target.classList.add('focus-visible');
            }
        });
        
        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('focus-visible');
        });
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch (e.key) {
                case '1':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.navigateToSection('home');
                    }
                    break;
                case '2':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.navigateToSection('about');
                    }
                    break;
                case '3':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.navigateToSection('experience');
                    }
                    break;
                case '4':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.navigateToSection('projects');
                    }
                    break;
                case '5':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.navigateToSection('contact');
                    }
                    break;
            }
        });
    }

    /**
     * Navigate to specific section
     */
    navigateToSection(sectionId) {
        if (window.navigation) {
            window.navigation.scrollToSection(sectionId);
        }
    }

    /**
     * Setup live region updates
     */
    setupLiveRegionUpdates() {
        // Announce page changes
        const announcements = document.getElementById('announcements');
        if (!announcements) return;
        
        // Announce when sections come into view
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionTitle = entry.target.querySelector('h1, h2');
                    if (sectionTitle) {
                        announcements.textContent = `Now viewing ${sectionTitle.textContent} section`;
                    }
                }
            });
        }, {
            threshold: 0.5
        });
        
        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    /**
     * Setup performance optimizations
     */
    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Optimize scroll performance
        this.optimizeScrolling();
        
        // Setup resource prefetching
        this.setupPrefetching();
    }

    /**
     * Setup lazy loading for images
     */
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Optimize scrolling performance
     */
    optimizeScrolling() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-dependent operations are handled by specific modules
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Setup resource prefetching
     */
    setupPrefetching() {
        // Prefetch critical resources on interaction
        const prefetchOnHover = (selector, href) => {
            document.addEventListener('mouseover', (e) => {
                if (e.target.matches(selector)) {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = href;
                    document.head.appendChild(link);
                }
            }, { once: true });
        };
        
        // Example: prefetch GitHub profile on project hover
        prefetchOnHover('.project-card', 'https://github.com/Mari-kn');
    }

    /**
     * Handle initialization errors
     */
    handleInitializationError(error) {
        console.error('Failed to initialize application:', error);
        
        // Try to enable basic functionality
        this.enableBasicFunctionality();
    }

    /**
     * Enable basic functionality as fallback
     */
    enableBasicFunctionality() {
        // Basic navigation without smooth scrolling
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView();
                }
            });
        });
        
        // Basic mobile menu functionality
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileBtn && mobileMenu) {
            mobileBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    /**
     * Announce successful initialization
     */
    announceInitialization() {
        
        // Dispatch custom event for other scripts
        window.dispatchEvent(new CustomEvent('appInitialized', {
            detail: { app: this }
        }));
    }

    /**
     * Get application status
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            modules: Object.keys(this.modules),
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}