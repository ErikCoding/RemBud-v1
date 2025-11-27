// ========================================
// MOBILE MENU TOGGLE FUNCTIONALITY
// ========================================
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navMenu = document.querySelector(".nav-menu")

if (mobileMenuToggle && navMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active")
    navMenu.classList.toggle("active")
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : ""
  })

  // Close menu when clicking on a nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active")
      navMenu.classList.remove("active")
      document.body.style.overflow = ""
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove("active")
      navMenu.classList.remove("active")
      document.body.style.overflow = ""
    }
  })
}

// ========================================
// SMOOTH SCROLL & ACTIVE NAV LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
        updateActiveNavLink(href)
      }
    }
  })
})

function updateActiveNavLink(targetId) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
  })
  const activeLink = document.querySelector(`.nav-link[href="${targetId}"]`)
  if (activeLink) {
    activeLink.classList.add("active")
  }
}

// ========================================
// NAVBAR BACKGROUND ON SCROLL
// ========================================
const navbar = document.querySelector(".navbar")
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// ========================================
// ENHANCED INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -80px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target
      const delay = element.dataset.delay || 0

      setTimeout(() => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, delay)

      observer.unobserve(element)
    }
  })
}, observerOptions)

document.querySelectorAll(".spec-card").forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  card.dataset.delay = index * 100
  observer.observe(card)
})

document.querySelectorAll(".why-item").forEach((item, index) => {
  item.dataset.delay = index * 150
  observer.observe(item)
})

document.querySelectorAll("section h2").forEach((heading) => {
  observer.observe(heading)
})

// ========================================
// PARALLAX EFFECT ON SCROLL
// ========================================
const parallaxElements = document.querySelectorAll("[data-parallax]")
if (parallaxElements.length > 0) {
  window.addEventListener("scroll", () => {
    parallaxElements.forEach((element) => {
      const scrollPosition = window.pageYOffset
      const elementOffset = element.offsetTop
      const distance = scrollPosition - elementOffset
      element.style.backgroundPosition = `center ${distance * 0.5}px`
    })
  })
}

const heroSection = document.querySelector(".hero")
if (heroSection) {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroOffset = heroSection.offsetTop
    const distance = scrolled - heroOffset

    if (Math.abs(distance) < window.innerHeight) {
      const parallaxSpeed = distance * 0.3
      heroSection.style.transform = `translateY(${parallaxSpeed}px)`
    }
  })
}

// ========================================
// FORM VALIDATION & SUBMISSION WITH ANIMATION
// ========================================
const contactForm = document.querySelector(".kontakt-form")
if (contactForm) {
  const inputs = contactForm.querySelectorAll("input, textarea")
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.transform = "scale(1.02)"
    })

    input.addEventListener("blur", function () {
      this.style.transform = "scale(1)"
    })
  })

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputs = contactForm.querySelectorAll("input, textarea")
    let isValid = true

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false
        input.style.borderColor = "#ff6b6b"
        input.style.animation = "shake 0.5s"
        setTimeout(() => {
          input.style.animation = ""
        }, 500)
      } else {
        input.style.borderColor = ""
      }

      // Email validation
      if (input.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(input.value)) {
          isValid = false
          input.style.borderColor = "#ff6b6b"
          input.style.animation = "shake 0.5s"
          setTimeout(() => {
            input.style.animation = ""
          }, 500)
        }
      }

      // Phone validation
      if (input.type === "tel") {
        const phoneRegex = /^[\d\s\-+()]{9,}$/
        if (!phoneRegex.test(input.value)) {
          isValid = false
          input.style.borderColor = "#ff6b6b"
          input.style.animation = "shake 0.5s"
          setTimeout(() => {
            input.style.animation = ""
          }, 500)
        }
      }
    })

    if (isValid) {
      const submitBtn = contactForm.querySelector(".submit-btn")
      submitBtn.style.transform = "scale(0.95)"
      submitBtn.textContent = "✓ Wysłano!"

      setTimeout(() => {
        alert("Dziękujemy za wiadomość! Skontaktujemy się wkrótce.")
        contactForm.reset()
        inputs.forEach((input) => {
          input.style.borderColor = ""
        })
        submitBtn.textContent = "Wyślij zapytanie"
        submitBtn.style.transform = ""
      }, 1000)
    } else {
      alert("Proszę sprawdzić poprawność danych.")
    }
  })
}

// ========================================
// CTA BUTTON SCROLL TO CONTACT
// ========================================
const ctaButton = document.querySelector(".cta-button")
if (ctaButton) {
  ctaButton.addEventListener("click", () => {
    document.querySelector("#kontakt").scrollIntoView({ behavior: "smooth" })
    updateActiveNavLink("#kontakt")
  })
}

// ========================================
// UPDATE ACTIVE NAV LINK ON SCROLL
// ========================================
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section[id]")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// ========================================
// PORTFOLIO IMAGE LAZY LOADING WITH ANIMATION
// ========================================
const portfolioImages = document.querySelectorAll(".portfolio-image")
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target
        image.style.opacity = "1"
        image.style.transform = "scale(1)"
        imageObserver.unobserve(image)
      }
    })
  })

  portfolioImages.forEach((img) => {
    img.style.opacity = "0"
    img.style.transform = "scale(0.9)"
    img.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
    imageObserver.observe(img)
  })
}

// ========================================
// CURSOR ANIMATION
// ========================================
let mouseX = 0,
  mouseY = 0
let cursorX = 0,
  cursorY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

function animateCursor() {
  const speed = 0.15
  cursorX += (mouseX - cursorX) * speed
  cursorY += (mouseY - cursorY) * speed
  requestAnimationFrame(animateCursor)
}
animateCursor()

// ========================================
// SCROLL PROGRESS BAR
// ========================================
window.addEventListener("scroll", () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (winScroll / height) * 100

  // Create progress bar if it doesn't exist
  let progressBar = document.querySelector(".scroll-progress")
  if (!progressBar) {
    progressBar = document.createElement("div")
    progressBar.className = "scroll-progress"
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6, #c0c0c0);
      z-index: 9999;
      transition: width 0.1s ease-out;
    `
    document.body.appendChild(progressBar)
  }
  progressBar.style.width = scrolled + "%"
})

// ========================================
// SPEC CARD AND TESTIMONIAL HOVER EFFECTS
// ========================================
document.querySelectorAll(".spec-card, .testimonial").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = ""
  })
})

// ========================================
// PORTFOLIO ITEM AND TESTIMONIAL REVEAL ANIMATION
// ========================================
const revealElements = document.querySelectorAll(".portfolio-item, .testimonial")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0) scale(1)"
        }, index * 100)
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1 },
)

revealElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px) scale(0.95)"
  el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
  revealObserver.observe(el)
})

// ========================================
// SHAKE ANIMATION KEYFRAMES
// ========================================
const style = document.createElement("style")
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`
document.head.appendChild(style)

console.log("[v0] Enhanced animations loaded successfully! 🎨")
