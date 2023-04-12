const express = require('express');
const conectarBancoDados = require('../middlewares/conectarBD');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const bcrypt = require('bcrypt');
const EsquemaUsuario = require('../models/usuario');
const router = express.Router();

/* POST , é usado para criar algo na API  */
// CRIAR,é usado para criar a API 
router.post('/criar', conectarBancoDados, async function(req, res) {
  //para executar o comando da variavel usamos PROCESS.ENN.NOME DA VAR
  // console.log("var:",process.env.NOME)
  // res.send('hello Word var:'+process.env.NOME);
  //res.send('respond with a resource 50 var:'+process.env.TEST);

  try {
    // #swagger.tags = ['Usuario]
    // objeto que aparece os nomes dos elementos que queremos que apareca no swagger
    let {nome, email , senha} =  req.body;

    // const salvará o n° de vezes que a criptografia do hash precisa passar
    const numeroVezesHash = 10;

    //senha já criptografada
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
    const respostaBD = await EsquemaUsuario.create({nome, email, senha: senhaHash})

    res.status(200).json({
      status: "Ok",
      statusMensagem: "Usuário criado com sucesso.",
      resposta: respostaBD
    })    
     //função que trata de fazer a resposta do erro para a API
  } catch {error} {
    if(String(error).includes("email_l dup key")){
      return tratarErrosEsperados(res, "Error: Já existe uma conta com esse e-mail");
    }
    return tratarErrosEsperados(res, error);
  }
});

module.exports = router;
