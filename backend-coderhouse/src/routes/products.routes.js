const express = require('express');
const router = express.Router();

// GET productos (prueba simple)
router.get('/', (req, res) => {
    res.json({
        status: 'success',
        payload: []
    });
});

module.exports = router;
