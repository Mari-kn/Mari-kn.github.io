/**
 * Content Loader - Dynamic portfolio content management
 * 
 * Handles dynamic loading and rendering of portfolio content including:
 * - Professional experience and career timeline
 * - Technical skills and competencies  
 * - Educational background and certifications
 * - Featured projects and achievements
 * 
 * Supports multilingual content with smooth animations.
 * @author Maria Kiani
 */

class ContentLoader {
    constructor() {
        this.content = {};
        this.currentLanguage = 'en';
        this.initialized = false;
        this.init();
    }

    init() {
        if (window.languageManager && window.languageManager.initialized && window.content) {
            this.content = window.content;
            this.currentLanguage = window.languageManager.getCurrentLanguage();
            this.loadAllContent();
            this.initialized = true;
        } else {
            // Retry in 100ms
            setTimeout(() => this.init(), 100);
        }
    }

    /**
     * Load all dynamic content
     */
    loadAllContent() {
        // Get current language from language manager or default to 'en'
        this.currentLanguage = window.languageManager ? window.languageManager.getCurrentLanguage() : 'en';
        
        // Update content reference
        if (window.content) {
            this.content = window.content;
        }
        
        if (!this.content[this.currentLanguage]) {
            this.currentLanguage = 'en';
        }
        
        if (!this.content[this.currentLanguage]) {
            return;
        }
        
        this.loadJobTimeline();
        this.loadSkills();
        this.loadEducation();
        this.loadCertifications();
        this.loadProjects();
        
        // Re-trigger animations after content reload
        this.retriggerAnimations();
        
        // Re-setup bidirectional fade observers for new content
        this.setupContentObservers();
    }

    /**
     * Load sophisticated experience showcase with cutting-edge CSS 2024 features
     */
    loadJobTimeline() {
        const container = document.getElementById('job-timeline');
        if (!container || !this.content[this.currentLanguage]) {
            console.warn('Experience container not found or content missing');
            return;
        }

        const jobs = this.content[this.currentLanguage].experience.jobs;
        container.innerHTML = '';

        // Experience data model with intelligent caching
        const ExperienceData = {
            cache: new Map(),
            
            // Extract years with memoization for performance
            getYearData: (period) => {
                if (ExperienceData.cache.has(period)) {
                    return ExperienceData.cache.get(period);
                }
                
                const isActive = period.toLowerCase().includes('present') || period.toLowerCase().includes('heute');
                const yearMatch = period.match(/\b(20\d{2})\b/g);
                const year = isActive ? 'NOW' : (yearMatch ? yearMatch[yearMatch.length - 1] : new Date().getFullYear().toString());
                
                const result = {
                    year,
                    isActive,
                    auroraClass: `aurora-${year === 'NOW' ? '2024' : year}`,
                    badgeIntensity: isActive ? 1.2 : 0.8
                };
                
                ExperienceData.cache.set(period, result);
                return result;
            }
        };

        // Create showcase container
        const showcaseContainer = document.createElement('div');
        showcaseContainer.className = 'experience-showcase';
        
        // Experience list container
        const experienceList = document.createElement('div');
        experienceList.className = 'experience-list';
        experienceList.setAttribute('aria-label', `Professional experience with ${jobs.length} positions`);

        jobs.forEach((job, index) => {
            const yearData = ExperienceData.getYearData(job.period);
            const isOdd = index % 2 === 0;
            
            const experienceItem = document.createElement('div');
            experienceItem.className = 'experience-item';
            experienceItem.setAttribute('data-experience-index', index);
            experienceItem.setAttribute('data-year', yearData.year);
            
            experienceItem.innerHTML = `
                <!-- Experience Card -->
                <article class="experience-card ${yearData.auroraClass} ${index % 2 === 0 ? 'has-aurora' : ''} group"
                         role="article"
                         tabindex="0"
                         aria-labelledby="title-${index}"
                         aria-describedby="desc-${index}">
                    
                    <header class="mb-6">
                        <h3 id="title-${index}" 
                            class="experience-title text-lg font-bold text-accent mb-3 uppercase tracking-wider leading-tight">
                            ${job.title}
                        </h3>
                        <h4 class="company-name text-2xl font-bold mb-3 leading-tight">
                            ${job.company}
                        </h4>
                        
                        <!-- Refined metadata -->
                        <div class="flex flex-wrap gap-6 text-sm text-gray-400 font-mono">
                            <span class="flex items-center gap-2" title="Location">
                                <svg class="w-4 h-4 text-accent/60" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                                </svg>
                                ${job.location}
                            </span>
                            <span class="flex items-center gap-2" title="Time Period">
                                <svg class="w-4 h-4 text-accent/60" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                </svg>
                                ${job.period}
                            </span>
                            <span class="flex items-center gap-2" title="Employment Type">
                                <svg class="w-4 h-4 text-accent/60" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                </svg>
                                ${job.type}
                            </span>
                        </div>
                    </header>
                    
                    <div id="desc-${index}" class="space-y-4">
                        <p class="text-gray-300 leading-relaxed text-base group-hover:text-gray-200 transition-colors duration-300">
                            ${job.description.replace(/\n/g, '<br>')}
                        </p>
                        
                        <footer class="flex items-center justify-between pt-4 border-t border-white/10">
                            ${job.link ? `
                                <a href="${job.link}" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   class="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/60 rounded-lg text-accent hover:text-white transition-all duration-300 group/link focus:outline-none focus:ring-2 focus:ring-accent/50"
                                   aria-label="Learn more about ${job.company}">
                                    <span class="font-medium">Learn more</span>
                                    <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                    </svg>
                                </a>
                            ` : '<div></div>'}
                            
                            <div class="text-xs text-gray-500 font-mono tracking-wider" aria-label="Position number">
                                #${String(jobs.length - index).padStart(2, '0')}
                            </div>
                        </footer>
                    </div>
                </article>
            `;
            
            experienceList.appendChild(experienceItem);
        });
        
        showcaseContainer.appendChild(experienceList);
        container.appendChild(showcaseContainer);
        
        // Initialize sophisticated animation system
        this.initializeExperienceAnimations();
        
    }

    /**
     * Initialize sophisticated staggered animation system
     */
    initializeExperienceAnimations() {
        if (!window.IntersectionObserver) {
            // Graceful degradation for older browsers
            this.activateAllExperienceItems();
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            this.activateAllExperienceItems();
            return;
        }

        // Sophisticated intersection observer with staggered sequences
        const experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateExperienceItem(entry.target);
                    experienceObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -80px 0px'
        });

        // Observe all experience items
        document.querySelectorAll('.experience-item').forEach(item => {
            experienceObserver.observe(item);
        });
        
    }

    /**
     * Animate individual experience item with simple entrance
     */
    animateExperienceItem(item) {
        const index = parseInt(item.dataset.experienceIndex);
        const animationDelay = index * 150; // 150ms stagger for smooth flow
        
        setTimeout(() => {
            item.classList.add('animate-in');
        }, animationDelay);
    }

    /**
     * Activate all items immediately (fallback for reduced motion/older browsers)
     */
    activateAllExperienceItems() {
        document.querySelectorAll('.experience-item').forEach(item => {
            item.classList.add('animate-in');
        });
    }

    /**
     * Get Wikipedia link for a skill
     */
    getWikipediaLink(skill) {
        const wikipediaMap = {
            'Python': 'https://en.wikipedia.org/wiki/Python_(programming_language)',
            'SQL': 'https://en.wikipedia.org/wiki/SQL',
            'C#': 'https://en.wikipedia.org/wiki/C_Sharp_(programming_language)',
            'Apache Airflow': 'https://en.wikipedia.org/wiki/Apache_Airflow',
            'dbt': 'https://en.wikipedia.org/wiki/Dbt_(data_build_tool)',
            'SSIS': 'https://en.wikipedia.org/wiki/SQL_Server_Integration_Services',
            'Power Query': 'https://en.wikipedia.org/wiki/Power_Query',
            'Power BI': 'https://en.wikipedia.org/wiki/Microsoft_Power_BI',
            'Tableau': 'https://en.wikipedia.org/wiki/Tableau_Software',
            'Matplotlib': 'https://en.wikipedia.org/wiki/Matplotlib',
            'Seaborn': 'https://en.wikipedia.org/wiki/Seaborn_(Python)',
            'Regression Analysis': 'https://en.wikipedia.org/wiki/Regression_analysis',
            'Regressionsanalyse': 'https://en.wikipedia.org/wiki/Regression_analysis',
            'Hypothesis Testing': 'https://en.wikipedia.org/wiki/Statistical_hypothesis_testing',
            'Hypothesentests': 'https://en.wikipedia.org/wiki/Statistical_hypothesis_testing',
            'Time Series Analysis': 'https://en.wikipedia.org/wiki/Time_series',
            'Zeitreihenanalyse': 'https://en.wikipedia.org/wiki/Time_series',
            'OpenAI': 'https://en.wikipedia.org/wiki/OpenAI',
            'Retrieval-Augmented Generation': 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation',
            'Multi-Agent Systems': 'https://en.wikipedia.org/wiki/Multi-agent_system',
            'Multi-Agent-Systeme': 'https://en.wikipedia.org/wiki/Multi-agent_system',
            'Google Cloud Platform': 'https://en.wikipedia.org/wiki/Google_Cloud_Platform',
            'BigQuery': 'https://en.wikipedia.org/wiki/BigQuery',
            'AWS': 'https://en.wikipedia.org/wiki/Amazon_Web_Services',
            'Git': 'https://en.wikipedia.org/wiki/Git',
            'GitHub': 'https://en.wikipedia.org/wiki/GitHub',
            'Excel': 'https://en.wikipedia.org/wiki/Microsoft_Excel',
            'Scikit-learn': 'https://en.wikipedia.org/wiki/Scikit-learn',
            'PySpark': 'https://en.wikipedia.org/wiki/Apache_Spark',
            'TensorFlow': 'https://en.wikipedia.org/wiki/TensorFlow',
            'PyTorch': 'https://en.wikipedia.org/wiki/PyTorch',
            'Deep Learning': 'https://en.wikipedia.org/wiki/Deep_learning',
            'Machine Learning': 'https://en.wikipedia.org/wiki/Machine_learning',
            'Time Series': 'https://en.wikipedia.org/wiki/Time_series',
            'Zeitreihen': 'https://en.wikipedia.org/wiki/Time_series',
            'Collaborative Filtering': 'https://en.wikipedia.org/wiki/Collaborative_filtering',
            'Kollaborative Filterung': 'https://en.wikipedia.org/wiki/Collaborative_filtering',
            'Data Science': 'https://en.wikipedia.org/wiki/Data_science',
            'Fraud Detection': 'https://en.wikipedia.org/wiki/Fraud_detection',
            'Betrugserkennung': 'https://en.wikipedia.org/wiki/Fraud_detection',
            'Blockchain': 'https://en.wikipedia.org/wiki/Blockchain',
            'NLP': 'https://en.wikipedia.org/wiki/Natural_language_processing',
            'Financial Analysis': 'https://en.wikipedia.org/wiki/Financial_analysis',
            'Finanzanalyse': 'https://en.wikipedia.org/wiki/Financial_analysis',
            'Cryptocurrency': 'https://en.wikipedia.org/wiki/Cryptocurrency',
            'Kryptowährung': 'https://en.wikipedia.org/wiki/Cryptocurrency',
            'Imbalanced Data': 'https://en.wikipedia.org/wiki/Imbalanced_data',
            'Unausgewogene Daten': 'https://en.wikipedia.org/wiki/Imbalanced_data',
            'Classification': 'https://en.wikipedia.org/wiki/Statistical_classification',
            'Klassifikation': 'https://en.wikipedia.org/wiki/Statistical_classification',
            'RAG': 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation',
            'Customer Service': 'https://en.wikipedia.org/wiki/Customer_service',
            'Kundenservice': 'https://en.wikipedia.org/wiki/Customer_service',
            'Pinecone': 'https://en.wikipedia.org/wiki/Vector_database',
            'Healthcare': 'https://en.wikipedia.org/wiki/Health_technology',
            'Gesundheitswesen': 'https://en.wikipedia.org/wiki/Health_technology',
            'Text-to-Speech': 'https://en.wikipedia.org/wiki/Speech_synthesis',
            'Text-zu-Sprache': 'https://en.wikipedia.org/wiki/Speech_synthesis',
            'Creative AI': 'https://en.wikipedia.org/wiki/Artificial_intelligence_art',
            'Kreative KI': 'https://en.wikipedia.org/wiki/Artificial_intelligence_art'
        };
        
        return wikipediaMap[skill] || null;
    }

    /**
     * Load skills section
     */
    loadSkills() {
        const container = document.getElementById('skills-container');
        if (!container || !this.content[this.currentLanguage]) {
            console.warn('Skills container not found or content missing');
            return;
        }

        const skills = this.content[this.currentLanguage].skills;
        container.innerHTML = '';

        Object.keys(skills.categories).forEach(categoryKey => {
            const categoryName = skills.categories[categoryKey];
            const categorySkills = skills.items[categoryKey] || [];

            const categoryElement = document.createElement('div');
            categoryElement.className = 'skill-category bg-white/5 rounded-2xl p-6 border border-white/10';
            
            categoryElement.innerHTML = `
                <h4 class="text-lg font-bold text-accent mb-4 font-heading">${categoryName}</h4>
                <div class="flex flex-wrap gap-2">
                    ${categorySkills.map(skill => {
                        const wikipediaLink = this.getWikipediaLink(skill);
                        if (wikipediaLink) {
                            return `<a href="${wikipediaLink}" target="_blank" rel="noopener noreferrer" class="skill-tag bg-gradient-to-r from-accent to-accent-blue text-black px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform font-mono hover:shadow-lg" aria-label="${skill} (opens Wikipedia in new tab)">${skill}</a>`;
                        } else {
                            return `<span class="skill-tag bg-gradient-to-r from-accent to-accent-blue text-black px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform font-mono">${skill}</span>`;
                        }
                    }).join('')}
                </div>
            `;
            
            container.appendChild(categoryElement);
        });
        
    }

    /**
     * Get university website link
     */
    getUniversityLink(schoolName) {
        const universityMap = {
            'University of Europe for Applied Sciences': 'https://www.ue-germany.com/',
            'Azad University': 'https://www.iau.ir/en',
            'Bahounar University': 'https://uk.ac.ir/en'
        };
        
        return universityMap[schoolName] || null;
    }

    /**
     * Load education section
     */
    loadEducation() {
        const container = document.getElementById('education-container');
        if (!container || !this.content[this.currentLanguage]) {
            console.warn('Education container not found or content missing');
            return;
        }

        const degrees = this.content[this.currentLanguage].education.degrees;
        container.innerHTML = '';

        degrees.forEach(degree => {
            const degreeElement = document.createElement('div');
            degreeElement.className = 'education-item bg-white/5 rounded-2xl p-6 border border-white/10';
            
            const universityLink = this.getUniversityLink(degree.school);
            const schoolElement = universityLink 
                ? `<a href="${universityLink}" target="_blank" rel="noopener noreferrer" class="text-white font-medium mb-1 hover:text-accent transition-colors" aria-label="${degree.school} (opens in new tab)">${degree.school}</a>`
                : `<p class="text-white font-medium mb-1">${degree.school}</p>`;
            
            degreeElement.innerHTML = `
                <h4 class="text-lg font-bold text-accent mb-2 font-heading">${degree.degree}</h4>
                ${schoolElement}
                <p class="text-gray-400 text-sm mb-2 font-mono">${degree.location}</p>
                <p class="text-gray-400 text-sm italic font-mono mb-2">${degree.year}</p>
                ${degree.focus ? `<p class="text-gray-300 text-sm"><span class="text-accent font-medium">Focus:</span> ${degree.focus}</p>` : ''}
            `;
            
            container.appendChild(degreeElement);
        });
        
    }

    /**
     * Load certifications section
     */
    loadCertifications() {
        const container = document.getElementById('certifications-container');
        if (!container || !this.content[this.currentLanguage]) {
            console.warn('Certifications container not found or content missing');
            return;
        }

        const certifications = this.content[this.currentLanguage].certifications.items;
        container.innerHTML = '';

        certifications.forEach(cert => {
            const certElement = document.createElement('div');
            certElement.className = 'cert-item bg-white/5 rounded-2xl p-4 border border-white/10';
            
            certElement.innerHTML = `
                <h4 class="text-base font-bold text-accent mb-1 font-heading">${cert.name}</h4>
                <p class="text-gray-300 text-sm mb-1">${cert.org}</p>
                <p class="text-gray-400 text-xs font-mono">${cert.year}</p>
            `;
            
            container.appendChild(certElement);
        });
        
    }

    /**
     * Load projects section
     */
    loadProjects() {
        const container = document.getElementById('projects-grid');
        if (!container || !this.content[this.currentLanguage]) {
            console.warn('Projects container not found or content missing');
            return;
        }

        const projects = this.content[this.currentLanguage].projects.items;
        container.innerHTML = '';

        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-card bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-accent/30 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group';
            
            projectElement.innerHTML = `
                <div class="project-accent absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                
                <div class="project-content flex flex-col h-full">
                    <h3 class="text-xl font-bold text-accent mb-3 group-hover:text-white transition-colors font-heading">${project.name}</h3>
                    <p class="content-block text-gray-300 leading-relaxed mb-4 flex-1">${project.description}</p>
                    
                    <div class="tech-stack mb-6">
                        <div class="flex flex-wrap gap-2">
                            ${project.tech.map(tech => 
                                `<span class="tech-tag bg-accent/10 text-accent px-2 py-1 rounded text-xs border border-accent/20 font-mono">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="mt-auto">
                        <a href="${project.link}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="project-link inline-flex items-center gap-2 px-4 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-black transition-all rounded-full font-medium group-hover:scale-105">
                            <span>Learn more</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            `;
            
            container.appendChild(projectElement);
        });
        
    }
    
    /**
     * Re-trigger animations after content reload
     * This fixes the issue where content disappears after language switch
     */
    retriggerAnimations() {
        // Give DOM time to update
        setTimeout(() => {
            // Re-observe timeline items for animations
            const timelineItems = document.querySelectorAll('.timeline-item');
            if (timelineItems.length > 0 && window.app) {
                // Trigger the animation observer from main.js
                const timelineObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                        }
                    });
                }, {
                    threshold: 0.3,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                // Re-observe all timeline items
                timelineItems.forEach(item => {
                    // Check if already in viewport
                    const rect = item.getBoundingClientRect();
                    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isInView) {
                        // If already in view, show immediately
                        item.classList.add('animate-in');
                    } else {
                        // Otherwise, set up observer for scroll trigger
                        item.classList.remove('animate-in');
                        timelineObserver.observe(item);
                    }
                });
                
            }
            
            // Also trigger section title animations
            const sectionTitles = document.querySelectorAll('.section-title');
            sectionTitles.forEach(title => {
                // Check if already in view
                const rect = title.getBoundingClientRect();
                const inView = rect.top < window.innerHeight && rect.bottom > 0;
                if (inView) {
                    title.classList.add('in-view');
                }
            });
        }, 100);
    }
    
    /**
     * Setup content observers for dynamically loaded elements
     */
    setupContentObservers() {
        // Only setup if main app is available and reduced motion is not preferred
        if (!window.app || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        // Content observer for newly loaded elements
        const contentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all content elements
        const contentSelectors = [
            '.skill-category',
            '.project-card', 
            '.education-item',
            '.cert-item',
            '.timeline-item'
        ];
        
        contentSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(item => {
                contentObserver.observe(item);
            });
        });
        
    }
}

// Initialize content loader when language manager is ready

function initContentLoader() {
    if (window.languageManager && window.languageManager.initialized && !window.contentLoader) {
        window.contentLoader = new ContentLoader();
    } else {
        // Retry in 100ms
        setTimeout(initContentLoader, 100);
    }
}

// Start initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContentLoader);
} else {
    initContentLoader();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentLoader;
}