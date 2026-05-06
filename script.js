// document.addEventListener("DOMContentLoaded", () => {
//   const hamburger = document.getElementById("hamburger");
//   const navMenu = document.getElementById("nav-menu");

//   // Toggle menu avec animation
//   hamburger.addEventListener("click", (event) => {
//     event.stopPropagation();

//     if (navMenu.classList.contains("hidden")) {
//       navMenu.classList.remove("hidden");
//       // animation ouverture
//       navMenu.classList.remove("opacity-0", "scale-y-0");
//       navMenu.classList.add("opacity-100", "scale-y-100");
//     } else {
//       // animation fermeture
//       navMenu.classList.remove("opacity-100", "scale-y-100");
//       navMenu.classList.add("opacity-0", "scale-y-0");
//       // attendre la fin de l’animation avant de cacher
//       setTimeout(() => navMenu.classList.add("hidden"), 300);
//     }
//   });

//   // Fermer si clic en dehors
//   document.addEventListener("click", (event) => {
//     const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
//     if (!isClickInside && !navMenu.classList.contains("hidden")) {
//       navMenu.classList.remove("opacity-100", "scale-y-100");
//       navMenu.classList.add("opacity-0", "scale-y-0");
//       setTimeout(() => navMenu.classList.add("hidden"), 300);
//     }
//   });
// });

{/* <script>
  const slider = document.getElementById("testimonialSlider");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;
  const totalSlides = 3;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.remove("bg-gray-500");
      dot.classList.add("bg-gray-300");

      if (index === currentSlide) {
        dot.classList.remove("bg-gray-300");
        dot.classList.add("bg-gray-500");
      }
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }, 4000);
</script> */}

{/* <script>
const slider = document.getElementById("slider");
let index = 0;

function getItemsPerView() {
  if (window.innerWidth >= 1024) return 3; // desktop
  if (window.innerWidth >= 768) return 2;  // tablet
  return 1; // mobile
}

function updateSlider() {
  const itemsPerView = getItemsPerView();
  const totalItems = slider.children.length;

  const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;

  if (index > maxIndex) index = 0;

  slider.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(() => {
  index++;
  updateSlider();
}, 3000);

window.addEventListener("resize", updateSlider);
</script> */}