const pgp = require('pg-promise')();
const cn = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`;
const db = pgp(cn); // database instance;
console.log(`Will be connected to DB ${cn}`);
module.exports = db;
