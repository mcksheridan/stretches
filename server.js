import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './db';
import createExerciseArray from './processForm';

const app = express();
const PORT = 3000;

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/index.html'));
});

app.get('/template', (req, res) => {
  const results = ({
    routineName: 'Sample Stretch',
    exercises: [
      {
        name: 'Calf Stretch',
        img: 'j',
      },
      {
        name: 'Figure Four',
      },
      {
        name: 'Lying Pectoral Stretch',
      },
    ],
    routineSeconds: 60,
  });
  res.render('template', { title: `Routine: ${results.routineName}`, data: results });
});

app.get('/add', (req, res) => {
  res.render('add-routine', { title: 'Add a Routine' });
});

app.post('/add', (req, res) => {
  const routineName = req.body['routine-name'].trim();
  const routineSeconds = req.body['routine-seconds'].trim();
  const exerciseNames = req.body['exercise-name'];
  const exerciseImages = req.body['exercise-image'];
  const exerciseArray = createExerciseArray(exerciseNames, exerciseImages);
  // eslint-disable-next-line consistent-return
  async function checkDuplicateRoutines() {
    const text = 'SELECT * FROM routines WHERE name = $1';
    const values = [routineName];
    try {
      const query = await db.query(text, values);
      const results = query.rows;
      if (results.length > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error.stack);
      res.status(500).send('An error occured while adding this list');
    }
  }
  async function addRoutineToDatabase() {
    const text = 'INSERT INTO routines(name, seconds, exercises) VALUES($1, $2, $3)';
    const values = [routineName, routineSeconds, exerciseArray];
    try {
      await db.query(text, values);
    } catch (error) {
      console.error(error.stack);
      res.status(500).send('An error occured while creating this routine');
    }
  }
  async function processRoutine() {
    const isRoutineDuplicate = await checkDuplicateRoutines();
    if (!isRoutineDuplicate) {
      try {
        await addRoutineToDatabase();
        res.redirect('/');
      } catch (error) {
        console.error(error.stack);
      }
    }
  }
  processRoutine();
});

app.listen(process.env.PORT || PORT);
