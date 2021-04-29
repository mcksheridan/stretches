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

app.get('/routine/:id', (req, res) => {
  const routineId = req.params.id;
  // eslint-disable-next-line consistent-return
  async function getRoutine() {
    const text = 'SELECT * FROM routines WHERE routine_id = $1';
    const values = [routineId];
    try {
      const query = await db.query(text, values);
      const results = query.rows[0];
      /* The exercise from the results will return as an object wrapped inside of a string
      and cannot be directly manipulated in our view. I mutate this exercise array with
      an actual array of objects that can be used in our template engine. */
      results.exercises.forEach((exercise, index) => {
        const exerciseObject = {};
        const exerciseArray = exercise.split('"');
        // Index 0 is '{', index 1 is the object key, index 2 is ':'
        // Index 3 is the object value, index 4 is '}'
        exerciseObject[exerciseArray[1]] = exerciseArray[3];
        results.exercises.splice(index, 1, exerciseObject);
      });
      res.render('template', { title: `Routine: ${results.name}`, data: results });
    } catch (error) {
      res.status(500).send('An error occured while retrieving this routine');
      console.error(error.stack);
    }
  }
  getRoutine();
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
