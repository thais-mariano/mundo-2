import { Livro } from "../modelo/Livro";

const livros: Array<Livro> = [
    {
        codigo: 1,
        codEditora: 1,
        titulo: "Livro A",
        resumo: "Resumo do Livro A",
        autores: ["Autor A1", "Autor A2"]
    },
    {
        codigo: 2,
        codEditora: 2,
        titulo: "Livro B",
        resumo: "Resumo do Livro B",
        autores: ["Autor B1"]
    },
    {
        codigo: 3,
        codEditora: 3,
        titulo: "Livro C",
        resumo: "Resumo do Livro C",
        autores: ["Autor C1", "Autor C2", "Autor C3"]
    }
];


export default class ControleLivros {

    obterLivros(): Array<Livro> {
        return livros;
    }

    incluir(novoLivro: Livro): void {
        const novoCodigo = livros.length > 0 ? Math.max(...livros.map(l => l.codigo)) + 1 : 1;
        novoLivro.codigo = novoCodigo;
        livros.push(novoLivro);
    }

    excluir(codigo: number): void {
        const indice = livros.findIndex(l => l.codigo === codigo);
        if (indice !== -1) {
            livros.splice(indice, 1);
        }
    }
}
