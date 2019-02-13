var express = require('express');
var router = express.Router();

var clientes = require('./api/clientes');


router.use('/clientes', clientes);


module.exports = router;
