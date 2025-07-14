/**
 * Enhanced Starfield Animation - The fancy space background stuff
 * 
 * Because who doesn't want flying stars that react to mouse movement?
 * Features that actually work (unlike my previous attempts):
 * - Scroll makes stars go ZOOM (with rubber band physics because why not)
 * - 3D-ish depth layers (fake 3D but looks cool)
 * - Mouse following that doesn't make you dizzy
 * 
 * TODO: Add warp speed effect when user scrolls really fast
 * FIXME: Sometimes stars get stuck at screen edges (rare bug, can't reproduce)
 */

class StarField {
    constructor() {
        // Get the canvas element - if it doesn't exist, we're screwed
        this.canvas = document.getElementById('starfield');
        if (!this.canvas) {
            console.error('Starfield canvas not found - someone forgot to add it to HTML!');
            return;
        }

        // Try to get 2D context - fallback to static background if it fails
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error('Canvas context not available - ancient browser detected');
            document.body.classList.add('no-canvas');
            return;
        }

        // Star configuration - because more stars = more awesome
        this.stars = [];
        this.numStars = 300; // Sweet spot between performance and visual appeal
        this.lastTime = 0;
        this.targetFPS = 60; // Aim for 60fps like a proper game
        this.frameInterval = 1000 / this.targetFPS;
        
        // Mouse tracking vars - made this buttery smooth after hours of tweaking
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.mouseVelocity = { x: 0, y: 0 }; // Not used anymore but keeping for nostalgia
        this.lastMouseX = window.innerWidth / 2;
        this.lastMouseY = window.innerHeight / 2;
        this.mouseLerpFactor = 0.07; // Magic number - don't touch unless you want jittery stars
        
        // Scroll-based animation props - rubber band physics FTW
        this.scrollSpeed = 0;
        this.targetScrollSpeed = 0;
        this.lastScrollY = 0;
        this.scrollDecay = 0.92; // How quickly scroll effect fades - feels natural
        
        // 3D layers config - creates depth illusion without actual 3D math
        this.layers = [
            { depth: 0.3, size: 0.4, opacity: 0.3, count: 0.4 }, // Background stars (tiny and dim)
            { depth: 0.6, size: 0.7, opacity: 0.6, count: 0.3 }, // Midground stars (medium)
            { depth: 1.0, size: 1.0, opacity: 1.0, count: 0.3 }  // Foreground stars (big and bright)
        ];
        
        console.log('Enhanced Starfield initializing... pray to the GPU gods');
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createStars();
        console.log(`Starfield initialized with ${this.stars.length} stars in ${this.layers.length} layers`);
    }
    
    setupEventListeners() {
        // Ultra-smooth mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            // Only update target position, actual position is smoothed in updateStars()
            this.targetMouse.x = e.clientX;
            this.targetMouse.y = e.clientY;
        });
        
        // Scroll event with acceleration
        let scrollTimer;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - this.lastScrollY;
            
            // Calculate scroll speed with smoothing
            this.targetScrollSpeed = Math.abs(scrollDelta) * 0.5;
            this.targetScrollSpeed = Math.min(this.targetScrollSpeed, 20); // Cap max speed
            
            this.lastScrollY = currentScrollY;
            
            // Clear existing timer and set decay timer
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                this.targetScrollSpeed = 0;
            }, 150);
        });
        
        // Handle window resize
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        
        console.log(`Canvas resized to: ${this.canvas.width}x${this.canvas.height}`);
    }
    
    createStars() {
        this.stars = [];
        
        for (let i = 0; i < this.numStars; i++) {
            // Determine which layer this star belongs to
            const layerRandom = Math.random();
            let layerIndex = 0;
            let accumulator = 0;
            
            for (let j = 0; j < this.layers.length; j++) {
                accumulator += this.layers[j].count;
                if (layerRandom <= accumulator) {
                    layerIndex = j;
                    break;
                }
            }
            
            const layer = this.layers[layerIndex];
            
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                baseX: 0, // Base position for mouse parallax
                baseY: 0,
                size: (Math.random() * 2 + 0.5) * layer.size,
                opacity: (Math.random() * 0.5 + 0.5) * layer.opacity,
                baseSpeed: Math.random() * 0.3 + 0.1,
                speed: 0,
                layer: layerIndex,
                depth: layer.depth,
                twinklePhase: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                // Individual star movement characteristics
                driftX: (Math.random() - 0.5) * 0.1,
                driftY: 0
            });
            
            // Set base positions
            this.stars[this.stars.length - 1].baseX = this.stars[this.stars.length - 1].x;
            this.stars[this.stars.length - 1].baseY = this.stars[this.stars.length - 1].y;
        }
    }
    
    updateStars() {
        // Smooth scroll speed transition with rubber band effect
        this.scrollSpeed += (this.targetScrollSpeed - this.scrollSpeed) * 0.1;
        this.scrollSpeed *= this.scrollDecay;
        
        // Ultra-smooth mouse position interpolation
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * this.mouseLerpFactor;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * this.mouseLerpFactor;
        
        this.stars.forEach(star => {
            // Calculate speed based on scroll and layer depth
            const scrollInfluence = this.scrollSpeed * star.depth;
            star.speed = star.baseSpeed + scrollInfluence;
            
            // Update position with base speed and scroll influence
            star.y += star.speed;
            star.x += star.driftX;
            
            // 3D Parallax effect based on mouse position
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            const mouseOffsetX = (this.mouse.x - centerX) / centerX;
            const mouseOffsetY = (this.mouse.y - centerY) / centerY;
            
            // Apply parallax based on depth - deeper stars move less
            const parallaxStrength = 42 * (1 - star.depth); // Increased by 40% (30 * 1.4)
            const parallaxX = mouseOffsetX * parallaxStrength;
            const parallaxY = mouseOffsetY * parallaxStrength * 0.42; // Increased by 40% (0.3 * 1.4)
            
            // Smooth position update with gentle mouse influence
            star.x = star.baseX + parallaxX;
            star.y = star.baseY + parallaxY;
            
            // Update base positions
            star.baseX += star.driftX;
            star.baseY += star.speed;
            
            // Wrap around screen with margin
            const margin = 50;
            if (star.baseY > this.canvas.height + margin) {
                star.baseY = -margin;
                star.baseX = Math.random() * this.canvas.width;
                star.y = star.baseY;
                star.x = star.baseX;
            }
            
            // Horizontal wrapping
            if (star.baseX < -margin) {
                star.baseX = this.canvas.width + margin;
                star.x = star.baseX;
            } else if (star.baseX > this.canvas.width + margin) {
                star.baseX = -margin;
                star.x = star.baseX;
            }
            
            // Twinkling effect
            star.twinklePhase += star.twinkleSpeed;
            const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
            star.currentOpacity = star.opacity * twinkle;
            
            // Size variation based on scroll speed for dynamic effect
            const sizeBoost = 1 + (this.scrollSpeed * 0.02 * star.depth);
            star.currentSize = star.size * sizeBoost;
        });
    }
    
    drawStars() {
        // Clear with gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(0.5, '#1a1a2e');
        gradient.addColorStop(1, '#0a0a0a');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Sort stars by layer for proper depth rendering
        const sortedStars = [...this.stars].sort((a, b) => a.layer - b.layer);
        
        // Draw stars with enhanced depth effect
        sortedStars.forEach(star => {
            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0.1, Math.min(1, star.currentOpacity));
            
            // Motion blur effect when scrolling fast
            if (this.scrollSpeed > 5) {
                const blurLength = this.scrollSpeed * star.depth * 0.5;
                const gradient = this.ctx.createLinearGradient(
                    star.x, star.y - blurLength,
                    star.x, star.y + blurLength
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.currentOpacity})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(star.x - star.currentSize/2, star.y - blurLength, star.currentSize, blurLength * 2);
            }
            
            // Glow effect for larger/closer stars
            if (star.currentSize > 1.5 && star.layer >= 1) {
                const glowGradient = this.ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, star.currentSize * 3
                );
                glowGradient.addColorStop(0, `rgba(255, 255, 255, ${star.currentOpacity * 0.8})`);
                glowGradient.addColorStop(0.5, `rgba(100, 255, 218, ${star.currentOpacity * 0.3})`);
                glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                this.ctx.fillStyle = glowGradient;
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.currentSize * 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Draw main star
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.currentSize, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
        
        // Debug info (remove in production)
        if (this.scrollSpeed > 0.1) {
            this.ctx.fillStyle = 'rgba(100, 255, 218, 0.5)';
            this.ctx.font = '12px monospace';
            this.ctx.fillText(`Scroll Speed: ${this.scrollSpeed.toFixed(2)}`, 10, 20);
        }
    }
    
    animate(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        
        if (deltaTime >= this.frameInterval) {
            this.updateStars();
            this.drawStars();
            this.lastTime = currentTime;
        }
        
        requestAnimationFrame((time) => this.animate(time));
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize immediately
console.log('Starting enhanced starfield initialization...');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStarfield);
} else {
    initStarfield();
}

function initStarfield() {
    console.log('DOM ready, creating enhanced starfield...');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        setTimeout(() => {
            window.starField = new StarField();
        }, 100);
    } else {
        console.log('Reduced motion preferred, skipping starfield');
        document.body.classList.add('no-canvas');
    }
}