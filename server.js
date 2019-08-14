import express from 'express';
import path from 'path';
import router from './routes/index';
import './models/index';


const app = express();


const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './build')))
  .use(express.urlencoded({ extended: false }))
  .use(express.text())
  .use(express.json())
  .use('/', router);


app.use((req, res) => {
  // console.log(path.join(__dirname, './build'));
  // res.sendFile(path.join(`${__dirname}./build/error.html`));
  res.status(500).json({
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
//   if (!fs.existsSync('./build/img/cookIcon')) {
//     fs.mkdirSync('./build/img/HotDogIcon');
// }
  console.log(`Server running on port : ${port}`);
});
