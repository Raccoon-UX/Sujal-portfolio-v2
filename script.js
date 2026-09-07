document.addEventListener('DOMContentLoaded', () => {
  console.log("🚀 System Active: Sujal Verma's Portfolio Framework Initialized (Light Mode Engine).");

  /* ================= 1. MINIMALIST LOGO PRELOADER ================= */
  const progressFill = document.getElementById("progressFill");
  const progressPercent = document.getElementById("progressPercent");
  const preloader = document.getElementById("preloader");

  if (preloader && progressFill && progressPercent) {
    let currentPercentage = 0;
    const duration = 1600; // 1.6s smooth preloader
    const intervalTime = 20; 
    const totalSteps = duration / intervalTime;
    const stepIncrement = 100 / totalSteps;

    const loaderInterval = setInterval(() => {
      currentPercentage += stepIncrement;
      if (currentPercentage >= 100) {
        currentPercentage = 100;
        clearInterval(loaderInterval);
        
        setTimeout(() => {
          preloader.style.opacity = "0";
          preloader.style.transform = "scale(1.02)";
          
          setTimeout(() => {
            preloader.style.display = "none";
            if (typeof window.heroTl !== 'undefined' && window.heroTl) {
              window.heroTl.play();
            }
          }, 600);
        }, 200);
      }
      
      const displayVal = Math.floor(currentPercentage);
      progressPercent.innerText = `${displayVal}%`;
      progressFill.style.width = `${displayVal}%`;
    }, intervalTime);
  }

  /* ================= 2. MOBILE HAMBURGER MENU SYSTEM ================= */
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Hamburger to 'X' animation
      const bars = menuBtn.querySelectorAll('.bar');
      if (navLinks.classList.contains('active')) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });

    // Close menu when clicking any nav item
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const bars = menuBtn.querySelectorAll('.bar');
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      });
    });
  }

  /* ================= 3. CUSTOM CURSOR & ACCELERATION ================= */
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorFollower = document.querySelector('.custom-cursor-follower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let isMagneticLocked = false;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (hasFinePointer && cursorDot && cursorFollower) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    const tickCursor = () => {
      if (!isMagneticLocked) {
        const lerpFactor = 0.12; // Smooth physics damping
        followerX += (mouseX - followerX) * lerpFactor;
        followerY += (mouseY - followerY) * lerpFactor;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
      }

      requestAnimationFrame(tickCursor);
    };
    requestAnimationFrame(tickCursor);

    // Dynamic Hover classes trigger
    const interactiveElements = document.querySelectorAll('a, button, .view-trigger, .case-study-btn, .filter-btn, .skills-filter-btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!isMagneticLocked && typeof gsap !== 'undefined') {
          gsap.to(cursorFollower, {
            width: '56px',
            height: '56px',
            duration: 0.25,
            ease: "power2.out"
          });
        }
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
      });
      el.addEventListener('mouseleave', () => {
        if (!isMagneticLocked && typeof gsap !== 'undefined') {
          gsap.to(cursorFollower, {
            width: '40px',
            height: '40px',
            duration: 0.25,
            ease: "power2.out"
          });
        }
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });

    // Magnetic Attraction Mechanics
    const magneticElements = document.querySelectorAll('.nav-link, .logo, .social-icon, .execute-btn, .btn, .filter-btn, .skills-filter-btn');
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        isMagneticLocked = true;
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        
        const strength = 12;
        if (typeof gsap !== 'undefined') {
          gsap.to(el, {
            x: (relX / rect.width) * strength,
            y: (relY / rect.height) * strength,
            duration: 0.3,
            ease: "power2.out"
          });

          gsap.to(cursorFollower, {
            left: rect.left + rect.width / 2 + 'px',
            top: rect.top + rect.height / 2 + 'px',
            width: rect.width + 10 + 'px',
            height: rect.height + 10 + 'px',
            borderRadius: window.getComputedStyle(el).borderRadius,
            duration: 0.2,
            overwrite: "auto"
          });
        }
      });

      el.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1.1, 0.4)"
          });

          gsap.to(cursorFollower, {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            duration: 0.3,
            overwrite: "auto",
            onComplete: () => {
              followerX = mouseX;
              followerY = mouseY;
              isMagneticLocked = false;
            }
          });
        }
      });
    });
  }

  /* ================= 4. SCROLL PROGRESS & SCROLLSPY ================= */
  const scrollProgressBar = document.getElementById('scrollProgress');
  const navbarElement = document.querySelector('.navbar');
  const navSpyLinks = document.querySelectorAll('.nav-link');
  const spySections = document.querySelectorAll('section[id]');
  
  let lastScrollTop = 0;
  const navbarHeight = 80;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 1. Scroll Progress Indicator
    if (scrollProgressBar) {
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (scrollTop / height) * 100 : 0;
      scrollProgressBar.style.width = scrolled + '%';
    }

    // 2. Hide / Reveal Navbar on Scroll
    if (navbarElement) {
      if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
        navbarElement.style.transform = 'translateY(-100%)';
      } else {
        navbarElement.style.transform = 'translateY(0)';
      }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // 3. ScrollSpy Navigation Link Active Highlighting
    let currentActiveSectionId = '';
    spySections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentActiveSectionId = section.getAttribute('id');
      }
    });

    if (currentActiveSectionId) {
      navSpyLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  /* ================= 5. GSAP SCROLLTRIGGER ANIMATION SYSTEM ================= */
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Entrance Sequence
    window.heroTl = gsap.timeline({ paused: true });
    window.heroTl.from(".badge-status", { opacity: 0, y: -20, duration: 0.8, ease: "power3.out" })
                 .from(".hero-text h1", { opacity: 0, y: 30, duration: 1, ease: "power3.out" }, "-=0.6")
                 .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.6")
                 .from(".hero-btns", { opacity: 0, y: 15, duration: 0.8, ease: "power3.out" }, "-=0.5")
                 .from(".hero-visual", { opacity: 0, scale: 0.95, duration: 1.2, ease: "power4.out" }, "-=0.9")
                 .from(".orbit-nodes .node", { opacity: 0, scale: 0, duration: 0.8, ease: "back.out(1.7)", stagger: 0.12 }, "-=0.5");

    // Bento Story Cards Staggered Entry
    gsap.from(".bento-card", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15
    });

    // Statistics Increment Counters
    const statNums = document.querySelectorAll('.stat-num');
    if (statNums.length > 0) {
      ScrollTrigger.create({
        trigger: ".bento-stats-box",
        start: "top 80%",
        onEnter: () => {
          statNums.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                num.innerText = Math.floor(obj.val);
              }
            });
          });
        }
      });
    }

    // Skills Grid Cards Reveal
    gsap.from(".skill-card-v2", {
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 75%",
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.06
    });

    // Project Cards Reveal
    const projectCards = document.querySelectorAll('.project-card-row');
    projectCards.forEach(card => {
      gsap.from(card.querySelector('.project-visual-side'), {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
        opacity: 0,
        x: card.classList.contains('reverse') ? 40 : -40,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.from(card.querySelector('.project-narrative-side'), {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
        opacity: 0,
        x: card.classList.contains('reverse') ? -40 : 40,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // Vertical Timeline track line filling
    gsap.to(".timeline-track-fill", {
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 40%",
        end: "bottom 60%",
        scrub: true
      },
      height: "100%",
      ease: "none"
    });

    // Vertical Timeline items trigger
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      gsap.from(item.querySelector('.timeline-card-content'), {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.from(item.querySelector('.timeline-dot-marker'), {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)"
      });
    });

    // Certifications Slider Entrance
    gsap.from(".certifications-swiper-container", {
      scrollTrigger: {
        trigger: ".certifications-slider",
        start: "top 75%",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out"
    });
  }

  /* ================= 6. INTERACTIVE 3D TILT EFFECT ================= */
  const elementsToTilt = document.querySelectorAll(".tilt");

  elementsToTilt.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rectBound = card.getBoundingClientRect();
      const inputX = e.clientX - rectBound.left;
      const inputY = e.clientY - rectBound.top;

      const degreeX = ((inputY - rectBound.height / 2) / (rectBound.height / 2)) * -5;
      const degreeY = ((inputX - rectBound.width / 2) / (rectBound.width / 2)) * 5;

      card.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg) scale(1.01)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  /* ================= 7. DYNAMIC PROJECTS CATEGORY FILTER ================= */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectEntries = document.querySelectorAll('.project-card-row');

  if (filterButtons.length > 0 && projectEntries.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const activeFilter = button.getAttribute('data-filter');

        projectEntries.forEach(entry => {
          const entryCategories = entry.getAttribute('data-category').split(' ');
          if (activeFilter === 'all' || entryCategories.includes(activeFilter)) {
            entry.classList.remove('hide');
          } else {
            entry.classList.add('hide');
          }
        });
      });
    });
  }

  /* ================= 8. DYNAMIC SKILLS CATEGORY FILTER ================= */
  const skillFilterBtns = document.querySelectorAll('.skills-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card-v2');

  if (skillFilterBtns.length > 0 && skillCards.length > 0) {
    skillFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        skillFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const activeFilter = btn.getAttribute('data-skill-filter');

        skillCards.forEach(card => {
          const cardCats = card.getAttribute('data-skill-cat').split(' ');
          if (activeFilter === 'all' || cardCats.includes(activeFilter)) {
            card.style.display = "flex";
            setTimeout(() => { 
              card.style.opacity = "1"; 
              card.style.transform = "scale(1)"; 
            }, 50);
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            setTimeout(() => { 
              card.style.display = "none"; 
            }, 250);
          }
        });
      });
    });
  }

  /* ================= 9. PROJECT CASE STUDY MODAL SYSTEM ================= */
  const projectCaseStudies = {
    zudio: {
      badge: "Concept Pilot · Full Stack",
      title: "ZUDIO Digital Commerce – Full-Stack E-Commerce Concept Pilot",
      desc: "An enterprise-grade omnichannel e-commerce platform integrating digital checkout with physical store inventory and order fulfillment.",
      overview: "ZUDIO Digital Commerce is an enterprise-grade digital retail platform designed to seamlessly bridge online e-commerce checkout with real-time physical store inventory, in-store reservations, and multi-channel fulfillment workflows.",
      problem: "Traditional fashion retail brands suffer from fragmented store inventories and detached digital warehouses. This causes phantom stockouts, duplicate inventory holding expenses, and lost in-store customer conversions.",
      solution: "Engineered an omnichannel architecture using Next.js 14 App Router, PostgreSQL, and Prisma ORM. Built store-level real-time inventory synchronization, in-store reserve-and-try capabilities, and automated Razorpay payment processing with secure webhook verification.",
      architecture: "Constructed with Next.js 14 Server Actions and API route handlers backed by PostgreSQL via Prisma ORM. Implemented Google OAuth authentication, role-based access control (RBAC), ACID-compliant atomic inventory updates with optimistic concurrency locking, audit logging, and automated GitHub Actions CI/CD deployment pipelines.",
      challenges: "Handling race conditions and inventory overselling during concurrent flash checkouts. Solved by implementing database transaction isolation levels with PostgreSQL row-level locks and optimistic concurrency tokens on stock balances.",
      techStack: ["Next.js 14", "React.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma ORM", "Razorpay API", "Google OAuth", "GitHub Actions"],
      type: "Full-Stack Web Platform",
      future: "Automated demand forecasting and multi-warehouse logistics optimization.",
      github: "https://github.com/Raccoon-UX",
      live: "#contact"
    },
    smarttransit: {
      badge: "Public Transit Platform",
      title: "SmartTransit OS – Intelligent Public Transportation Platform",
      desc: "Unified public transportation platform with role-based workflows for passengers, drivers, administrators, and security operations.",
      overview: "SmartTransit OS is an end-to-end intelligent transportation operating ecosystem designed to modernize municipal public transit. It delivers real-time bus tracking, automated route scheduling, live delay alerts, and passenger crowd monitoring without requiring proprietary hardware.",
      problem: "Commuters experience unpredictable wait times, route deviations, and congested buses due to lack of real-time GPS fleet visibility and disconnected transit administration systems.",
      solution: "Engineered a unified multi-role web platform. Drivers broadcast live geo-coordinates via mobile browser HTML5 Geolocation API, which is streamed via Socket.io tunnels to passenger maps rendered with Leaflet.js, while administrators monitor fleet telemetry in real time.",
      architecture: "Built using React.js, Node.js, Express.js, and MongoDB. Uses JWT authentication and Google OAuth for role-based access control across four portals (Passenger, Driver, Fleet Admin, Emergency/Security). Socket.io room clusters isolate location channels per bus line.",
      challenges: "Cellular network dropouts and location packet loss in dense metropolitan corridors. Solved through client-side offline coordinate buffering with LocalStorage FIFO queues and spatial map path interpolation (preventing bus jumping on reconnects).",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT", "Google OAuth", "Leaflet.js", "HTML5 Geolocation"],
      type: "Real-Time Transit Platform",
      future: "AI-driven schedule optimization based on historical municipal passenger density.",
      github: "https://github.com/Raccoon-UX/GuardianRoute-Transport-System-O",
      live: "https://raccoon-ux.github.io/GuardianRoute-Transport-System-O/"
    },
    verityai: {
      badge: "Hackathon Project · NMIMS GDG Cloud",
      title: "Verity AI – AI Auditing & Hallucination Detection",
      desc: "AI response verification platform evaluating LLM outputs for factual consistency and potential hallucinations.",
      overview: "Verity AI was developed during the NMIMS GDG Cloud Mumbai Hackathon to solve enterprise LLM hallucination risks. It intercepts generated output tokens, verifies claims against web and knowledge base indexes, and calculates reliability metrics.",
      problem: "Large Language Models frequently hallucinate plausible-sounding falsehoods, creating major regulatory, financial, and compliance risks when deployed in customer-facing applications.",
      solution: "Engineered an automated verification middleware pipeline. Incoming LLM outputs are decomposed into atomic factual claims using NLP tokenizers, cross-referenced in parallel against Google Cloud search endpoints, and scored using a custom mathematical evaluation matrix ('Gen Score', 0–100).",
      architecture: "Powered by Python NLP services and a Node.js/Express orchestration backend with MongoDB Atlas for audit session storage. Incorporates automated risk categorization, threshold alerts, and real-time verification status flags.",
      challenges: "Real-time fact checking creates latency bottlenecks. Mitigated by designing an asynchronous claim evaluation pipeline that streams LLM output instantly to the client while background worker threads evaluate and highlight factual consistency dynamically.",
      techStack: ["Python", "Node.js", "Express.js", "MongoDB Atlas", "Google Cloud API", "JWT", "NLP Tokenizers"],
      type: "AI Quality & Compliance Engine",
      future: "Integration with private enterprise vector databases and retrieval-augmented generation (RAG) benchmarks.",
      github: "https://github.com/Raccoon-UX/Verity-AI-GDG-Hackathon",
      live: "https://aryanubale7.github.io/verity-frontend/"
    }
  };

  const caseStudyModal = document.getElementById("caseStudyModal");
  const modalProjBadge = document.getElementById("modalProjBadge");
  const modalProjTitle = document.getElementById("modalProjTitle");
  const modalProjDesc = document.getElementById("modalProjDesc");
  const modalOverview = document.getElementById("modalOverview");
  const modalProblem = document.getElementById("modalProblem");
  const modalSolution = document.getElementById("modalSolution");
  const modalArchitecture = document.getElementById("modalArchitecture");
  const modalChallenges = document.getElementById("modalChallenges");
  const modalTechStack = document.getElementById("modalTechStack");
  const modalProjType = document.getElementById("modalProjType");
  const modalFuture = document.getElementById("modalFuture");
  const modalGithubLink = document.getElementById("modalGithubLink");
  const modalLiveLink = document.getElementById("modalLiveLink");
  const closeCaseBtn = document.querySelector(".modal-close-btn");
  const caseStudyButtons = document.querySelectorAll(".case-study-btn");

  if (caseStudyModal && caseStudyButtons.length > 0) {
    caseStudyButtons.forEach(btn => {
      btn.addEventListener("click", function() {
        const projectId = this.getAttribute("data-project");
        const data = projectCaseStudies[projectId];

        if (data) {
          modalProjBadge.innerText = data.badge;
          modalProjTitle.innerText = data.title;
          modalProjDesc.innerText = data.desc;
          modalOverview.innerText = data.overview;
          modalProblem.innerText = data.problem;
          modalSolution.innerText = data.solution;
          modalArchitecture.innerText = data.architecture;
          modalChallenges.innerText = data.challenges;
          modalProjType.innerText = data.type;
          modalFuture.innerText = data.future;
          
          modalGithubLink.href = data.github;
          modalLiveLink.href = data.live;

          modalTechStack.innerHTML = "";
          data.techStack.forEach(tech => {
            const tag = document.createElement("span");
            tag.innerText = tech;
            modalTechStack.appendChild(tag);
          });

          caseStudyModal.style.display = "flex";
          setTimeout(() => {
            caseStudyModal.classList.add("active");
            document.body.style.overflow = "hidden";
          }, 10);
        }
      });
    });

    const closeCaseStudy = () => {
      caseStudyModal.classList.remove("active");
      document.body.style.overflow = "";
      setTimeout(() => {
        caseStudyModal.style.display = "none";
      }, 350);
    };

    if (closeCaseBtn) {
      closeCaseBtn.addEventListener("click", closeCaseStudy);
    }

    caseStudyModal.addEventListener("click", function(e) {
      if (e.target === caseStudyModal) {
        closeCaseStudy();
      }
    });

    window.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && caseStudyModal.classList.contains("active")) {
        closeCaseStudy();
      }
    });
  }

  /* ================= 10. CERTIFICATE LIGHTBOX SYSTEM ================= */
  const lightboxModal = document.getElementById("lightboxModal");
  const modalImgContainer = document.getElementById("modalImageContainer");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const dismissBtn = document.querySelector(".dismiss-btn");
  const triggers = document.querySelectorAll(".view-trigger");

  if (triggers.length > 0 && lightboxModal) {
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        
        const innerImg = this.querySelector("img");
        const parentCard = this.closest(".carousel-card-wide, .timeline-item, .certificate-preview-box");
        const entryTitle = parentCard ? parentCard.querySelector("h3") : null;

        lightboxModal.style.display = "flex";
        setTimeout(() => { lightboxModal.classList.add("active"); }, 10);

        if (innerImg) {
          modalImgContainer.style.display = "block";
          modalImgContainer.src = innerImg.src;
        } else {
          modalImgContainer.style.display = "none";
        }

        if (entryTitle) {
          lightboxCaption.innerText = entryTitle.innerText;
        }
      });
    });
  }

  function closeLightboxArray() {
    if (lightboxModal) {
      lightboxModal.classList.remove("active");
      setTimeout(() => { lightboxModal.style.display = "none"; }, 300);
    }
  }

  if (dismissBtn) dismissBtn.onclick = closeLightboxArray;
  window.addEventListener("click", (e) => { if (e.target === lightboxModal) closeLightboxArray(); });

  /* ================= 11. SWIPER ACCREDITATION CAROUSEL ================= */
  if (typeof Swiper !== 'undefined') {
    new Swiper(".certifications-swiper-container", {
      slidesPerView: 1,
      spaceBetween: 25,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 25 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
      }
    });
  }

  /* ================= 12. GLOBAL SCROLL REVEALS ================= */
  const scrollingReveals = document.querySelectorAll(".reveal");

  function processScrollReveal() {
    scrollingReveals.forEach((element) => {
      const windowViewportHeight = window.innerHeight;
      const elementTopPosition = element.getBoundingClientRect().top;
      const injectionTriggerPoint = 60;

      if (elementTopPosition < windowViewportHeight - injectionTriggerPoint) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", processScrollReveal);
  processScrollReveal();

  /* ================= 13. ASYNCHRONOUS FORMSPREE ENGINE ================= */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      
      const formData = new FormData(contactForm);
      
      if (formStatus) {
        formStatus.style.color = "var(--text-muted)";
        formStatus.innerText = "Transmitting message payload...";
      }

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.style.color = "#16a34a";
            formStatus.innerText = "Transmission successful! Your message has been routed to Sujal's inbox.";
          }
          contactForm.reset();
        } else {
          const errorPayload = await response.json();
          if (formStatus) {
            formStatus.style.color = "#dc2626";
            formStatus.innerText = errorPayload.errors 
              ? errorPayload.errors.map(err => err.message).join(", ") 
              : "Oops! There was a problem sending your message.";
          }
        }
      } catch (error) {
        if (formStatus) {
          formStatus.style.color = "#dc2626";
          formStatus.innerText = "Network Error! Connection endpoint could not resolve submission parameters.";
        }
      }
    });
  }

  /* ================= 14. LENIS SMOOTH SCROLL ================= */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    if (typeof gsap !== 'undefined') {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ================= 15. THREE.JS GRAVITY GRID CANVAS (LIGHT MODE) ================= */
  const bgCanvas = document.getElementById("gravityGridCanvas");
  if (bgCanvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 180, 500);
    camera.lookAt(0, -30, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: bgCanvas,
      antialias: true,
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Light Mode Canvas Scene & Fog
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.0015);

    // GPU-Deformed Light Grid Shader Material
    const gridMaterial = new THREE.ShaderMaterial({
      transparent: true,
      fog: true,
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib['fog'],
        {
          uMouse: { value: new THREE.Vector3(10000, 0, 10000) },
          uRadius: { value: 240.0 },
          uDepth: { value: -60.0 },
          uGridColor: { value: new THREE.Color(0x2563eb) }, // Royal Blue
          uOpacity: { value: 0.14 }
        }
      ]),
      vertexShader: `
        #include <fog_pars_vertex>
        uniform vec3 uMouse;
        uniform float uRadius;
        uniform float uDepth;
        varying vec3 vWorldPosition;

        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          
          float dist = distance(worldPosition.xz, uMouse.xz);
          if (dist < uRadius) {
            float force = pow(1.0 - (dist / uRadius), 2.0);
            worldPosition.y += uDepth * force;
            
            vec2 dir = normalize(uMouse.xz - worldPosition.xz);
            worldPosition.xz += dir * force * 30.0;
          }
          
          vWorldPosition = worldPosition.xyz;
          vec4 mvPosition = viewMatrix * worldPosition;
          gl_Position = projectionMatrix * mvPosition;
          
          #include <fog_vertex>
        }
      `,
      fragmentShader: `
        #include <fog_pars_fragment>
        varying vec3 vWorldPosition;
        uniform vec3 uGridColor;
        uniform float uOpacity;

        void main() {
          float size = 60.0;
          float thickness = 1.2;
          
          float fx = abs(fract(vWorldPosition.x / size - 0.5) - 0.5) / (thickness / size);
          float fz = abs(fract(vWorldPosition.z / size - 0.5) - 0.5) / (thickness / size);
          float grid = min(fx, fz);
          float line = 1.0 - min(grid, 1.0);
          
          if (line < 0.05) discard;
          
          vec4 diffuseColor = vec4(uGridColor, uOpacity * line);
          gl_FragColor = diffuseColor;
          
          #include <fog_fragment>
        }
      `
    });

    const gridGeometry = new THREE.PlaneGeometry(2400, 2400, 45, 45);
    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.y = 0;
    scene.add(gridMesh);

    // Floating Background Elements
    const floatersGroup = new THREE.Group();
    scene.add(floatersGroup);

    const floaters = [];
    const floaterGeoms = [
      new THREE.BoxGeometry(20, 20, 20),
      new THREE.IcosahedronGeometry(12, 1),
      new THREE.RingGeometry(10, 15, 6)
    ];

    for (let i = 0; i < 15; i++) {
      const geom = floaterGeoms[Math.floor(Math.random() * floaterGeoms.length)];
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x2563eb : 0x4f46e5,
        wireframe: true,
        transparent: true,
        opacity: Math.random() * 0.12 + 0.05
      });
      
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 800,
        Math.random() * 200 - 50,
        (Math.random() - 0.5) * 800
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      
      const speed = {
        x: (Math.random() - 0.5) * 0.01,
        y: Math.random() * 0.15 + 0.04,
        rotX: (Math.random() - 0.5) * 0.005,
        rotY: (Math.random() - 0.5) * 0.005
      };

      floatersGroup.add(mesh);
      floaters.push({ mesh, speed });
    }

    // Mouse Intersect Updates
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    const currentMouse = new THREE.Vector3(10000, 0, 10000);
    const targetMouse = new THREE.Vector3(10000, 0, 10000);
    let targetCameraX = 0;
    let targetCameraY = 180;

    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      targetCameraX = (e.clientX / window.innerWidth - 0.5) * 60;
      targetCameraY = 180 + (e.clientY / window.innerHeight - 0.5) * 30;
    });

    window.addEventListener("mouseleave", () => {
      mouse.x = -1000;
      mouse.y = -1000;
      targetCameraX = 0;
      targetCameraY = 180;
    });

    function resizeBg() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", resizeBg);

    function animateBg() {
      requestAnimationFrame(animateBg);

      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, -30, 0);

      floaters.forEach(fl => {
        fl.mesh.position.y += fl.speed.y;
        fl.mesh.position.x += fl.speed.x;
        fl.mesh.rotation.x += fl.speed.rotX;
        fl.mesh.rotation.y += fl.speed.rotY;

        if (fl.mesh.position.y > 250) {
          fl.mesh.position.y = -100;
          fl.mesh.position.x = (Math.random() - 0.5) * 800;
        }
      });

      raycaster.setFromCamera(mouse, camera);
      const planeIntersect = new THREE.Vector3();
      raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), planeIntersect);

      if (mouse.x > -0.96 && mouse.x < 0.96) {
        targetMouse.copy(planeIntersect);
      } else {
        targetMouse.set(10000, 0, 10000);
      }
      currentMouse.lerp(targetMouse, 0.12);
      gridMaterial.uniforms.uMouse.value.copy(currentMouse);

      renderer.render(scene, camera);
    }
    animateBg();
  }

  /* ================= 16. THREE.JS HERO 3D STAGE ================= */
  const heroStage = document.getElementById("hero3dStage");
  if (heroStage && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 340 / 420, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(340, 420);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    heroStage.appendChild(renderer.domElement);

    function resizeHeroStage() {
      const rect = heroStage.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    }
    window.addEventListener("resize", resizeHeroStage);

    // Stage Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    // Hero Group
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // Wireframe Rings
    const ringGeom1 = new THREE.TorusGeometry(1.85, 0.015, 8, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.40
    });
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    heroGroup.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(2.05, 0.012, 8, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    heroGroup.add(ring2);

    // Orbiting Primitives
    const orbitCubeGeom = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    const orbitCubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x4f46e5,
      roughness: 0.2,
      metalness: 0.3,
      transparent: true,
      opacity: 0.85
    });
    const orbitCube = new THREE.Mesh(orbitCubeGeom, orbitCubeMat);
    heroGroup.add(orbitCube);

    const orbitSphereGeom = new THREE.IcosahedronGeometry(0.14, 1);
    const orbitSphereMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true
    });
    const orbitSphere = new THREE.Mesh(orbitSphereGeom, orbitSphereMat);
    heroGroup.add(orbitSphere);

    // Mouse Tilt Coordination
    let targetRotX = 0;
    let targetRotY = 0;

    window.addEventListener("mousemove", (e) => {
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      targetRotX = ny * 0.35;
      targetRotY = nx * 0.35;

      if (typeof gsap !== 'undefined') {
        gsap.to(".hero-profile-image-container", {
          rotateX: ny * -20,
          rotateY: nx * 20,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });

    window.addEventListener("mouseleave", () => {
      targetRotX = 0;
      targetRotY = 0;
      if (typeof gsap !== 'undefined') {
        gsap.to(".hero-profile-image-container", {
          rotateX: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto"
        });
      }
    });

    let clock = 0;
    function animateHeroStage() {
      requestAnimationFrame(animateHeroStage);

      clock += 0.01;

      heroGroup.rotation.x += (targetRotX - heroGroup.rotation.x) * 0.08;
      heroGroup.rotation.y += (targetRotY - heroGroup.rotation.y) * 0.08;

      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.002;

      orbitCube.position.x = Math.sin(clock * 1.5) * 1.8;
      orbitCube.position.y = Math.cos(clock * 1.5) * 1.3;
      orbitCube.position.z = Math.sin(clock * 1.5) * 0.5;
      orbitCube.rotation.x += 0.01;
      orbitCube.rotation.y += 0.015;

      orbitSphere.position.x = Math.cos(clock) * 2.1;
      orbitSphere.position.y = Math.sin(clock) * 1.5;
      orbitSphere.position.z = Math.cos(clock * 0.5) * 0.6;
      orbitSphere.rotation.x -= 0.01;

      renderer.render(scene, camera);
    }
    animateHeroStage();
  }
});