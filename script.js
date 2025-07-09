const productosContainer = document.getElementById('productos-container');
const carritoContainer = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const cartCount = document.getElementById('cart-count');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// ✅ Tus productos definidos a mano
let listaProductos = [
  {
    id: 1,
    title: 'Camiseta River Plate 23/24',
    price: 25000,
    image: 'imagenesUsadas/camiseta.jpg'
  },
  {
    id: 2,
    title: 'Pelota Adidas Copa Mundial',
    price: 18000,
    image: 'imagenesUsadas/pelota.jpg'
  },
  {
    id: 3,
    title: 'Botines Nike Tiempo Legend',
    price: 40000,
    image: 'imagenesUsadas/botines.jpg'
  },
  {
    id: 4,
    title: 'Guantes de arquero Puma',
    price: 15000,
    image: 'imagenesUsadas/guantes.jpg'
  }
];

renderizarProductos(listaProductos);

function renderizarProductos(productos) {
  productosContainer.innerHTML = ''; // Limpia antes de renderizar

  productos.forEach(producto => {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-4');
    col.innerHTML = `
      <div class="card h-100">
        <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.title}</h5>
          <p class="card-text">$${producto.price}</p>
          <button class="btn btn-success mt-auto agregar-btn" data-id="${producto.id}">Agregar al carrito</button>
        </div>
      </div>
    `;
    productosContainer.appendChild(col);
  });

  // Agregar eventos a los botones ya renderizados
  document.querySelectorAll('.agregar-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const producto = listaProductos.find(p => p.id === id);
      if (producto) {
        agregarAlCarrito(producto);
      } else {
        console.error('Producto no encontrado con ID:', id);
      }
    });
  });

  actualizarCarrito();
}

function agregarAlCarrito(producto) {
  const existente = carrito.find(p => p.id === producto.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  guardarYActualizarCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarYActualizarCarrito();
}

function guardarYActualizarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function actualizarCarrito() {
  carritoContainer.innerHTML = '';
  let total = 0;
  let count = 0;
  carrito.forEach(p => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span>${p.title} (x${p.cantidad})</span>
      <div>
        <span>$${(p.price * p.cantidad).toFixed(2)}</span>
        <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito(${p.id})">✕</button>
      </div>
    `;
    carritoContainer.appendChild(li);
    total += p.price * p.cantidad;
    count += p.cantidad;
  });
  totalCarrito.textContent = total.toFixed(2);
  cartCount.textContent = count;
}

// Validación del formulario
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
    alert('Por favor completa todos los campos correctamente.');
  } else {
    alert('Mensaje enviado correctamente.');
  }
  form.classList.add('was-validated');
});
