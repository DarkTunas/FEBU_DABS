// Menú y navegación
let menu = document.querySelector("#icono-menu");
let navegacion = document.querySelector(".navegacion");

menu.addEventListener("click", function() {
    navegacion.classList.toggle("active");
});

window.onscroll = () => {
    navegacion.classList.remove("active");
};
// Fin Menú y navegación

// Obtener todos los botones "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.product-grid__btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const cartTotalElement = document.getElementById('cart-total');
const closeModalButton = document.querySelector('.jsModalClose');
const cartLink = document.getElementById('cart-link'); // Enlace del carrito

let cart = [];

// Función para abrir el modal
function openModal() {
    const modal = document.getElementById('jsModalCarrito');
    modal.classList.add('active');
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('jsModalCarrito');
    modal.classList.remove('active');
}

// Función para agregar un producto al carrito
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    openModal();
}

// Función para actualizar la interfaz del carrito
function updateCartUI() {
    cartItemsContainer.innerHTML = ''; // Limpiar el contenedor
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.classList.add('modal__item');
        
        cartItem.innerHTML = `
            <div class="modal__thumb">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="modal__text-product">
                <p>${item.name} x${item.quantity}</p>
                <p><strong>$${(item.price * item.quantity).toFixed(2)}</strong></p>
                <button class="remove-btn" data-name="${item.name}">Eliminar</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    cartTotalElement.textContent = `$${subtotal.toFixed(2)}`;

    // Asignar evento a los botones de eliminar
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(event) {
    const productName = event.target.getAttribute('data-name');
    
    cart = cart.filter(item => item.name !== productName);
    
    updateCartUI();
}

// Añadir eventos a los botones "Agregar al carrito"
addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productElement = event.target.closest('.product-grid__item');
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));
        const productImage = productElement.getAttribute('data-image');
        
        const product = {
            name: productName,
            price: productPrice,
            image: productImage
        };
        
        addToCart(product);
    });
});

// Cerrar el modal cuando se haga clic en el botón "Cerrar"
closeModalButton.addEventListener('click', closeModal);

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', function(event) {
    const modal = document.getElementById("jsModalCarrito");
    const contactModal = document.getElementById("miModal");

    if (modal.classList.contains('active') && event.target === modal) {
        closeModal();
    }

    if (contactModal.style.display === "block" && event.target === contactModal) {
        closeModal(); // Cambiar a cerrarModal()
    }
});

// Contacto
function abrirModal() {
    document.getElementById("miModal").style.display = "block";
}

function cerrarModal() {
    document.getElementById("miModal").style.display = "none";
}

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById("miModal");
    if (event.target === modal) {
        cerrarModal();
    }
};
// Fin Contacto

// Añadir evento click para abrir el modal del carrito
cartLink.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace redirija o recargue la página
    openModal(); // Llama a la función para abrir el modal del carrito
});

// Botón ver más
document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll('.product-grid__item');
    const loadMoreButton = document.getElementById('loadMore');
    const productsPerPage = 4;
    let currentIndex = 8; // Muestra inicialmente 8 productos

    // Oculta todos los productos
    products.forEach((product, index) => {
        if (index >= currentIndex) {
            product.style.display = 'none';
        }
    });

    // Evento para el botón "ver más"
    loadMoreButton.addEventListener('click', () => {
        let newCount = currentIndex + productsPerPage;

        // Muestra los siguientes productos
        for (let i = currentIndex; i < newCount && i < products.length; i++) {
            products[i].style.display = 'block';
        }

        currentIndex = newCount;

        // Si no hay más productos, oculta el botón
        if (currentIndex >= products.length) {
            loadMoreButton.style.display = 'none';
        }
    });
});

//Simulacion de inicio de sesion y pago
