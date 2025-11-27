import express from 'express';
import connection from './db.js';

const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/products', (req, res) => {
  const selectAllQuery = 'SELECT * FROM products';

  connection.query(selectAllQuery, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.stack)
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  const insertQuery = 'INSERT INTO products (name, price) VALUES (?, ?)';

  connection.query(insertQuery, [name, price], (err, result) => {
    if (err) {
      console.error('Error adding product:', err.stack);
      res.status(500).send('Error adding product');
      return;
    }
    res.status(201).send('Product added successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
