import jwt from 'jsonwebtoken';
import credenciais from '../auth/credentials';
import { promisify } from 'util';

export default async (req, res, next) => {
    const headers = req.headers.authorization;
    let tokenInformacao;

    try {
        tokenInformacao = headers.split (' ');
    } catch (error) {
        return res.status(418).json({ error: 'Falha na divisão de token!'});
    }

    const [bearer, token] = tokenInformacao;

    if (!(bearer === 'Bearer')) {
        return res.status(401).json({ error: 'O formato de autenticação é incorreto!'});
    }

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido!'});
    }

    try {
        const tokenInformacao = await promisify(jwt.verify)(token, credenciais.chave);
        req.body.idUsuario = tokenInformacao.idUsuario;

        return next();
    } catch (error) {
        return res.json ({ error: 'Token incorreto!'});
    }
};
