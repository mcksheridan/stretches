import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/index.html'));
});

app.get('/template', (req, res) => {
  res.render('template', { title: 'Template Page' });
});

app.listen(process.env.PORT || PORT);
