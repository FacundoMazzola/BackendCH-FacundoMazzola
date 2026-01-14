const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.router');

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
    res.send('Proyecto Backend Coderhouse - Servidor funcionando');
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Mongo
mongoose.connect('mongodb://127.0.0.1:27017/backendCoderhouse')
    .then(() => console.log('✅ MongoDB conectado'))
    .catch(err => console.log('❌ Error MongoDB:', err));

app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});


