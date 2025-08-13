const wrapper = document.getElementById('sliderWrapper');
    const totalSlides = wrapper.children.length;
    let index = 0;

    setInterval(() => {
    index = (index + 1) % totalSlides;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
}, 4000);


// ------------------------------------------  PARA QUE LA IMAGEN CAMBIE ------------------------------------------




const main = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumbnails img');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // cambia imagen principal
        main.src = thumb.dataset.full;
        // estado visual de miniaturas
        thumbs.forEach(t => t.classList.remove('selected'));
        thumb.classList.add('selected');
      });
    });







// ------------------------------------------  Selección de talla   ------------------------------------------


const botonesTalla = document.querySelectorAll(".tallas button:not(:disabled)");
let tallaSeleccionada = null;

botonesTalla.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesTalla.forEach(b => b.classList.remove("seleccionada"));
    boton.classList.add("seleccionada");
    tallaSeleccionada = boton.textContent;
  });
});

// Función para agregar al carrito
function agregarAlCarrito() {
  if (!tallaSeleccionada) {
    alert("Por favor, selecciona una talla.");
  } else {
    alert("Agregado al carrito: Talla " + tallaSeleccionada);
    // Aquí podrías enviar la talla seleccionada al backend
  }
}



// ------------------------------------------  Función para mostrar/ocultar acordeón ------------------------------------------




function toggleAccordion(button) {
  button.classList.toggle("active");
  const content = button.nextElementSibling;

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}
