import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">Loja Next</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" className="nav-link">Página Inicial</Link>
            </li>
            <li className="nav-item">
              <Link href="/LivroLista" className="nav-link">Lista de Livros</Link>
            </li>
            <li className="nav-item">
              <Link href="/LivroDados" className="nav-link">Adicionar Livro</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;