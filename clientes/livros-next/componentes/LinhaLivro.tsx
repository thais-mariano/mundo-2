import React from 'react';
import ControleEditora from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro'; 

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: number) => void;
}

const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const { livro, excluir } = props;
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>{livro.autores.join(', ')}</td>
      <td>
        <button onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
    </tr>
  );
};

export default LinhaLivro;