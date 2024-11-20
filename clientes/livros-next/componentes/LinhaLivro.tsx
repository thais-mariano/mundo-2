import React from 'react';
import { Livro } from '../classes/modelo/Livro'; 

interface LinhaLivroProps {
  livro: Livro;
  excluir: () => void;
  getNomeEditora: () => string | undefined;
}

const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir, getNomeEditora }) => {
  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>{getNomeEditora()}</td>
      <td>{livro.autores.join(', ')}</td>
      <td>
        <button onClick={excluir} className="btn btn-danger">
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default LinhaLivro;
