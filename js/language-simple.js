/**
 * language-simple.js - The i18n wizard 🧙‍♂️
 * 
 * Handles switching between languages without breaking anything.
 * Called "simple" because the previous version was a monster that
 * tried to do too much and failed spectacularly.
 * 
 * Works with pre-loaded content from init.js because life's too short
 * to debug CORS issues at 2am.
 * 
 * Features:
 * - Actually works (revolutionary!)
 * - Remembers your language choice
 * - Updates buttons so you know what's selected
 * - Plays nice with screen readers
 */

class LanguageManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'en';
        this.content = window.content || {};
        this.initialized = false;
        console.log('LanguageManager created');
        this.init();
    }

    init() {
        if (!window.content) {
            console.error('Content not found! Make sure init.js loads first.');
            return;
        }
        
        this.content = window.content;
        this.setupLanguageButtons();
        this.setLanguage(this.currentLanguage);
        this.updateLanguageDisplay();
        this.initialized = true;
        console.log('LanguageManager initialized successfully');
    }

    getStoredLanguage() {
        return localStorage.getItem('preferred-language');
    }

    storeLanguage(lang) {
        localStorage.setItem('preferred-language', lang);
    }

    setupLanguageButtons() {
        const languageButtons = document.querySelectorAll('.lang-btn');
        console.log(`Found ${languageButtons.length} language buttons`);
        
        languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const targetLang = button.getAttribute('data-lang');
                console.log(`Language button clicked: ${targetLang}`);
                if (targetLang) {
                    this.switchLanguage(targetLang);
                }
            });
        });
    }

    switchLanguage(language) {
        console.log(`Switching to language: ${language}`);
        
        if (this.content[language]) {
            this.currentLanguage = language;
            this.storeLanguage(language);
            this.setLanguage(language);
            this.updateLanguageDisplay();
            this.announceLanguageChange(language);
            
            // Reload dynamic content
            if (window.contentLoader) {
                window.contentLoader.currentLanguage = language;
                window.contentLoader.loadAllContent();
            }
        } else {
            console.error(`Language ${language} not found in content`);
        }
    }

    setLanguage(language) {
        console.log(`Setting language to: ${language}`);
        
        // Update document language
        document.documentElement.lang = language;
        
        // Update all elements with data-i18n attributes
        const translatableElements = document.querySelectorAll('[data-i18n]');
        console.log(`Found ${translatableElements.length} translatable elements`);
        
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedValue(this.content[language], key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    // Handle whitespace formatting for multi-line content
                    if (key.includes('about.content') || key.includes('hero.summary')) {
                        element.innerHTML = translation.replace(/\n/g, '<br><br>');
                    } else {
                        element.textContent = translation;
                    }
                }
            } else {
                console.warn(`Translation not found for key: ${key}`);
            }
        });
    }

    updateLanguageDisplay() {
        const languageButtons = document.querySelectorAll('.lang-btn');
        
        languageButtons.forEach(button => {
            const buttonLang = button.getAttribute('data-lang');
            
            // Remove all classes first
            button.classList.remove('border-white/30', 'text-white/70', 'border-accent', 'text-accent', 'active');
            
            if (buttonLang === this.currentLanguage) {
                // Active language
                button.classList.add('border-accent', 'text-accent', 'active');
                button.setAttribute('aria-pressed', 'true');
            } else {
                // Inactive language
                button.classList.add('border-white/30', 'text-white/70');
                button.setAttribute('aria-pressed', 'false');
            }
        });
        
        // Update document language attribute
        document.documentElement.lang = this.currentLanguage;
        document.documentElement.dir = 'ltr'; // Both EN and DE are LTR
        
        console.log(`Language display updated for: ${this.currentLanguage}`);
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    announceLanguageChange(language) {
        const announcements = document.getElementById('announcements');
        if (announcements) {
            const languageNames = {
                en: 'English',
                de: 'Deutsch'
            };
            announcements.textContent = `Language changed to ${languageNames[language]}`;
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getCurrentContent() {
        return this.content[this.currentLanguage] || this.content.en;
    }
}

// Initialize language manager
console.log('Language-simple.js loaded');

function initLanguageManager() {
    if (!window.languageManager) {
        console.log('Creating LanguageManager instance...');
        window.languageManager = new LanguageManager();
    }
}

// Start initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageManager);
} else {
    initLanguageManager();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}