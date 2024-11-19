const express = require('express');
const router = express.Router();
const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');

router.get('/', async (req, res) => {
    try {
        const livros = await obterLivros();
        res.json(livros);
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao obter livros: ', error
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const novoLivro = req.body;
        await incluir(novoLivro);
        res.status(201).json({
            mensagem: 'Livro incluído com sucesso!'
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao obter livros: ', error
        });
    }
})

router.delete('/:codigo', async (req, res) => {
    try {
        const codigo = req.params.codigo;
        await excluir(codigo);
        res.status(200).json({
            mensagem: 'Livro excluído com sucesso!' 
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao obter livros: ', error
        });
    }
})

module.exports = router;