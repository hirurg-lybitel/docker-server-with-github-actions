import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

app.get('*', (req, res) => {
  console.log('[ request ]', {
    method: req.method,
    url: req.originalUrl
  });

  res.status(200).json({
    message: `There's api`
  })
})
