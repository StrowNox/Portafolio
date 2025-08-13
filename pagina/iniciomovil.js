document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.getElementById("toggleMenu");
  const closeMenu = document.getElementById("closeMenu");
  const menu = document.getElementById("menu");
  const toggles = document.querySelectorAll(".dropdown-toggle");

  let menuAbierto = false;

  function abrirMenu() {
    menu.classList.add("show");
    toggleMenu.classList.add("active");
    menuAbierto = true;
  }

  function cerrarMenu() {
    // Agrega una clase que solo remueve visibilidad pero permite transición
    menu.style.opacity = "0";
    menu.style.pointerEvents = "none";
    menu.style.width = "0";

    toggleMenu.classList.remove("active");

    setTimeout(() => {
      menu.classList.remove("show");
      menu.style = ""; // limpia el style inline para que la próxima vez funcione con clases
      menuAbierto = false;
    }, 1000); // coincide con el transition de 0.3s
  }

  toggleMenu.addEventListener("click", () => {
    if (menuAbierto) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  });

  closeMenu.addEventListener("click", cerrarMenu);

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const dropdown = toggle.parentElement;
      const dropdown2 = toggle.parentElement;
      const submenu = dropdown.querySelector(".dropdown-menu");

      const isOpen = dropdown.classList.contains("open");

      document.querySelectorAll(".dropdown.open").forEach(openItem => {
        openItem.classList.remove("open");
        openItem.querySelector(".dropdown-menu").style.maxHeight = null;
      });

      if (!isOpen) {
        dropdown.classList.add("open");
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      }
    });
  });
});



document.addEventListener('DOMContentLoaded', () => {
            const track = document.querySelector('.carrusel-track');
            const totalImages = document.querySelectorAll('.carrusel-imagen').length;
            let currentIndex = 0;

            function nextImage() {
                currentIndex = (currentIndex + 1) % totalImages;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            }

            setInterval(nextImage, 2000);
        });