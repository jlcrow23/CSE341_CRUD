const express = require('express');
const router = new express.Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send("Hello World!");
});

router.use('/', require('./users'));
router.use('/', require('./books'));

module.exports = router;