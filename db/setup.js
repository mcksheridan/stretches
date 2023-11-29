const db = require('./index')

async function createTable() {
  const text = `CREATE TABLE routines (
    routine_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(80) NOT NULL UNIQUE,
    seconds INT NOT NULL CHECK (
        seconds <= 300
        AND
        seconds > 1
    ),
    exercises TEXT [] NOT NULL
  )`

  try {
    const query = await db.query(text);
  } catch (error) {
    console.error(error.stack);
  }
}
