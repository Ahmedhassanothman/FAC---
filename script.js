// Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });

    // Loading animation
    window.addEventListener('load', () => {
      const loader = document.querySelector('.loader');
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
      mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Counter animation
    function animateCounter(element, target) {
      let current = 0;
      const increment = target / 100;
      const duration = 2000;
      const interval = duration / 100;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = Math.floor(target);
          clearInterval(counter);
        } else {
          element.textContent = Math.floor(current);
        }
      }, interval);
    }

    // Initialize counters when in viewport
    const counters = document.querySelectorAll('.counter');
    let started = false;

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          counters.forEach(counter => {
            animateCounter(counter, parseInt(counter.textContent));
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQs
        faqItems.forEach(faqItem => {
          faqItem.classList.remove('active');
        });

        // Open clicked FAQ if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });

    // Form Submission Handler - Using Web3Forms
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      formData.append('access_key', 'df755f97-82ab-4fe5-b7e8-29c41482da30');
      formData.append('subject', 'رسالة جديدة من موقع FAC - فاينانس للمحاسبه');
      
      // تحويل نوع الخدمة إلى العربي
      const serviceMap = {
        'audit': 'المراجعة والتدقيق',
        'tax': 'الزكاة والضرائب',
        'consulting': 'الاستشارات المالية',
        'bookkeeping': 'مسك الدفاتر'
      };
      
      const serviceValue = this.querySelector('[name="service"]').value;
      if (serviceValue) {
        formData.set('service', serviceMap[serviceValue] || serviceValue);
      }
      
      // إرسال إلى البريد المطلوب
      formData.append('_to', 'acc.soq@gmail.com');

      // Change button text to loading state
      const submitButton = this.querySelector('.submit-button');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
      submitButton.disabled = true;

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          // Show success message
          formMessage.style.display = 'block';
          formMessage.style.background = 'rgba(16, 185, 129, 0.1)';
          formMessage.style.color = '#10b981';
          formMessage.style.border = '2px solid #10b981';
          formMessage.innerHTML = '<i class="fas fa-check-circle"></i> تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.';
          
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;

          // Hide message after 5 seconds
          setTimeout(() => {
            formMessage.style.display = 'none';
          }, 5000);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log('ERROR:', error);
        
        // Show error message
        formMessage.style.display = 'block';
        formMessage.style.background = 'rgba(239, 68, 68, 0.1)';
        formMessage.style.color = '#ef4444';
        formMessage.style.border = '2px solid #ef4444';
        formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.';
        
        // Reset button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }
    });

    // Enhanced scroll animations
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      
      // Parallax effect for hero background
      const heroBg = document.querySelector('.hero-bg');
      if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
      
      // Fade effect for navbar
      const navbar = document.querySelector('.navbar');
      if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      }
    });

    // Enhanced hover effects
    const cards = document.querySelectorAll('.card, .tech-card, .testimonial');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });