import mysql from "mysql2";

export const db1 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abc123",
  database: "software",
});
