require("dotenv").config();
const fs = require("fs");
const path = require("path");
const db = require("../src/utils/db");
const { promisify } = require("util");
const read = promisify(fs.readFile);
const dataPath = path.join(__dirname, "../data/medium.sql");

const insertData = async () => {
  try {
    const data = await read(dataPath);
    const sqlQueryString = data.toString();
    await db.query(sqlQueryString);
    console.info("Success: data has been created");
  } catch (e) {
    console.error("Data insertion failed");
    console.log(e);
  }
  db.pool.end();
};

insertData();
