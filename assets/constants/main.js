document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navToggleLabel = document.querySelector('.nav-toggle-label');
    
    navToggleLabel.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Page Navigation Toggle
    const pageNavToggle = document.querySelector('.page-nav__toggle');
    const pageNavMenu = document.querySelector('.page-nav__menu');
    
    if (pageNavToggle && pageNavMenu) {
        pageNavToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            pageNavMenu.style.display = isExpanded ? 'none' : 'flex';
        });
    }
    
    // Scroll Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.75) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navToggle.checked) {
                    navToggle.checked = false;
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // Virtual Tour Button
    const tourButton = document.querySelector('.tour-button');
    if (tourButton) {
        tourButton.addEventListener('click', function() {
            Swal.fire({
                title: 'Virtual Tour Coming Soon!',
                text: 'Our interactive virtual tour is currently under development. Please check back later.',
                icon: 'info',
                confirmButtonColor: '#e25845',
                confirmButtonText: 'OK'
            });
        });
    }
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js';
        document.body.appendChild(lazyLoadScript);
        
        lazyLoadScript.onload = function() {
            const observer = lozad();
            observer.observe();
        };
    }
});