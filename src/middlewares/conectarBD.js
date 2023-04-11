// função para conectar banco de dados MongoDB
// importação do mongoose
const mongoose = require('mongoose');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');

// async(função asincrona) para rodar o AWAIT precisa chamar async para rodar AWAIT dentro da função
async function conectarBancoDados ( req = null, res = null, next = null) {

 // trecho de execução , tudo que estiver dentro do Try será executado
    try{
        // AWAIT diz para o JS aguardar a execução completa do funcoo manogoose.connect
        //MANGOOSE.CONNECT para conectar no banco de dados , e a variavel de estado
        //useNewUrlPaeser: true, useUnifiedTopology: true, são as principais config. para usar no Mangoose
        await mongoose.connect(process.env.MONGOBD_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado ao banco de Dados!');

        //Next, faz com q a função continue executando a rota
        try {next();} catch{};
        return mongoose;

     // se der erro cai no CATCH , Cath vai exibir o erro no console/terminal
    } catch (error){
        console.error(error);
        tratarErrosEsperados(res,'Error: Erro ao conectar no banco de dados!')
        return error;
    }
}

module.exports = conectarBancoDados;