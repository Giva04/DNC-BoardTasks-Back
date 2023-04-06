// FUNÇÃO PARA EXECUTAR OS MIDDLEWARES, 
// REQ , recebe os valores das requisao
// RES , variavel que responde a API/ Requisição e enviar para o navegador ou p/ o front
// NEXT, função chamada para que o middleware execute a função

// variavel que verifica as rotas
async function authDocProducao(req, res, next) {
        const { senhaDigitada } = req.body;

    
    if(req.headers.host.includes("localhost") || req.originalUrl !== "/doc/"){
        // usuario esta no navegador
        return next();
    }
        
    if(senhaDigitada ===process.env.SWAGGER_SENHA_DOC){
        // senha criada pelo usuario (senhaCorreta)
        return next();
    }
    
    if(senhaDigitada){
        //campo onde a senha digita esta errada e é informado para o usuariao a msg de erro
        res.status(401).set('Content-Type', 'text/html');
        //Content-Type informa o navegador que o tipo de conteudo é HTML
        // send envia a resposta para o navegador
        res.send(Buffer.from(`
        <form method="post">
            <p style="color: red;">Senha Errada!</p>
            <label for="senha">Senha da documentação:</label>
            <input type="password" name="senhaDigitada" id="senhaDigitada" />
            <button type="submit">Entrar</button>
        <form/>
        `));
        //quando usuario estiver criando a senha ou ainda não digitou
    }else {
        res.status(200).set('Content-Type', 'text/html')
        res.send(Buffer.from(`
        <form method="post">
            <label for="senhaDigitada">Senha da documentação:</label>
            <input type="password" name="senhaDigitada" id="" />
            <button type="submit">Entrar</button>
        <form/>
        `))
    }

}
// metodo que faz com que as exportações sejam feitas em outros arquivos
module.exports = authDocProducao;