//Menu y navegacion
let menu = document.querySelector("#icono-menu");
let navegacion = document.querySelector(".navegacion");

menu.addEventListener("click", function(){
    navegacion.classList.toggle("active");
});

window.onscroll = () => {
    navegacion.classList.remove("active")
}
//Fin Menu y Navegacion

// Obtener todos los botones "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.product-grid__btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const cartTotalElement = document.getElementById('cart-total');
const closeModalButton = document.querySelector('.jsModalClose');

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
    // Verificar si el producto ya está en el carrito
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
    const modal = document.getElementById("jsModalCarrito"); // Modal del carrito
    const contactModal = document.getElementById("miModal"); // Modal de contacto

    // Verifica si el clic fue fuera del modal del carrito
    if (modal.classList.contains('active') && event.target === modal) {
        closeModal();
    }
    
    // Verifica si el clic fue fuera del modal de contacto
    if (contactModal.style.display === "block" && event.target === contactModal) {
        cerrarModal();
    }
});

//Quedar quieto al apretar el boton de agregar al carrito
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los botones de agregar al carrito
    const addToCartButtons = document.querySelectorAll('.js-add-to-cart');

    // Agrega el evento click a cada botón
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Evita que el enlace redirija o recargue la página

            // Aquí puedes añadir la lógica para agregar el producto al carrito
            const productItem = this.closest('.product-grid__item');
            const productName = productItem.getAttribute('data-name');
            const productPrice = productItem.getAttribute('data-price');
            const productImage = productItem.getAttribute('data-image');

            // Lógica para agregar el producto al carrito
            console.log(`Producto añadido: ${productName} - Precio: $${productPrice}`);
            // Aquí puedes añadir más lógica, como actualizar el carrito o mostrar un modal.
        });
    });
});



//Contactanos
function abrirModal() {
    document.getElementById("miModal").style.display = "block";
}

function cerrarModal() {
    document.getElementById("miModal").style.display = "none";
}

  // Cerrar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById("miModal");
    if (event.target == modal) {
    modal.style.display = "none";
    }
}
//Fin Contactanos
