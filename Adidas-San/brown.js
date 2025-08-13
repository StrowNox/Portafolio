document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtiene los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const zapatoId = urlParams.get('selected'); // 'samba-negro'

    // 2. Si encuentra un ID en la URL...
    if (zapatoId) {
        // ... busca el enlace con ese mismo data-id y le añade la clase
        const enlaceSeleccionado = document.querySelector(`a[data-id="${zapatoId}"]`);
        if (enlaceSeleccionado) {
            enlaceSeleccionado.classList.add('selected');
        }
    }
});










document.addEventListener('DOMContentLoaded', () => {
    const botonesTalla = document.querySelectorAll('.boton-talla');
    const botonAnadirBolsa = document.getElementById('botonAnadirBolsa');
    const notificacion = document.getElementById('notificacion');
    const contadorCarrito = document.getElementById('contador-carrito');
    let tallaSeleccionada = null;

    // Función para actualizar el contador del carrito
    function actualizarContadorCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

        if (totalItems > 0) {
            contadorCarrito.textContent = totalItems;
            contadorCarrito.style.display = 'block';
        } else {
            contadorCarrito.textContent = '0';
            contadorCarrito.style.display = 'none';
        }
    }

    // Inicializar el contador al cargar la página
    actualizarContadorCarrito();

    // Manejar la selección de talla
    botonesTalla.forEach(boton => {
        boton.addEventListener('click', () => {
            if (!boton.classList.contains('deshabilitado')) {
                botonesTalla.forEach(btn => btn.classList.remove('seleccionado'));
                boton.classList.add('seleccionado');
                tallaSeleccionada = boton.dataset.talla;
                console.log('Talla seleccionada:', tallaSeleccionada);
            }
        });
    });

    // Manejar el clic del botón "Añadir a la bolsa"
    botonAnadirBolsa.addEventListener('click', () => {
        if (tallaSeleccionada) {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            // ✅ Parte 1: Guardar la URL actual para el enlace "Continuar comprando"
            const currentPageUrl = window.location.href;
            localStorage.setItem('lastProductPage', currentPageUrl);

            // ✅ Parte 2: Simular un producto (modifica esto para cada página de zapato)
            const nombreProducto = 'SAMBA OG SHOES - Brown'; // <-- CAMBIA ESTO (ej. 'SAMBA OG SHOES - Brown')
            const imagenProducto = 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/e4eb90957602481782bbc742c620d1d5_9366/Samba_OG_Shoes_Brown_IG1357_01_standard.jpg'; // <-- CAMBIA ESTO

            const productoAAgregar = {
                // Genera un ID único para cada modelo y talla
                id: nombreProducto.toLowerCase().replace(/ /g, '-') + '-' + tallaSeleccionada.replace(/\s*\/\s*/g, '-').toLowerCase().replace(/\./g, ''),
                nombre: nombreProducto,
                talla: tallaSeleccionada,
                precio: 100, // Precio del producto
                cantidad: 1,
                imagen: imagenProducto
            };

            const productoExistenteIndex = carrito.findIndex(item => item.id === productoAAgregar.id);

            if (productoExistenteIndex > -1) {
                carrito[productoExistenteIndex].cantidad += 1;
            } else {
                carrito.push(productoAAgregar);
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarContadorCarrito(); // Actualiza el contador en la página actual

            notificacion.classList.add('mostrar');
            setTimeout(() => {
                notificacion.classList.remove('mostrar');
            }, 3000);

            console.log('Producto añadido al carrito:', productoAAgregar);
        } else {
            alert('Por favor, selecciona una talla antes de añadir a la bolsa.');
        }
    });
});