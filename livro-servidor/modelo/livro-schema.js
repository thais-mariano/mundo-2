const mongoose = require('./conexao');

const LivroSchema = new mongoose.Schema({
   // _id: {type: banco.Schema.Types.ObjectId, required: true},
    titulo: { type: String },
    codEditora: { type: Number },
    resumo: { tupe: String },
    autores: { type: [String] }
}, { collection: 'livros' });

const Livro = mongoose.model('Livro', LivroSchema);

module.exports = Livro;