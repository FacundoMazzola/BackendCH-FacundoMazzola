const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const path = require('path');

const productsRouter = require('./routes/products.routes');
const viewsRouter = require('./routes/views.router');

const app = express();
const PORT = 8080;

// ---------------- MIDDLEWARES ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// ---------------- HANDLEBARS ----------------
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'handlebars');

// ---------------- ROUTES ----------------
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);

// ---------------- MONGO ----------------
mongoose.connect('mongodb://127.0.0.1:27017/backendCoderhouse')
    .then(() => console.log('✅ MongoDB conectado'))
    .catch(err => console.error('❌ Error MongoDB:', err));

// ---------------- SERVER ----------------
app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});

