import { Livro } from "../modelo/Livro";

const baseURL = "http://localhost:3030/livros";

interface LivroMongo {
  _id: string | null;
  codigo: string;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}


export default class ControleLivros {
  async obterLivros(): Promise<Livro[]> {
    const response = await fetch(baseURL, { method: "GET" });
    if (!response.ok) {
      throw new Error("Erro ao obter os livros");
    }
    const data = await response.json();
    return data.map((item: any) => ({
      codigo: item.codigo,
      codEditora: item.codEditora,
      titulo: item.titulo,
      resumo: item.resumo,
      autores: item.autores,
    }));
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      _id: null,
      codigo: livro.codigo,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };

    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livroMongo),
    });

    return response.ok;
  }

  async excluir(codigo: string): Promise<boolean> {
    const response = await fetch(`${baseURL}/${codigo}`, { method: "DELETE" });
    return response.ok;
  }
}
