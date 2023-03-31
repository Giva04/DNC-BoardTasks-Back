var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //para executar o comando da variavel usamos PROCESS.ENN.NOME DA VAR
  console.log("var:",process.env.NOME)
  res.send('hello Word var:'+process.env.NOME);
});

module.exports = router;
