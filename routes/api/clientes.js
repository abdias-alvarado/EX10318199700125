var express = require('express');
var router = express.Router();

var modelo_archivo = require('./archivo');
var datos = null;

var formato_cliente = {
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


// *************** PUT ************************//
router.put('/actualizar/:idCliente', function(req, res, next){
  var idCliente = req.params.idCliente;
  var cambios = req.body;
  var actualizado = null;
  var nuevosValores = datos.map(
    function(archivo){

      if (archivo._id == idCliente)
      {
        var rtn = archivo.RTN;

        actualizado = Object.assign(
          {},
          archivo,
          cambios,
          {'_id': idCliente},
          {'RTN': rtn}
          );
        return actualizado;
      }
      return archivo;
    }
  );

  datos = nuevosValores;
  modelo_archivo.write(datos, function (err) {
    if (err) {
      return res.status(500).json({ 'Error': 'Error al actualizar el cliente.' });
    }
    return res.status(200).json(actualizado);
  });
});

//**************** DELETE *****************************//
router.delete('/eliminar/:idCliente', function(req, res, next){
  var idCliente = req.params.idCliente;
  var nuevosValores = datos.filter(
    function (archivo) {
      if (archivo._id == idCliente) {
        return false;
      }
      return true;
    }
  );
  datos = nuevosValores;
  modelo_archivo.write(datos, function (err) {
    if (err) {
      return res.status(500).json({ 'Error': 'Error al eliminar el cliente.' });
    }
    return res.status(200).json({"Eliminado el registro": idCliente});
  });
});


module.exports = router;
