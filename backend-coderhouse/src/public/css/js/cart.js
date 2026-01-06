let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCounter() {
    const counter = document.getElementById('cartCount');
    if (counter) counter.innerText = cart.length;
}

updateCounter();

function addToCart(id) {
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '/cart';
}

function removeFromCart(id) {
    cart = cart.filter(pid => pid !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

async function renderCart() {
    const container = document.getElementById('cartContainer');
    if (!container) return;

    const res = await fetch('/api/products');
    const products = await res.json();

    const items = products.filter(p => cart.includes(p.id));

    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<p style="text-align:center">El carrito está vacío</p>';
        return;
    }

    items.forEach(p => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${p.image}">
            <h3>${p.title}</h3>
            <p class="price">$ ${p.price}</p>
            <button class="delete" onclick="removeFromCart('${p.id}')">Eliminar</button>
        `;
        container.appendChild(div);
    });
}

function finalizarCompra() {
    alert('Compra realizada con éxito');
    localStorage.removeItem('cart');
    location.reload();
}

renderCart();



