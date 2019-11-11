import jwt from 'jsonwebtoken';
import { promisify } from 'util';
require('dotenv/config');

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    
    return res.status(401).json({ error: 'Sem token.' });
  }
  const token = authHeader;
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.CHAVE);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};
