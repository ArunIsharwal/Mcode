import mysql from "mysql2/promise";

import dotenv from "dotenv";
dotenv.config();

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log(`Mysql Connected Successfully`);


export default db;

// const [result, fields] = await db.query("SHOW TABLES");
// console.log(result[0] );

// const [result] = await db.query(`update users set username = "John"  where userId = 100`)
// console.log(result.affectedRows);

// const id = 100;

//prepared statement
// const [result] = await db.query(`SELECT * FROM users WHERE userId = ?`, [id])
// console.log(result);


// const [result] = await db.query(`SELECT userId from users WHERE userId = ? `, [
//   100,
// ]);

// console.log(result[0].userId); // [ { userId: 100 } ]