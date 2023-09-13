require("dotenv").config();
const pgp = require("pg-promise")();

const username = process.env.PG_USERNAME;
const password = process.env.PG_PASSWORD;
const host = process.env.PG_HOST;
const port = process.env.PG_PORT;
const pg_database = process.env.PG_DB;

const db = pgp(
  `postgres://${username}:${password}@${host}:${port}/${pg_database}`
);

const database = {
  setUser: async (name) => {
    try {
      const user = await db.oneOrNone(
        `INSERT INTO users(name) VALUES($1) RETURNING *`,
        [name]
      );
      return user;
    } catch (error) {
      throw error;
    }
  },

  getUser: async (user_id) => {
    try {
      const user = await db.oneOrNone("SELECT * FROM users WHERE id=$1", [
        user_id,
      ]);
      return user;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (user_id, name) => {
    try {
      const user = await db.oneOrNone(
        "UPDATE users SET name = $1 WHERE id=$2 RETURNING *",
        [name, user_id]
      );
      return user;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (user_id) => {
    try {
      await db.none("DELETE FROM users WHERE id=$1", [user_id]);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = database;
