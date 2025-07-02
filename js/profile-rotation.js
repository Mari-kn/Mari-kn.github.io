/**
 * profile-rotation.js - Physics-based smooth rotation with velocity tracking
 * Implements realistic rotation physics and glowing particle effects
 */

class PhysicsProfileRotation {
    constructor() {
        this.profileImage = null;
        this.isSpinning = false;
        this.animationFrame = null;
        
        // Physics properties
        this.velocity = { x: 0, y: 0 };
        this.angularVelocity = { x: 0, y: 0 };
        this.rotation = { x: 0, y: 0 };
        this.friction = 0.95; // Damping factor
        this.sensitivity = 0.3; // Mouse velocity to rotation sensitivity
        
        // Mouse tracking for velocity calculation
        this.mouseHistory = [];
        this.maxHistoryLength = 5;
        this.lastMouseTime = 0;
        
        this.init();
    }

    init() {
        setTimeout(() => this.setup(), 100);
    }

    setup() {
        this.profileImage = document.querySelector('.profile-image');
        
        if (!this.profileImage) {
            console.log('❌ Profile image not found');
            return;
        }

        console.log('✅ Profile image found - Physics rotation enabled');

        // Advanced event listeners for smooth tracking
        this.profileImage.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.profileImage.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
        this.profileImage.addEventListener('mouseleave', () => this.handleMouseLeave());
        
        console.log('✅ Physics events attached');
    }

    calculateMouseVelocity(e) {
        const currentTime = performance.now();
        const currentPos = { x: e.clientX, y: e.clientY, time: currentTime };
        
        // Add to history
        this.mouseHistory.push(currentPos);
        if (this.mouseHistory.length > this.maxHistoryLength) {
            this.mouseHistory.shift();
        }
        
        // Calculate velocity from recent history
        if (this.mouseHistory.length < 2) {
            return { x: 0, y: 0, magnitude: 0 };
        }
        
        const recent = this.mouseHistory[this.mouseHistory.length - 1];
        const previous = this.mouseHistory[this.mouseHistory.length - 2];
        
        const deltaTime = (recent.time - previous.time) || 1;
        const deltaX = recent.x - previous.x;
        const deltaY = recent.y - previous.y;
        
        const velX = deltaX / deltaTime * 1000; // pixels per second
        const velY = deltaY / deltaTime * 1000;
        const magnitude = Math.sqrt(velX * velX + velY * velY);
        
        return { x: velX, y: velY, magnitude };
    }

    handleMouseMove(e) {
        if (this.isSpinning) return;
        
        const velocity = this.calculateMouseVelocity(e);
        
        // Only trigger if there's significant movement
        if (velocity.magnitude > 50) {
            this.velocity = velocity;
            this.triggerPhysicsRotation(e);
        }
    }

    handleMouseEnter(e) {
        this.mouseHistory = [];
        this.calculateMouseVelocity(e); // Initialize history
    }

    handleMouseLeave() {
        this.mouseHistory = [];
    }

    triggerPhysicsRotation(e) {
        if (this.isSpinning) return;
        
        console.log('🌪️ Physics rotation triggered with velocity:', this.velocity.magnitude.toFixed(2));
        
        // Calculate angular velocity based on mouse velocity
        const maxAngularVel = 15; // degrees per frame
        const velocityFactor = Math.min(this.velocity.magnitude / 1000, 1); // Normalize
        
        // Set initial angular velocity based on mouse movement direction and speed
        this.angularVelocity.y = (this.velocity.x * this.sensitivity * velocityFactor).clamp(-maxAngularVel, maxAngularVel);
        this.angularVelocity.x = -(this.velocity.y * this.sensitivity * velocityFactor * 0.3).clamp(-maxAngularVel * 0.5, maxAngularVel * 0.5);
        
        this.isSpinning = true;
        this.startPhysicsAnimation();
        
        // Create particles based on velocity
        this.createVelocityParticles(e, this.velocity.magnitude);
    }

    startPhysicsAnimation() {
        const animate = () => {
            // Apply physics
            this.rotation.x += this.angularVelocity.x;
            this.rotation.y += this.angularVelocity.y;
            
            // Apply friction
            this.angularVelocity.x *= this.friction;
            this.angularVelocity.y *= this.friction;
            
            // Update transform
            this.profileImage.style.transform = `perspective(2000px) rotateX(${this.rotation.x}deg) rotateY(${this.rotation.y}deg)`;
            
            // Continue animation if still moving
            const totalVelocity = Math.abs(this.angularVelocity.x) + Math.abs(this.angularVelocity.y);
            if (totalVelocity > 0.1) {
                this.animationFrame = requestAnimationFrame(animate);
            } else {
                // Animation finished - return to center
                this.returnToCenter();
            }
        };
        
        animate();
    }

    returnToCenter() {
        console.log('🎯 Returning to center position');
        
        // Smooth return to original position
        this.profileImage.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.profileImage.style.transform = '';
        
        // Reset state
        setTimeout(() => {
            this.isSpinning = false;
            this.rotation = { x: 0, y: 0 };
            this.angularVelocity = { x: 0, y: 0 };
            this.profileImage.style.transition = '';
        }, 1200);
    }

    createVelocityParticles(e, velocity) {
        // Number of particles based on velocity (3-15 particles)
        const particleCount = Math.floor(3 + (velocity / 200) * 12).clamp(3, 15);
        
        console.log(`✨ Creating ${particleCount} velocity particles (speed: ${velocity.toFixed(2)})`);
        
        const rect = this.profileImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const radius = rect.width / 2;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createGlowParticle(centerX, centerY, radius, i, particleCount, velocity);
            }, i * 30);
        }
    }

    createGlowParticle(centerX, centerY, radius, index, total, velocity) {
        const particle = document.createElement('div');
        
        // Particle size based on velocity
        const baseSize = 4;
        const sizeBoost = Math.min(velocity / 300, 2);
        const size = (baseSize + sizeBoost * 6).clamp(4, 12);
        
        // Position around image edge
        const angle = (index / total) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const edgeX = centerX + Math.cos(angle) * (radius + 5);
        const edgeY = centerY + Math.sin(angle) * (radius + 5);
        
        // Glow intensity based on velocity
        const glowIntensity = Math.min(10 + velocity / 50, 25);
        
        particle.style.cssText = `
            position: fixed;
            left: ${edgeX - size/2}px;
            top: ${edgeY - size/2}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, #64ffda 0%, #00bcd4 50%, transparent 100%);
            border-radius: 50%;
            z-index: 10000;
            box-shadow: 
                0 0 ${glowIntensity}px #64ffda,
                0 0 ${glowIntensity * 2}px #64ffda77;
            pointer-events: none;
            opacity: ${0.8 + Math.min(velocity / 1000, 0.2)};
        `;
        
        document.body.appendChild(particle);
        
        // Explosive animation
        setTimeout(() => {
            const distance = 60 + velocity / 20; // Further for faster mouse
            const duration = 800 + Math.random() * 400;
            
            particle.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            particle.style.transform = `
                translate(
                    ${Math.cos(angle) * distance}px,
                    ${Math.sin(angle) * distance}px
                ) 
                scale(${0.1 + Math.random() * 0.2})
            `;
            particle.style.opacity = '0';
            particle.style.filter = `blur(${2 + velocity / 200}px)`;
            
            setTimeout(() => particle.remove(), duration + 100);
        }, 20);
    }
}

// Helper function for clamping values
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

// Initialize physics-based rotation system
console.log('🚀 Starting physics-based profile rotation...');
const profileRotation = new PhysicsProfileRotation();

// Global verfügbar machen
window.profileRotation = profileRotation;