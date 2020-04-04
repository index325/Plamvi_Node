import mongoose from 'mongoose';
import Pedidos from '../models/Pedidos';
import Cliente from '../models/Cliente';
import TipoDeEntrega from '../models/TipoDeEntrega';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

class PedidosController {
    async guardar(req, res) {

        const validacao = Yup.object().shape({
            total: Yup.number()
                .moreThan(0)
                .required(),
            diasParaEntrega: Yup.number()
                .required()
                .moreThan(0),
        });

        if (!(await validacao.isValid(req.body))) {
            return res
                .status(400)
                .json({
                    error: 'A validação está incorreta!'
                });
        }

        let _id = req.body.idUsuario;

        const Usuario = await Usuarios.findById(_id);

        if (!Usuario){
            return res
            .status(400)
            .json({
                error: 'Usuário não encontrado!'
            });
        }

        let _id = req.body.cliente;

        const Cliente = await Cliente.findById(_id);

        if (!Cliente){
            return res
            .status(400)
            .json({
                error: 'Cliente não encontrado!'
            });
        }

        let _id = req.body.tipoEntrega;

        const TipoEntrega = await TipoDeEntrega.findById(_id);

        if (!TipoEntrega){
            return res
            .status(400)
            .json({
                error: 'Tipo da entrega não cadastrada!'
            });
        }

        const Pedidos = new Pedidos({
            usuario: Usuario,
            cliente: Cliente,
            tipoEntrega: TipoEntrega,
            total: 0, // TODO
            diasParaEntrega: req.body.diasParaEntrega
        })


        const result = await Pedidos.save();
        console.log(result)
    }
};

export default new PedidosController();