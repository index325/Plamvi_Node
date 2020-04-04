import mongoose from 'mongoose';
import Produtos from '../models/Produtos';
import * as Yup from 'yup';

class ProdutosController {
    async guardar(req, res) {
        const validacao = Yup.object().shape({
            preco: Yup.number()
                .moreThan(0.0)
                .required(),
            descricao: Yup.string()
                .required()
                .min(10),
        });

        if (!(await validacao.isValid(req.body))) {
            return res
                .status(400)
                .json({
                    error: 'A validação está incorreta!'
                });
        }

        let codigo_interno = req.body.codigo_interno

        const produto = await Produtos.findOne({
            codigo_interno
        });

        if (produto) {
            return res.status(401).json({
                error: 'O produto já foi cadastrado!'
            });
        }

        try {
            const produtos = await Produtos.create(req.body);

            return res.status(200).json({
                sucess: 'O produto foi criado com sucesso!'
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Erro na operação de cadastro'
            });
        }
    }
}

export default new ProdutosController();