const socket = io();
const list = document.getElementById('list');
const form = document.getElementById('form');

socket.on('productsUpdated', products => {
    list.innerHTML = '';
    products.forEach(p => {
        list.innerHTML += `<li>${p.title} - $${p.price}</li>`;
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    socket.emit('newProduct', data);
    form.reset();
});
