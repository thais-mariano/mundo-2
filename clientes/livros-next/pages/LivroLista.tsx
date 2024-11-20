import { useState, useEffect } from 'react';
import Head from 'next/head';
import Menu from '../componentes/Menu';
import LinhaLivro from '../componentes/LinhaLivro';
import styles from '../src/app/page.module.css';

const baseURL = "http://localhost:3000/api/livros";

interface Livro {
  codigo: number;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState(false);

  const obter = async () => {
    const response = await fetch(baseURL);
    const data = await response.json();
    setLivros(data);
  };

  const excluirLivro = async (codigo: number) => {
    const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
    return response.ok;
  };

  useEffect(() => {
    if (!carregado) {
      obter().then(() => setCarregado(true));
    }
  }, [carregado]);

  const excluir = (codigo: number) => {
    excluirLivro(codigo).then(() => setCarregado(false));
  };

  return (
    <>
    <Head>
      <title>Lista de Livros</title>
    </Head>
    <div className={styles.container}>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Lista de Livros</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Editora</th>
              <th>Autores</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro key={livro.codigo} livro={livro} excluir={() => excluir(livro.codigo)} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
    </>
  );
};

export default LivroLista;