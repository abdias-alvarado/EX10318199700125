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

// **************** POST ***********************//
router.post('/insertar', function(req, res, next){
  var nuevo_cliente = Object.assign({} , formato_cliente, req.body);

  if(!datos){
    datos = [];
  }

  datos.push(nuevo_cliente);
  modelo_archivo.write(datos, function(err){
    if(err){
      return res.status(500).json({ 'Error': 'Error insertando nuevo cliente.' });
    }
    return res.status(200).json(nuevo_cliente);
  });
});

module.exports = router;
