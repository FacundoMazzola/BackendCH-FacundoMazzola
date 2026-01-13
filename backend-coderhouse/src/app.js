const express = require('express');
const mongoose = require('mongoose');

const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 RUTA RAÍZ (ESTO ES LO QUE FALTABA)
app.get('/', (req, res) => {
    res.send('Proyecto Backend Coderhouse - Servidor funcionando');
});

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Mongo
mongoose.connect('mongodb://127.0.0.1:27017/backendCoderhouse')
    .then(() => console.log('✅ MongoDB conectado'))
    .catch(err => console.error('❌ Error MongoDB:', err));

// Server
app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});
