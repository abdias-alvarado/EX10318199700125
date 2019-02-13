var express = require('express');
var router = express.Router();

var modelo_archivo = require('./archivo'); //mdl_archivo
var datos = null; //data

var formato_cliente = { //plantilla_archivo
  '_id':'',
  'RTN': '',
  'Empresa': '',
  'Correo': '',
  'Rubro':  '',
  'Direccion': '',
  'Telefono': ''
};

// **************** GET ***********************//
router.get('/', function( req, res, next) {
  if(!datos){
    modelo_archivo.read(function(err, contenidoArchivo){
      if(err){
        datos = [];
        return res.status(500).json({'Error':'Error al cargar los datos.'});
      }
      datos = JSON.parse(contenidoArchivo);
      return res.status(200).json(datos);
    });
  } else {
    return res.status(200).json(datos);
  }
});

module.exports = router;
