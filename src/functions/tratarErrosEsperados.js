// função que chama biblioteca STRING
const S = require('string');

// função que recebe o res (resposta do express) e o erro
function tratarErrosEsperados(res, err) {

//   Entrar quando o moogonsee der algum erro
//   verifica se o erro é uma string
  if (String(err).includes(`ValidationError:`)) {
    return res.status(400).json({
      status: "Erro",
      statusMensagem: S(String(err).replace("ValidationError: ", "")).replaceAll(':', '').s,
      resposta: String(err)
    });
  }

//   Pode ser um erro criado por mim

  if (String(err).includes(`Error:`)) {
    return res.status(400).json({
      status: "Erro",
      statusMensagem: String(err).replace("Error: ", ""),
      resposta: String(err)
    });
  }


//   Erro inesperado
  console.error(err);
  return res.status(500).json({
    status: "Erro",
    statusMensagem: "Houve um problema inesperado, tente novamente mais tarde.",
    resposta: String(err)
  });
}

module.exports = tratarErrosEsperados;