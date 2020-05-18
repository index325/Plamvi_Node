import * as Yup from "yup";

class PedidosController {
  async guardar(req, res) {
    // const validacao = Yup.object().shape({
    //   total: Yup.number()
    //     .moreThan(0)
    //     .required(),
    //   diasParaEntrega: Yup.number()
    //     .required()
    //     .moreThan(0),
    // });

    // if (!(await validacao.isValid(req.body))) {
    //   return res.status(400).json({
    //     error: "A validação está incorreta!",
    //   });
    // }

    // let usuario = mongoose.Types.ObjectId(req.body.usuario);
    // usuario = await Usuarios.findById(usuario);

    // if (!usuario) {
    //   return res.status(400).json({
    //     error: "Usuário não encontrado!",
    //   });
    // }

    // let cliente = mongoose.Types.ObjectId(req.body.cliente);
    // cliente = await Cliente.findById(cliente);

    // if (!cliente) {
    //   return res.status(400).json({
    //     error: "Cliente não encontrado!",
    //   });
    // }

    // let tipoEntrega = mongoose.Types.ObjectId(req.body.tipo_entrega);
    // tipoEntrega = await TipoDeEntrega.findById(tipoEntrega);

    // if (!tipoEntrega) {
    //   return res.status(400).json({
    //     error: "Tipo da entrega não cadastrada!",
    //   });
    // }

    // const pedidos = new Pedidos({
    //   usuario: usuario,
    //   cliente: cliente,
    //   tipoEntrega: tipoEntrega,
    //   total: req.body.total,
    //   diasParaEntrega: req.body.diasParaEntrega,
    // });

    // try {
    //   const result = await pedidos.save();

    //   return res.status(200).json({
    //     sucess: "O tipo de entrega foi criado com sucesso!",
    //     result,
    //   });
    // } catch (error) {
    //   return res.status(500).json({
    //     error: "Erro na operação de cadastro",
    //   });
    // }
  }

  async meusPedidos(req, res) {
    // try {
    //   const result = await Pedidos.find({ usuario: req.body.idUsuario });

    //   return res.status(200).json({
    //     result,
    //   });
    // } catch (error) {
    //   return res.status(500).json({
    //     error: "Ocorreu um erro ao procurar os pedidos.",
    //   });
    // }
  }
}
export default new PedidosController();
