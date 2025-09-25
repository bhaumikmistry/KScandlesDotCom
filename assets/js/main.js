// KS Candles Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ===== SMOOTH SCROLLING NAVIGATION =====
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== MOBILE HAMBURGER MENU =====
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav--open');
            
            // Animate hamburger lines
            const lines = navToggle.querySelectorAll('.toggle__line');
            lines.forEach((line, index) => {
                if (navMenu.classList.contains('nav--open')) {
                    if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) line.style.opacity = '0';
                    if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = navMenu.querySelectorAll('.nav__link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav--open');
                
                // Reset hamburger lines
                const lines = navToggle.querySelectorAll('.toggle__line');
                lines.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            });
        });
    }
    
    // ===== NEWSLETTER FORM HANDLING =====
    
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter__input');
            const submitButton = this.querySelector('.newsletter__button');
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
                submitButton.textContent = 'Subscribe';
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // ===== SHOPPING CART FUNCTIONALITY =====
    
    let cartCount = 0;
    const cartBadge = document.querySelector('.cart__badge');
    const addToCartButtons = document.querySelectorAll('.product__button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product__card');
            const productName = productCard.querySelector('.product__name').textContent;
            
            // Animate button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Update cart count
            cartCount++;
            if (cartBadge) {
                cartBadge.textContent = cartCount;
                cartBadge.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartBadge.style.transform = 'scale(1)';
                }, 200);
            }
            
            showNotification(`${productName} added to cart!`, 'success');
        });
    });
    
    // ===== HEADER SCROLL EFFECT =====
    
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // ===== NOTIFICATION SYSTEM =====
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        
        // Set background color based on type
        if (type === 'success') {
            notification.style.backgroundColor = '#10b981';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#ef4444';
        } else {
            notification.style.backgroundColor = '#6b7280';
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // ===== INSTAGRAM FEED INTEGRATION =====
    
    // Initialize Instagram Manager
    function initializeInstagramFeed() {
        const instagramGrid = document.getElementById('instagram-grid');
        if (!instagramGrid) {
            console.log('Instagram grid not found');
            return;
        }
        
        // Clear any existing rotation state
        localStorage.removeItem('instagram_last_rotation');
        localStorage.removeItem('instagram_rotation_offset');
        localStorage.removeItem('instagram_last_check');
        
        // Create Instagram manager instance
        const instagramManager = new InstagramManager();
        
        // Render Instagram posts
        instagramManager.renderToGrid('instagram-grid');
    }
    
    // Initialize Instagram feed
    initializeInstagramFeed();
    
    console.log('KS Candles website loaded successfully!');
});