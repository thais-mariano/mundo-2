import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {

      const codigo = Number(req.query.codigo);
      controleLivro.excluir(codigo);
      res.status(200).json({ message: 'Livro excluído com sucesso' });

    } else {

      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Método ${req.method} não permitido`);

    }
  } catch (error) {

    res.status(500).json({ message: 'Erro no servidor', error });
  }
};
