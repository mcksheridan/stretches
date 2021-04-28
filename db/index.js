import { Pool } from 'pg';

const pool = new Pool({
  ssl: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
