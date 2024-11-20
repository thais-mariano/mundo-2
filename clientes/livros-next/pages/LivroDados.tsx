import React, { useState } from 'react';
import ControleEditora  from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';
import { useRouter } from 'next/router';
import Menu  from '../componentes/Menu';
import styles from '../src/app/page.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head';

const controleEditora = new ControleEditora();

const baseURL = "http://localhost:3000/api/livros";

const incluirLivro = async (livro: Livro) => {
  const resposta = await fetch(baseURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(livro),
  });
  return resposta.ok;
};

export default function LivroDados() {
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(0);

  const router = useRouter();

  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome
  }));

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    incluirLivro({
        codigo: "0",
        titulo,
        resumo,
        autores: autores.split('\n'),
        codEditora,
      }).then(() => {
      router.push('/LivroLista');
    });
  };

  return (
    <>
    <Head>
        <title>Adicionar Livro</title>
    </Head>
    <div className={styles.container}>
      <Menu />
      <main className={styles.main}>
        <h1>Adicionar Livro</h1>
        <form onSubmit={incluir}>
          <div>
            <label>Título</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>
          <div>
            <label>Resumo</label>
            <textarea value={resumo} onChange={(e) => setResumo(e.target.value)} />
          </div>
          <div>
            <label>Autores</label>
            <textarea value={autores} onChange={(e) => setAutores(e.target.value)} />
          </div>
          <div>
            <label>Editora</label>
            <select value={codEditora} onChange={tratarCombo}>
              {opcoes.map(opcao => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Incluir</button>
        </form>
      </main>
    </div>
    </>
  );
}