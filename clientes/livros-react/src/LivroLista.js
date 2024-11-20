import React, { useState, useEffect } from "react";
import ControleLivros from "./controle/ControleLivros";
import ControleEditora from "./controle/ControleEditora";

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();


const LinhaLivro = (props) => {
  const { livro, excluir } = props;

  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr className="align-middle">
      <td className="p-1">
        <button 
          onClick={() => excluir(livro.codigo)}
          className="btn btn-danger px-2 mx-2"
        >
          Excluir
        </button>
      </td>
      <td className="w-25 p-1">{livro.titulo}</td>
      <td>{nomeEditora}</td>
      <td>{livro.resumo}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!carregado) {
      setLivros(controleLivro.obterLivros());
      setCarregado(true);
    }
  }, [carregado]);

  const excluir = (codigo) => {
    controleLivro.excluir(codigo);
    setCarregado(false);
  };

  return (
    <main className="w-50 mx-auto">
      <h1>Catálogo de Livros</h1>
      <table className="table-hover table table-striped justify-content-center table-responsive">
        <thead className="table-dark ">
          <tr>
            <th scope="col" className="text-white"></th>
            <th scope="col" className="text-white">Título</th>
            <th scope="col" className="text-white">Resumo</th>
            <th scope="col" className="text-white">Editora</th>
            <th scope="col" className="text-white">Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro
              key={livro.codigo}
              livro={livro}
              excluir={excluir}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;
