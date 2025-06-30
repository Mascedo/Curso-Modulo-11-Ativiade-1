const mongoose = require('mongoose');
const Livro = require('../models/livrosModel')
require('dotenv').config({path: 'Modulo 11/Atividades/atividade1/src/.env'});
mongoose.connect(process.env.MONGO_URL)


exports.mostrarLivros = async (req, res) => {
    try {
        const livros = await Livro.find()

        const livrosFormatados = livros.map(livro => {
            return {
                ...livro.toObject(), // converte o documento Mongoose para objeto normal
                id: livro._id,       // cria nova chave "id"
                _id: undefined       // remove o "_id"
            }
        })

        res.json(livrosFormatados)
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao mostrar livro", detalhes: erro.message })
    }
}

exports.criarLivro = async (req, res) => {
    try{

        const {titulo, autor, genero} = req.body

    if(titulo&&autor&&genero){
        let novoLivro = new Livro({titulo, autor, genero})

        await novoLivro.save()
        res.json(novoLivro)
    }else{
        res.json("Todos os campos são necessariso!")
    }
    }catch(erro){
        res.status(500).json({erro: "Erro ao criar livro", detalhes: erro.message})
    }
}

exports.atualizarLivro = async (req, res) => {
    try{ 
        const {titulo, autor, genero} = req.body
        
    if(titulo&&autor&&genero){
        const livro = await Livro.findByIdAndUpdate(req.params.id, 
        {titulo: titulo, autor: autor, genero: genero},
        {new: true}
        )

    res.json(livro)
    }else{
        res.json("Todos os campos são necessariso!")
    }
    } catch (erro) {
        res.status(500).json({erro: "Erro ao atualizar livro", detalhes: erro.message})
    }
}

exports.deletarLivro = async (req, res) => {
    try{
        let id = req.params.id
        const livro = await Livro.findByIdAndDelete(id)
        res.json("Livro removido")
    } catch (erro) {
        res.status(500).json({erro: "Erro ao deletar livro", detalhes: erro.message})
    }
}

exports.buscarLivro = async (req, res) => {
    try {
        const { titulo, autor, genero } = req.query;
        let filtro = {};
    if(titulo||autor||genero){
        if (titulo) filtro.titulo = { $regex: titulo, $options: 'i' };
        if (autor) filtro.autor = { $regex: autor, $options: 'i' };
        if (genero) filtro.genero = { $regex: genero, $options: 'i' };

        const resultado = await Livro.find(filtro);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.status(404).json({ mensagem: "Nenhum livro encontrado com essa característica!" });
        }
    }else{
        res.json("Caracteristica de busca incorreta!")
    }
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar livro", detalhes: erro.message });
    }
}