const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');

const ProductManager = require('./managers/ProductManager');

const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.router');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;
const pm = new ProductManager();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Rutas
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Websocket
io.on('connection', async socket => {
    console.log('Cliente conectado');

    const products = await pm.getAll();
    socket.emit('productsUpdated', products);

    socket.on('newProduct', async data => {
        await pm.addProduct(data);
        io.emit('productsUpdated', await pm.getAll());
    });

    socket.on('deleteProduct', async pid => {
        await pm.deleteProduct(pid);
        io.emit('productsUpdated', await pm.getAll());
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});
