import express, { json } from 'express';
import Knex from "knex";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// configure the .env variables
config({ path: path.resolve(__dirname, "../.env") });

import { createDatabaseConnection } from './config/knex.js';

const app = express();
app.use(json());


const knexConfig = createDatabaseConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB,
});
export const knex = Knex(knexConfig);

const { createTables } = await import("./models/centralDatabase.js");

createTables();

// Your routes and middleware will go here

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



// import './env';
// import express from 'express';
// import bodyParser from 'body-parser';

// import * as userService from './services/users';
// import { connectAllDb } from './connectionManager';
// import * as connectionResolver from './middlewares/connectionResolver';

// const PORT = 8080;

// const app = express();

// app.set('port', PORT);
// app.use(bodyParser.json());

// connectAllDb();

// app.use(connectionResolver.resolve);

// // API Route
// app.get('/', (req, res, next) => {
//   res.json({ body: 'Hello multi-tenant application.' });
// });

// app.get('/users', async (req, res, next) => {
//   const users = await userService.getAll();

//   res.json({ body: users });
// });

// app.listen(PORT, () => {
//   console.log(`Express server started at port: ${PORT}`);
// });
