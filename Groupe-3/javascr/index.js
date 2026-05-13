document.addEventListener("DOMContentLoaded", () => {

  // ---- PARTICLES ----
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.15 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    }

    drawParticles();
  }

  // ---- TYPED TEXT ----
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const words = ['Bakary gassama', 'Developer', 'Designer'];
    let wi = 0, ci = 0, deleting = false;

    function type() {
      const word = words[wi];

      if (!deleting) {
        typedEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typedEl.textContent = word.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      }

      setTimeout(type, deleting ? 60 : 100);
    }

    setTimeout(type, 800);
  }

  // ---- MOBILE MENU ----
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // ---- PORTFOLIO FILTER ----
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('underline', 'text-primary'));
      btn.classList.add('underline', 'text-primary');

      const f = btn.dataset.filter;

      document.querySelectorAll('.port-item').forEach(item => {
        const cat = item.dataset.cat || '';
        item.style.display = (f === 'all' || cat.includes(f)) ? 'block' : 'none';
      });
    });
  });

  // ---- TESTIMONIALS ----
  const dots = document.querySelectorAll('.testi-dot');

  if (dots.length) {
    const avatar = document.querySelector('#testi-avatar img');
    const name = document.getElementById('testi-name');
    const role = document.getElementById('testi-role');
    const text = document.querySelector('#testi-active p');

    const testiData = [
      {
        name: 'Alex Smith',
        role: 'Envato Customer',
        img: './image1/1 (1).jpg',
        text: "Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        name: 'Alex Smith',
        role: 'Envato Customer',
        img: './image1/new image1.jpg',
        text: "Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        name: 'Alex Smith',
        role: 'Envato Customer',
        img: './image1/new image2.jpg',
        text: "Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      }
    ];

    let testiCurrent = 0;

    function showTestimonial(i) {
      const t = testiData[i];

      document.getElementById('testi-active').classList.add('opacity-0');

      setTimeout(() => {
        avatar.src = t.img;
        name.textContent = t.name;
        role.textContent = t.role;
        text.textContent = t.text;

        document.getElementById('testi-active').classList.remove('opacity-0');
      }, 300);

      dots.forEach(d => d.classList.remove('bg-primary'));
      dots[i].classList.add('bg-primary');

      testiCurrent = i;
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        showTestimonial(parseInt(dot.dataset.idx));
      });
    });

    setInterval(() => {
      let next = (testiCurrent + 1) % testiData.length;
      showTestimonial(next);
    }, 4000);
  }

  // ---- COUNTER ----
  const counters = document.querySelectorAll('.counter-num');

  if (counters.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.dataset.target;
          let cur = 0;

          const step = target / 60;

          const timer = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = Math.round(cur);
            if (cur >= target) clearInterval(timer);
          }, 25);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }

  // ---- BLOG SLIDER ----
  const slider = document.getElementById("blog-slider");
  const cards = document.querySelectorAll(".blog-card");
  const dotsContainer = document.getElementById("blog-dots");

  if (slider && cards.length && dotsContainer) {

    let blogCurrent = 0;

    function getVisibleCount() {
      return window.innerWidth < 768 ? 1 : 3;
    }

    function renderDots() {
      const visible = getVisibleCount();
      const totalSlides = Math.ceil(cards.length / visible);

      dotsContainer.innerHTML = "";

      for (let i = 0; i < totalSlides; i++) {
        const btn = document.createElement("button");
        btn.className = "dot w-3 h-3 rounded-full bg-gray-300";

        btn.addEventListener("click", () => {
          blogCurrent = i;
          updateSlider();
        });

        dotsContainer.appendChild(btn);
      }
    }

    function updateSlider() {
      const visible = getVisibleCount();
      const offset = blogCurrent * (100 / visible);

      slider.style.transform = `translateX(-${offset}%)`;

      document.querySelectorAll("#blog-dots .dot").forEach(d => d.classList.remove("bg-black"));
      document.querySelectorAll("#blog-dots .dot")[blogCurrent]?.classList.add("bg-black");
    }

    function initSlider() {
      renderDots();
      updateSlider();
    }

    window.addEventListener("resize", () => {
      blogCurrent = 0;
      initSlider();
    });

    initSlider();
  }

  // ---- SKILLS (fix double DOMContentLoaded) ----
  const skills = document.querySelectorAll(".skill-fill");
  skills.forEach((skill) => {
    const width = skill.getAttribute("data-width");
    skill.style.width = width;
  });

function setWhite() {
  const navLinks = document.querySelectorAll(".navbar");
  navLinks.forEach(link => {
    link.classList.remove("text-black/80");
    link.classList.add("text-white");
  });

  logo.classList.remove("text-black");
  logo.classList.add("text-black");

  burger.classList.remove("text-black");
  burger.classList.add("text-white");
}

function setBlack() {
  const navLinks = document.querySelectorAll(".navbar");
  navLinks.forEach(link => {
    link.classList.remove("text-white");
    link.classList.add("text-black/80");
  });

  logo.classList.remove("text-white");
  logo.classList.add("text-black");

  burger.classList.remove("text-white");
  burger.classList.add("text-black");
}
window.addEventListener("scroll", () => {
const firstSection = document.querySelector("#navbar");
  const sectionHeight = firstSection.offsetHeight;

  if (window.scrollY < sectionHeight - 50) {
    setWhite();
  } else {
    setBlack();
  }

});
// état initial
const firstSection = document.querySelector("#navbar");

if (window.scrollY < firstSection.offsetHeight - 50) {
  setWhite();
} else {
  setBlack();
}


});