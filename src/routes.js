// função para importar as rotas dos usuarario
function routes(app) {
    app.use('/usuario', require('./routes/usuario.js'));
    return;
}

module.exports = routes;