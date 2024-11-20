import { useState, useEffect, SetStateAction } from 'react';
import Head from 'next/head';
import Menu from '../componentes/Menu';
import LinhaLivro from '../componentes/LinhaLivro';
import styles from '../src/app/page.module.css';
import ControleLivros from '../classes/controle/ControleLivros';
import ControleEditora from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';

const controleLivros = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!carregado) {
      controleLivros
        .obterLivros()
        .then((livrosObtidos: SetStateAction<Livro[]>) => {
          setLivros(livrosObtidos);
          setCarregado(true);
        })
        .catch((erro: any) => console.error("Erro ao carregar os livros:", erro));
    }
  }, [carregado]);

  const excluir = (codigo: string) => {
    controleLivros
      .excluir(codigo)
      .then(() => setCarregado(false))
      .catch((erro: any) => console.error("Erro ao excluir o livro:", erro));
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
                <th>Resumo</th>
                <th>Editora</th>
                <th>Autores</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro, index) => (
                <LinhaLivro
                  key={index}
                  livro={livro}
                  excluir={() => excluir(livro.codigo)}
                  getNomeEditora={() => controleEditora.getNomeEditora(livro.codEditora)}
                />
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default LivroLista;
