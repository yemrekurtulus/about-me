/* ============================================
   ANTIGRAVITY CV — JAVASCRIPT
   Handles: Scroll Reveal, Navbar,
   Mobile Menu, Smooth Interactions,
   Card Auto-Slider, Lightbox Gallery,
   Certificate Toggle & Lightbox,
   Language Toggle (TR/EN)
   ============================================ */

// ---- Project gallery data (used by lightbox) ----
const projectGalleries = [
  // Project 1: Adalet Hukuk Bürosu
  [
    'foto/3.png',
    'foto/33.png',
    'foto/333.png',
    'foto/3333.png',
    'foto/3333333333.png',
    'foto/Ekran görüntüsü 2026-04-08 004447.png'
  ],
  // Project 2: Merkezi Yönetim
  [
    'foto/11.PNG',
    'foto/1.PNG',
    'foto/111.PNG',
    'foto/1111.PNG'
  ],
  // Project 3: Güvenli Ağ İletişimi
  [
    'foto/2.PNG'
  ]
];

// ---- Certificate images data (used by cert lightbox) ----
const certImages = [
  'foto/Yunus Emre Kurtuluş - Frontend NextJS.jpg',
  'foto/Yunus Emre Kurtuluş - Veri Tabanı ve Erişimi Microsoft SQL Server Database Management.jpg',
  'foto/Yunus Emre Kurtuluş - Yapay Zeka (AI) Teknolojisi.jpg',
  'foto/Yunus Emre Kurtuluş - Programlama Araçları Git  GitHub.jpg',
  'foto/Yunus Emre Kurtuluş - JavaScript - JSON  AJAX ve WebApi Kullanımı.jpg',
  'foto/Yunus Emre Kurtuluş - Programlama ve Algoritma Console Programming.jpg',
  'foto/Yunus Emre Kurtuluş - Frontend JQUERY-AJAX.jpg',
  'foto/Yunus Emre Kurtuluş - JavaScript - Nesneler.jpg',
  'foto/Yunus Emre Kurtuluş - Yapay Zeka ile Hayatınızı Değiştirecek Yöntemler.jpg',
  'foto/Yunus Emre Kurtuluş - İş İngilizcesi.jpg',
  'foto/Yunus Emre Kurtuluş - Skillsoft ile Liderlik - Kişisel Gelişim.jpg',
  'foto/Yunus Emre Kurtuluş - Teknoloji Okuryazarlığı.jpg',
  'foto/Yunus Emre Kurtuluş - Kendini İfade Etme Gücü Sessizlikleri Kır  Anla  Anlaşıl.jpg',
  'foto/Yunus Emre Kurtuluş - JavaScript - Nesneler (1).jpg',
  'foto/Yunus Emre Kurtuluş - Programlama Araçları Git  GitHub (1).jpg'
];

// ---- Lightbox state ----
let lightboxCurrentProject = 0;
let lightboxCurrentIndex = 0;
let lightboxMode = 'project'; // 'project' or 'cert'

// ---- Open gallery from project button click ----
function openGallery(projectIndex) {
  lightboxMode = 'project';
  lightboxCurrentProject = projectIndex;
  lightboxCurrentIndex = 0;
  showLightbox();
}

// ---- Open certificate lightbox ----
function openCertLightbox(certIndex) {
  lightboxMode = 'cert';
  lightboxCurrentIndex = certIndex;
  showLightbox();
}

function showLightbox() {
  const overlay = document.getElementById('lightboxOverlay');

  updateLightboxImage(false);
  overlay.classList.add('active');
  document.body.classList.add('lightbox-open');

  // Determine current images array
  const images = lightboxMode === 'project'
    ? projectGalleries[lightboxCurrentProject]
    : certImages;

  // Hide arrows and counter for cert or single image
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const counter = document.getElementById('lightboxCounter');

  if (lightboxMode === 'cert') {
    // Certificate lightbox: single image, no navigation
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    counter.style.display = 'none';
  } else if (images.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    counter.style.display = 'none';
  } else {
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    counter.style.display = 'block';
  }
}

function closeLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  overlay.classList.remove('active');
  document.body.classList.remove('lightbox-open');
}

function updateLightboxImage(animate = true) {
  const img = document.getElementById('lightboxImage');
  const counter = document.getElementById('lightboxCounter');

  let images;
  if (lightboxMode === 'project') {
    images = projectGalleries[lightboxCurrentProject];
  } else {
    images = certImages;
  }

  if (animate) {
    img.classList.add('transitioning');
    setTimeout(() => {
      img.src = images[lightboxCurrentIndex];
      img.alt = lightboxMode === 'project'
        ? `Proje Görseli ${lightboxCurrentIndex + 1}`
        : `Sertifika Görseli ${lightboxCurrentIndex + 1}`;
      counter.textContent = `${lightboxCurrentIndex + 1} / ${images.length}`;
      setTimeout(() => {
        img.classList.remove('transitioning');
      }, 50);
    }, 300);
  } else {
    img.src = images[lightboxCurrentIndex];
    img.alt = lightboxMode === 'project'
      ? `Proje Görseli ${lightboxCurrentIndex + 1}`
      : `Sertifika Görseli ${lightboxCurrentIndex + 1}`;
    counter.textContent = `${lightboxCurrentIndex + 1} / ${images.length}`;
  }
}

function lightboxPrev() {
  let images;
  if (lightboxMode === 'project') {
    images = projectGalleries[lightboxCurrentProject];
  } else {
    images = certImages;
  }
  lightboxCurrentIndex = (lightboxCurrentIndex - 1 + images.length) % images.length;
  updateLightboxImage(true);
}

function lightboxNext() {
  let images;
  if (lightboxMode === 'project') {
    images = projectGalleries[lightboxCurrentProject];
  } else {
    images = certImages;
  }
  lightboxCurrentIndex = (lightboxCurrentIndex + 1) % images.length;
  updateLightboxImage(true);
}

// ---- Toggle Certs (show/hide hidden certificates) ----
function toggleCerts() {
  const certsGrid = document.getElementById('certsGrid');
  const toggleBtn = document.getElementById('certsToggleBtn');
  const currentLang = localStorage.getItem('siteLang') || 'tr';

  if (certsGrid.classList.contains('show-all-certs')) {
    // Collapse — hide extra certs
    certsGrid.classList.remove('show-all-certs');
    if (currentLang === 'tr') {
      toggleBtn.textContent = 'Daha Fazla Sertifika Gör 📜';
    } else {
      toggleBtn.textContent = 'Show More Certificates 📜';
    }
  } else {
    // Expand — show all certs
    certsGrid.classList.add('show-all-certs');
    if (currentLang === 'tr') {
      toggleBtn.textContent = 'Daha Az Göster ⬆️';
    } else {
      toggleBtn.textContent = 'Show Less ⬆️';
    }

    // Trigger reveal for newly visible cert cards
    const hiddenCards = certsGrid.querySelectorAll('.hidden-cert.reveal:not(.visible)');
    setTimeout(() => {
      hiddenCards.forEach(card => {
        card.classList.add('visible');
      });
    }, 100);
  }
}


// ============================================
//   LANGUAGE TOGGLE (TR / EN)
// ============================================

// Get stored language or default to Turkish
let currentLanguage = localStorage.getItem('siteLang') || 'tr';

/**
 * Apply the given language to all elements with data-tr / data-en attributes.
 * Updates innerHTML for elements that use &amp; entities, textContent for the rest.
 */
function applyLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('siteLang', lang);

  // Update html lang attribute
  document.documentElement.lang = lang === 'tr' ? 'tr' : 'en';

  // Update page title
  document.title = lang === 'tr'
    ? 'Portfolyo | Yunus Emre Kurtuluş'
    : 'Portfolio | Yunus Emre Kurtuluş';

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', lang === 'tr'
      ? 'Yunus Emre Kurtuluş — Kişisel portfolyo ve CV sitesi. Projeler, sertifikalar ve daha fazlası.'
      : 'Yunus Emre Kurtuluş — Personal portfolio and CV website. Projects, certificates, and more.'
    );
  }

  // Find all elements with data-tr and data-en attributes
  const translatableElements = document.querySelectorAll('[data-tr][data-en]');

  translatableElements.forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text !== null) {
      // Use innerHTML to preserve HTML entities like &amp;
      el.innerHTML = text;
    }
  });

  // Update the language toggle switch
  const langSwitch = document.getElementById('langToggle');
  const langTR = document.getElementById('langTR');
  const langEN = document.getElementById('langEN');

  if (langSwitch && langTR && langEN) {
    langSwitch.setAttribute('data-lang', lang);
    if (lang === 'tr') {
      langTR.classList.add('active');
      langEN.classList.remove('active');
    } else {
      langEN.classList.add('active');
      langTR.classList.remove('active');
    }
  }

  // Update the certs toggle button text based on current state
  const certsGrid = document.getElementById('certsGrid');
  const toggleBtn = document.getElementById('certsToggleBtn');
  if (certsGrid && toggleBtn) {
    if (certsGrid.classList.contains('show-all-certs')) {
      toggleBtn.textContent = lang === 'tr' ? 'Daha Az Göster ⬆️' : 'Show Less ⬆️';
    } else {
      toggleBtn.textContent = lang === 'tr' ? 'Daha Fazla Sertifika Gör 📜' : 'Show More Certificates 📜';
    }
  }
}

/**
 * Toggle between TR and EN languages.
 */
function toggleLanguage() {
  const newLang = currentLanguage === 'tr' ? 'en' : 'tr';
  applyLanguage(newLang);

  // Add pulse animation to the toggle button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.classList.remove('pulse');
    // Force reflow to restart animation
    void langToggle.offsetWidth;
    langToggle.classList.add('pulse');

    // Remove animation class after it finishes
    setTimeout(() => {
      langToggle.classList.remove('pulse');
    }, 600);
  }
}


document.addEventListener('DOMContentLoaded', () => {

  // ---------- 1. NAVBAR SCROLL EFFECT ----------
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });


  // ---------- 2. MOBILE MENU TOGGLE ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });


  // ---------- 3. SCROLL REVEAL (Intersection Observer) ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ---------- 4. SMOOTH SCROLL for ANCHOR LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ---------- 5. DYNAMIC FLOATING PARTICLES ----------
  const createParticles = (section, count = 6) => {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      particle.style.left   = Math.random() * 100 + '%';
      particle.style.top    = Math.random() * 100 + '%';
      particle.style.width  = (2 + Math.random() * 4) + 'px';
      particle.style.height = particle.style.width;
      particle.style.opacity = (0.1 + Math.random() * 0.25).toString();

      const duration = 8 + Math.random() * 12;
      const delay    = Math.random() * 5;
      particle.style.animation = `badgeFloat ${duration}s ${delay}s ease-in-out infinite`;

      section.style.position = 'relative';
      section.appendChild(particle);
    }
  };

  const sectionIds = ['projeler', 'sertifikalar', 'hakkimda'];
  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section) createParticles(section, 8);
  });


  // ---------- 6. SUBTLE HOVER LIFT ON GLASS CARDS (Desktop) ----------
  // Gentle lift on hover instead of aggressive 3D tilt to prevent skewed look
  if (window.matchMedia('(hover: hover)').matches) {
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-6px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }


  // ---------- 7. ACTIVE NAV LINK HIGHLIGHT ----------
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = 'var(--accent-light)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });


  // ---------- 8. CARD AUTO-SLIDER ----------
  // Each .card-slider auto-cycles its images every 4 seconds
  const cardSliders = document.querySelectorAll('.card-slider');

  cardSliders.forEach(slider => {
    const images = slider.querySelectorAll('.slider-img');
    const dots = slider.querySelectorAll('.dot');
    let currentIndex = 0;
    let intervalId = null;

    // Don't auto-slide if there's only 1 image
    if (images.length <= 1) return;

    const goToSlide = (index) => {
      // Remove active from current
      images[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');

      // Update index
      currentIndex = index % images.length;

      // Add active to new
      images[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    };

    const startAutoSlide = () => {
      intervalId = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 4000);
    };

    // Pause auto-slide on hover, resume on leave
    slider.addEventListener('mouseenter', () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    });

    slider.addEventListener('mouseleave', () => {
      startAutoSlide();
    });

    // Dot click navigation
    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(i);
        // Reset interval
        if (intervalId) clearInterval(intervalId);
        startAutoSlide();
      });
    });

    // Click on slider image opens the gallery
    slider.addEventListener('click', (e) => {
      // Don't open gallery if clicking a dot
      if (e.target.classList.contains('dot')) return;

      // Find the project index from the parent project-card
      const projectCard = slider.closest('.project-card');
      const allCards = document.querySelectorAll('.project-card');
      let projectIndex = 0;
      allCards.forEach((card, i) => {
        if (card === projectCard) projectIndex = i;
      });

      lightboxMode = 'project';
      lightboxCurrentProject = projectIndex;
      lightboxCurrentIndex = currentIndex;
      showLightbox();
    });

    // Start auto-sliding
    startAutoSlide();
  });


  // ---------- 9. LIGHTBOX EVENT LISTENERS ----------
  const overlay = document.getElementById('lightboxOverlay');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  closeBtn.addEventListener('click', closeLightbox);

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxPrev();
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxNext();
  });

  // Close on overlay click (but not on image or buttons)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('lightbox-container')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        if (lightboxMode === 'project') lightboxPrev();
        break;
      case 'ArrowRight':
        if (lightboxMode === 'project') lightboxNext();
        break;
    }
  });

  // Touch/swipe support for lightbox
  let touchStartX = 0;
  let touchEndX = 0;

  overlay.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  overlay.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50 && lightboxMode === 'project') {
      if (diff > 0) {
        lightboxNext();
      } else {
        lightboxPrev();
      }
    }
  }, { passive: true });


  // ---------- 10. LANGUAGE TOGGLE ----------
  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', toggleLanguage);
  }

  // Apply saved language on page load
  applyLanguage(currentLanguage);


  // Initial calls
  handleNavbarScroll();
  highlightNav();

});
