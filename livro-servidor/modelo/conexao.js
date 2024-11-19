const { default: mongoose } = require('mongoose');
const banco = require('mongoose');
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const uri = 'mongodb://localhost/livraria';

mongoose.connect(uri, options)
    .then(() => console.log('Conexão realizada com sucesso!'))
    .catch(err => console.error('Erro ao conectar com banco de dados: ', err));

module.exports = mongoose;
