const mongoose = require('mongoose');

// é usado para validar o email
const validator = require ('validator');

// Esquema vai definir cada campo dentro do banco de dados
const esquema = new mongoose.Schema({
   // linha 9 a 29 campos que perteceram ao esquema(banco de dados) 
    nome: {
        type: String,
        required: 'é obrigatório!',
    },
    email: {
        type: String,
        unique: true,
        required: 'é obrigatório!',
        lowercase: true,
        index: true,
        validate: {
            validator: (valorDigitado) => { return validator.isEmail(valorDigitado) },
            message: 'inválido!'
        }
    },
    senha: {
        type: String,
        required: 'é obrigatório!',
        select: false,
    },
},
{
  // configuração do esquema
  //timetamps, faz com o mangoose cria 2 campos de data automatico  
    timestamps: true
}
);

//exportação do model/estrutura para usar na API
const EsquemaUsuario = mongoose.models.Usuario || mongoose.model('Usuario', esquema);
module.exports = EsquemaUsuario;