import express from 'express';

const PORT = 3000;

const app = express();

// 2
// app.get('/', (req, res) => {
//   res.send('Express server is running!');
// });

//3
app.use(express.json());

app.get('/', (req, res) => {
  try {
    res.send('Hello, World!');
  } catch (error) {
    res.status(500).send('Ошибка GET запроса');
  }
});


app.post('/', (req, res) => {
  try {
    const { data } = req.body || {};

    if (!data) {
      return res.status(400).send('Нет данных');
    }

    res.send(`Данные получены: ${data}`);
  } catch (error) {
    res.status(500).send('Ошибка POST запроса');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
