/**
 * simple-particles.js - Präzise Positionierung und Größenanpassung
 */

class SimpleTextParticles {
    constructor() {
        this.activeElements = new Map();
        this.init();
    }

    init() {
        console.log('🚀 Starting text particles...');
        
        setTimeout(() => this.setupScrollEffects(), 500);
        this.setupHoverEffects();
        this.setupWarpArrow();
    }

    setupScrollEffects() {
        const headers = document.querySelectorAll('h1, h2, h3, .section-title');
        console.log('📝 Found headers:', headers.length);
        
        window.addEventListener('scroll', () => {
            headers.forEach(header => {
                this.checkHeaderPosition(header);
            });
        }, { passive: true });
    }

    checkHeaderPosition(element) {
        const elementId = element.textContent.trim().substring(0, 20);
        const rect = element.getBoundingClientRect();
        const triggerZone = 120;
        
        const status = this.activeElements.get(elementId) || { triggered: false, lastTrigger: 0 };
        const now = Date.now();
        
        const inTriggerZone = rect.top <= triggerZone && rect.top > -50 && rect.bottom > 0;
        
        if (inTriggerZone && !status.triggered && (now - status.lastTrigger > 2000)) {
            console.log('💥 Triggering explosion for:', elementId, 'at position:', rect.left, rect.top);
            
            this.explodeTextFromElement(element);
            
            this.activeElements.set(elementId, { 
                triggered: true, 
                lastTrigger: now 
            });
            
            setTimeout(() => {
                const s = this.activeElements.get(elementId);
                if (s) s.triggered = false;
            }, 1500);
        }
        
        if (!inTriggerZone && status.triggered) {
            status.triggered = false;
            this.activeElements.set(elementId, status);
        }
    }

    explodeTextFromElement(element) {
        const text = element.textContent.trim();
        if (!text) return;
        
        // Exakte Element-Eigenschaften
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);
        const fontSize = parseFloat(computedStyle.fontSize);
        const fontFamily = computedStyle.fontFamily;
        const fontWeight = computedStyle.fontWeight;
        const textAlign = computedStyle.textAlign;
        
        console.log('📏 Element details:', {
            text: text.substring(0, 20),
            position: { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
            fontSize: fontSize,
            textAlign: textAlign
        });
        
        // Canvas für exakte Buchstaben-Messung
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        
        // Text-Position berechnen basierend auf Alignment
        let startX = rect.left;
        const centerY = rect.top + (rect.height / 2);
        
        // Justierung für verschiedene text-align Werte
        if (textAlign === 'center') {
            const textWidth = ctx.measureText(text).width;
            startX = rect.left + (rect.width - textWidth) / 2;
        } else if (textAlign === 'right') {
            const textWidth = ctx.measureText(text).width;
            startX = rect.left + rect.width - textWidth;
        }
        
        console.log('📍 Calculated start position:', startX, centerY);
        
        // Buchstaben einzeln messen und explodieren
        const chars = text.split('').slice(0, 30);
        let currentX = startX;
        
        chars.forEach((char, index) => {
            if (char.trim()) {
                const charWidth = ctx.measureText(char).width;
                
                this.createExplodingChar(
                    char, 
                    currentX + (charWidth / 2), // Mitte des Buchstabens
                    centerY,
                    fontSize,
                    fontFamily,
                    fontWeight,
                    index,
                    element
                );
                
                currentX += charWidth;
            } else {
                // Leerzeichen
                currentX += fontSize * 0.3;
            }
        });
        
        // Visuelles Feedback
        element.style.transition = 'all 0.3s ease';
        element.style.opacity = '0.3';
        element.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            element.style.opacity = '';
            element.style.transform = '';
        }, 400);
    }

    createExplodingChar(char, x, y, fontSize, fontFamily, fontWeight, index, originalElement) {
        const particle = document.createElement('div');
        particle.textContent = char;
        
        // Farbe der Original-Überschrift erkennen
        const computedStyle = window.getComputedStyle(originalElement);
        const originalColor = computedStyle.color;
        
        // RGB zu Hex konvertieren für bessere Kontrolle
        let particleColor = originalColor;
        let glowColor = originalColor;
        
        // Falls RGB Format, zu Hex
        if (originalColor.startsWith('rgb')) {
            const rgb = originalColor.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
                const hex = '#' + rgb.slice(0,3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
                particleColor = hex;
                glowColor = hex;
            }
        }
        
        // Größe basierend auf Original-Font
        const particleSize = Math.max(fontSize, 16);
        const glowIntensity = fontSize / 20;
        
        console.log(`✨ Creating particle "${char}" at ${x}, ${y} with size ${particleSize}px, color: ${particleColor}`);
        
        particle.style.cssText = `
            position: fixed;
            left: ${x - particleSize/4}px;
            top: ${y - particleSize/2}px;
            color: ${particleColor};
            font-size: ${particleSize}px;
            font-weight: ${fontWeight};
            font-family: ${fontFamily};
            text-shadow: 
                0 0 ${glowIntensity * 10}px ${glowColor}, 
                0 0 ${glowIntensity * 20}px ${glowColor},
                0 0 ${glowIntensity * 30}px ${glowColor};
            z-index: 10000;
            pointer-events: none;
            opacity: 1;
            transform: scale(1);
            transition: none;
            text-align: center;
            line-height: 1;
        `;
        
        document.body.appendChild(particle);
        
        // Animation - Größe beeinflusst Explosion
        setTimeout(() => {
            const explosionScale = Math.max(fontSize / 50, 0.5); // Explosion proportional zur Schriftgröße
            const baseDistance = fontSize * 2; // Basis-Distanz abhängig von Schriftgröße
            
            particle.style.transition = 'all 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Explosion berechnen
            const angle = (index * 0.4) + Math.random() * Math.PI * 2;
            const distance = baseDistance + Math.random() * baseDistance;
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance - (fontSize * 0.5); // Leicht nach oben
            const rotation = (Math.random() - 0.5) * 720;
            const finalScale = explosionScale * (0.1 + Math.random() * 0.2);
            
            particle.style.transform = `
                translate(${moveX}px, ${moveY}px) 
                rotate(${rotation}deg) 
                scale(${finalScale})
            `;
            particle.style.opacity = '0';
            particle.style.filter = `blur(${Math.max(glowIntensity, 2)}px)`;
            
            console.log(`🎬 Animating "${char}" with explosion scale ${explosionScale}, distance ${distance}`);
        }, 30);
        
        // Cleanup
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1900);
    }

    setupHoverEffects() {
        document.addEventListener('mouseover', (e) => {
            const target = e.target;
            
            if (target.matches('.skill-tag, .contact-link, .tech-tag, .project-link')) {
                this.createHoverSparks(target);
            }
        }, { passive: true });
        
        console.log('✅ Hover effects ready');
    }

    createHoverSparks(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Funken-Größe basierend auf Element-Größe
        const sparkSize = Math.min(Math.max(rect.height / 10, 2), 6);
        
        for (let i = 0; i < 6; i++) {
            const spark = document.createElement('div');
            const angle = (Math.PI * 2 / 6) * i;
            
            spark.style.cssText = `
                position: fixed;
                left: ${centerX - sparkSize/2}px;
                top: ${centerY - sparkSize/2}px;
                width: ${sparkSize}px;
                height: ${sparkSize}px;
                background: #64ffda;
                border-radius: 50%;
                z-index: 10000;
                box-shadow: 0 0 ${sparkSize * 2}px #64ffda;
                pointer-events: none;
                opacity: 1;
            `;
            
            document.body.appendChild(spark);
            
            setTimeout(() => {
                spark.style.transition = 'all 0.7s ease-out';
                const distance = rect.width / 3 + Math.random() * 20;
                
                spark.style.transform = `
                    translate(
                        ${Math.cos(angle) * distance}px,
                        ${Math.sin(angle) * distance}px
                    ) scale(0)
                `;
                spark.style.opacity = '0';
            }, 15);
            
            setTimeout(() => spark.remove(), 750);
        }
    }

    setupWarpArrow() {
        // Warp-Pfeil erstellen
        const warpArrow = document.createElement('div');
        warpArrow.id = 'warp-arrow';
        warpArrow.innerHTML = `
            <div class="warp-body">
                <svg width="30" height="40" viewBox="0 0 30 40" fill="none">
                    <path d="M15 2 L28 35 L15 28 L2 35 Z" fill="#64ffda" stroke="#64ffda" stroke-width="2"/>
                    <circle cx="15" cy="20" r="3" fill="#ffffff" opacity="0.8"/>
                </svg>
            </div>
        `;
        
        warpArrow.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 80px;
            opacity: 0;
            transform: translateY(20px) scale(0.8);
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            cursor: pointer;
            z-index: 10000;
            pointer-events: none;
        `;
        
        // Trail-Effekt
        const style = document.createElement('style');
        style.textContent = `
            
            .warp-body {
                position: relative;
                z-index: 2;
                filter: drop-shadow(0 0 10px #64ffda);
                animation: warpBob 2s ease-in-out infinite;
            }
            
            
            @keyframes warpBob {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
            }
            
            #warp-arrow:hover .warp-body {
                filter: drop-shadow(0 0 20px #64ffda);
                transform: scale(1.1);
            }
            
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(warpArrow);
        
        // Scroll-Detection für Pfeil
        let isAtBottom = false;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 100;
            
            if (atBottom && !isAtBottom) {
                // Unten angekommen - Pfeil erscheinen
                isAtBottom = true;
                warpArrow.style.opacity = '1';
                warpArrow.style.transform = 'translateY(0) scale(1)';
                warpArrow.style.pointerEvents = 'auto';
                
                console.log('🚀 Warp arrow activated!');
            } else if (!atBottom && isAtBottom) {
                // Weg vom Bottom - Pfeil verstecken
                isAtBottom = false;
                warpArrow.style.opacity = '0';
                warpArrow.style.transform = 'translateY(20px) scale(0.8)';
                warpArrow.style.pointerEvents = 'none';
            }
        }, { passive: true });
        
        // Warp-Effekt beim Klick
        warpArrow.addEventListener('click', () => {
            this.performWarpToTop();
        });
        
        console.log('🚀 Warp arrow system ready');
    }

    performWarpToTop() {
        console.log('🌟 WARP ACTIVATED!');
        
        // Warp-Partikel erstellen
        this.createWarpParticles();
        
        // Screen-Flash Effekt
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle, #64ffda33, transparent);
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
        `;
        document.body.appendChild(flash);
        
        // Flash-Animation
        flash.style.transition = 'opacity 0.3s ease-out';
        requestAnimationFrame(() => {
            flash.style.opacity = '1';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => flash.remove(), 400);
            }, 200);
        });
        
        // Direkter Smooth-Scroll nach ganz oben
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        console.log('🎯 Warping to top (0,0)');
    }

    createWarpParticles() {
        const arrow = document.getElementById('warp-arrow');
        const rect = arrow.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // 15 Warp-Partikel
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    width: 3px;
                    height: 3px;
                    background: #64ffda;
                    border-radius: 50%;
                    z-index: 10001;
                    box-shadow: 0 0 8px #64ffda;
                    pointer-events: none;
                `;
                
                document.body.appendChild(particle);
                
                // Warp-Animation nach oben
                requestAnimationFrame(() => {
                    particle.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    
                    const angle = (i / 15) * Math.PI * 2;
                    const spiralRadius = 50;
                    const height = window.innerHeight + 100;
                    
                    particle.style.transform = `
                        translate(
                            ${Math.cos(angle) * spiralRadius}px,
                            ${-height}px
                        ) scale(2)
                    `;
                    particle.style.opacity = '0';
                });
                
                setTimeout(() => particle.remove(), 1100);
            }, i * 30);
        }
    }
}

// Initialisierung
const textParticles = new SimpleTextParticles();
window.textParticles = textParticles;

console.log('✨ Text particles ready with color matching and warp arrow!');