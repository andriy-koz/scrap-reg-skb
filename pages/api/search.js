import db from '../../db/db.json';

export default function handler(req, res) {
  const { code, q } = req.query;

  if (code) {
    const item = db.parts.find(item => item.code === code);
    return res.status(200).json(item);
  }

  if (q) {
    const results = db.parts.filter(product => {
      const { name } = product;
      return name.toLowerCase().includes(q.toLowerCase());
    });
    return res.status(200).json(results);
  }

  res.status(400).json();
}
