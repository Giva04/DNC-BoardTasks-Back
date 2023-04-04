// linha 1 a 22 importação 
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//importando a biblioteca cors
const cors = require('cors');
// importando biblioteca SwaggerUI
const swaggerUi = require('swagger-ui-express');
// importando arquivo gerado no autoGen
//const swaggerFile = require('./swagger/swagger_output.json');
// variavel que importa o css customizado
const swaggerOptions ={customCssUrl:'./swagger-ui.css' };

//apaga-se a importação do app indexRouter
// const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
const routes = require('./src/routes');

const app = express();
// importando biblioteca DOTENV 
require('dotenv').config();


// linha 26 a 31 configuração do express
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// linha 35 a 42 documentação e rotas do Swagger
if(process.env.NODE_ENV !== 'test' ){
    const swaggerFile = require('./swagger/swagger_output.json');
    // App.get vai redirecionar o usuario direto para pagina documento
    app.get('/',(req, res) => {  /*#swagger.ignore = true */ res.redirect('/doc'); });
    // App.use faz a rota doc onde acontece a documentação nessa função passa todas as variaveis 
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, this.options));
       // app.use('/', indexRouter);
}


//linha 45  endppoint
routes(app);


// linha 51 a 55 inicialização do servidor
// if para testar e rodar o servidor
if (process.env.NODE_ENV !== 'test'){
    // inicializando o servidor do express
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
