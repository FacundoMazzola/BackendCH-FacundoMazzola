const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Proyecto Backend Coderhouse - Servidor funcionando');
});

router.get('/products', (req, res) => {
    res.render('index');
});

module.exports = router;


