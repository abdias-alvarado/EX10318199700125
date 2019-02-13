var fileSystem = require('fs');

module.exports = {
  "write": function(data, handler){
    fileSystem.writeFile('clientes_db.json', JSON.stringify(data) , handler);
  },
  "read": function(handler){
    fileSystem.readFile('clientes_db.json', handler);
  }
}
