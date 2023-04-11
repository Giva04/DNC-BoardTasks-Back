const express = require('express');
const conectarBancoDados = require('../middlewares/conectarBD');
const router = express.Router();

/* GET users listing. */
router.get('/', conectarBancoDados, function(req, res, next) {
  //para executar o comando da variavel usamos PROCESS.ENN.NOME DA VAR
  // console.log("var:",process.env.NOME)
  // res.send('hello Word var:'+process.env.NOME);
  res.send('respond with a resource 50 var:'+process.env.TEST);
});

module.exports = router;
