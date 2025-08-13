        document.addEventListener("DOMContentLoaded", function () {
            const lightbox = document.getElementById("lightbox");
            const lightboxImg = document.getElementById("lightbox-img");
            const closeBtn = document.querySelector(".lightbox .close");

            document.querySelectorAll(".portfolio-item img").forEach(img => {
                img.addEventListener("click", () => {
                    lightbox.style.display = "flex";
                    lightboxImg.src = img.getAttribute("data-full");
                });
            });

            closeBtn.addEventListener("click", () => {
                lightbox.style.display = "none";
            });

            lightbox.addEventListener("click", (e) => {
                if (e.target === lightbox) {
                    lightbox.style.display = "none";
                }
            });
        });