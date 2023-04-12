//importando as bibliotecas

const EsquemaTarefa = require('../src/models/tarefas.js');
const EsquemaUsuario = require('../src/models/usuario.js');

const mongooseToSwagger = require('mongoose-to-swagger')
const swaggerAutogen = require('swagger-autogen')({
    // OBJETOS DO SWAGGER AUTOGENDOC
    //openapi e um conceito do Swagger p/ ter uma documentação aberta
    //language pt-BR e para documentação ficar em portugues
    openapi:'3.0.0',
    language:'pt-BR',
})

// variavel onde o arquivo sera criado OUTPUT
let outputFile = './swagger_output.json';


//variavel com as stringes que fazem as rotas (endpoint)
let endpointsFiles = ['../index.js', '../src/routes.js'];


if(String(process.env.OS).toLocaleLowerCase().includes("windows")){
    outputFile = './swagger/swagger_output.json';
    endpointsFiles = ['./index.js', './src/routes.js'];
}

// variavel que configura a documentação
let doc = {
    // informações do SWAGGER
    info: {
        version: "1.0.0",
        title: "API do BoardTasks",
        description: "Documentação da API do BoardTasks."
    },
    // servidores
    servers: [
        {
            url: "http://localhost:3000/",
            description: "Servidor localhost."
        },
        {
            url: "https://dnc-bt-back.vercel.app/",
            description: "Servidor de produção."
        }
    ],
     consumes: ['application/json'],
     produces: ['application/json'],
     components: {
        schemas: {
            Usuario: mongooseToSwagger(EsquemaUsuario),
            Tarefa: mongooseToSwagger(EsquemaTarefa),
        }
     }
     
 }

 // chamando SWAGGERAUTOGEN , cria função com parametros das variaveis (output,endpoints,doc).tehn , pedi para o programar aguardar a execução da função e depois executa a arrow function e o console log
 swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
     console.log("Documentação do Swagger gerada encontra-se no arquivo em: " + outputFile);
     // IF chega a variavel de ambiente usada para verificar em qual ambiente o codigo esta rodando
     // se não for o ambiente de production passara o ambiente index.js (principal)
      if (process.env.NODE_ENV !== 'production') {
          require("../index.js");
      }

 })


