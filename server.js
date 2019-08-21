import express from 'express';
import path from 'path';
import router from './routes/index';
import './models/index';


const app = express();


const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, './build')))
  .use(express.urlencoded({ extended: false }))
  .use(express.text())
  .use(express.json())
  .use('/', router);


app.use((req, res) => {
  res.status(404).json({
    err: '404',
    message: '404-not found',
  });
});

app.use((err, req, res) => {
  res.status(500).json({
    err: '500',
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
