const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');

const viewsRouter = require('./routes/views.router');
const productsRouter = require('./routes/products.routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// rutas
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);

// sockets
const ProductManager = require('./managers/ProductManager');
const pm = new ProductManager();

io.on('connection', async socket => {
    console.log('🟢 Cliente conectado');

    socket.emit('productsUpdated', await pm.getAll());

    socket.on('newProduct', async data => {
        await pm.addProduct(data);
        io.emit('productsUpdated', await pm.getAll());
    });

    socket.on('deleteProduct', async id => {
        await pm.deleteProduct(id);
        io.emit('productsUpdated', await pm.getAll());
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
});
