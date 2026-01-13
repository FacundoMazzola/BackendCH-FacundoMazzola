const CART_ID = 'PEGAR_ID_DEL_CARRITO';

function addToCart(pid) {
    fetch(`/api/carts/${CART_ID}/products/${pid}`, {
        method: 'POST'
    }).then(() => {
        alert('Producto agregado al carrito');
    });
}

