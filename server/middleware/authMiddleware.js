import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Not authorized' });
  }
};
