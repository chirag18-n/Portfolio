document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // Lucide Icons Initialization
  // ==========================================================================
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================================================
  // Light / Dark Theme Manager
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      document.querySelector('meta[name="color-scheme"]').content = 'light';
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.querySelector('meta[name="color-scheme"]').content = 'dark';
    }
  });

  // ==========================================================================
  // Mobile Navigation Menu Toggle
  // ==========================================================================
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  mobileToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const menuIcon = mobileToggleBtn.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
      menuIcon.setAttribute('data-lucide', 'x');
    } else {
      menuIcon.setAttribute('data-lucide', 'menu');
    }
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });

  // Close mobile menu when nav link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const menuIcon = mobileToggleBtn.querySelector('i');
        menuIcon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });
  });

  // ==========================================================================
  // Smooth Scroll Spy (Active Menu Highlighting)
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  
  function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset header
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav a[href*=${sectionId}]`);
      
      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', scrollActive);

  // ==========================================================================
  // Intersection Observer for Reveal-on-Scroll Animations
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal, .card, .timeline-item, .other-project-card, .stat-box');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // If we want a slide-up entrance, let's apply active states
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    // Setup initial styles inline if not already styled by CSS classes
    if (!element.classList.contains('reveal')) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(25px)';
      element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    revealObserver.observe(element);
  });

  // ==========================================================================
  // Featured Project Slider / Interactive Content Switcher
  // ==========================================================================
  const featuredProjects = [
    {
      title: "TrustHire AI",
      description: "An AI-powered platform that detects scam job postings using NLP and machine learning. It analyzes job descriptions, company credibility, and posting patterns to provide a risk score.",
      image: "assets/trusthire-ai.jpg",
      tags: ["React", "Tailwind CSS", "Python", "Machine Learning", "API"],
      live: "#",
      github: "https://github.com/chirag-katariya",
      isFeatured: true
    },
    {
      title: "AI Weather Dashboard",
      description: "A next-gen weather visualization portal mapping historical trends and using local regression models to predict rainfall indicators. Styled in full modern glassmorphism UI.",
      image: "assets/laptop-working.jpg",
      tags: ["JavaScript", "HTML5", "CSS3", "Fetch API", "Linear Regression"],
      live: "#",
      github: "https://github.com/chirag-katariya",
      isFeatured: true
    }
  ];

  let currentProjectIndex = 0;
  const projectNextBtn = document.querySelector('.project-slider-next');
  
  if (projectNextBtn) {
    const featuredCard = document.querySelector('.featured-project-card');
    const projectImg = featuredCard.querySelector('.featured-project-image');
    const projectTitle = featuredCard.querySelector('.featured-project-title');
    const projectDesc = featuredCard.querySelector('.featured-project-desc');
    const projectTagsContainer = featuredCard.querySelector('.project-tags');
    const projectLiveLink = featuredCard.querySelector('.project-links a:first-child');
    const projectGitLink = featuredCard.querySelector('.project-links a:last-child');
    
    projectNextBtn.addEventListener('click', () => {
      // Fade out
      featuredCard.style.opacity = '0.3';
      featuredCard.style.transform = 'scale(0.98)';
      
      setTimeout(() => {
        currentProjectIndex = (currentProjectIndex + 1) % featuredProjects.length;
        const data = featuredProjects[currentProjectIndex];
        
        // Update content
        projectImg.src = data.image;
        projectImg.alt = `${data.title} Screenshot`;
        projectTitle.textContent = data.title;
        projectDesc.textContent = data.description;
        
        // Update Tags
        projectTagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
          const tagSpan = document.createElement('span');
          tagSpan.className = 'tag';
          tagSpan.textContent = tag;
          projectTagsContainer.appendChild(tagSpan);
        });
        
        // Update links
        projectLiveLink.href = data.live;
        projectGitLink.href = data.github;
        
        // Fade in
        featuredCard.style.opacity = '1';
        featuredCard.style.transform = 'scale(1)';
      }, 200);
    });
  }

});
