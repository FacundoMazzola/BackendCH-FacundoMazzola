const socket = io();
const container = document.getElementById('productsContainer');

socket.on('productsUpdated', products => {
    container.innerHTML = '';
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${p.image}">
            <h3>${p.title}</h3>
            <p>$ ${p.price}</p>
            <button onclick="deleteProduct('${p.id}')">Eliminar</button>
        `;
        container.appendChild(div);
    });
});

document.getElementById('productForm').addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    socket.emit('newProduct', data);
    e.target.reset();
});

function deleteProduct(id) {
    socket.emit('deleteProduct', id);
}


