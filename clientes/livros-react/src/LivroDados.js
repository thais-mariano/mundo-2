import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const LivroDados = () => {
  const controleLivro = new ControleLivros();
  const controleEditora = new ControleEditora();

  // Opções de editoras
  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  // Estados
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0]?.value || '');

  const navigate = useNavigate();

  // Método para lidar com a seleção no combo
  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  // Método incluir com async/await e redirecionamento após inclusão
  const incluir = async (event) => {
    event.preventDefault();

    const livro = {
      _id: '', // Código inicializado como string vazia para compatibilidade com LivroMongo
      titulo,
      resumo,
      autores: autores.split('\n'), // Divide os autores por linha
      codEditora,
    };

    try {
      await controleLivro.incluir(livro); // Inclui o livro no servidor
      navigate('/'); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao incluir o livro:", error);
    }
  };

  return (
    <main className="w-50 mx-auto">
      <h1>Dados do Livro</h1>
      <form onSubmit={incluir}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Resumo</label>
          <textarea
            className="form-control"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Editora</label>
          <select
            className="form-select"
            value={codEditora}
            onChange={tratarCombo}
            required
          >
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Autores (um por linha)</label>
          <textarea
            className="form-control"
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Salvar dados
        </button>
      </form>
    </main>
  );
};

export default LivroDados;
