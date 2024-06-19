const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyparser.json());

// database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student",
  port: 3306,
});

// check database connection
db.connect((err) => {
  if (err) throw err;
  console.log("database connected Succesfully!");
});

// get all data
app.get("/user", (req, res) => {
  let sql = "select * from std_angular";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("error", err);
    }
    if (result.length > 0) {
      res.send({ message: "all user datas", data: result });
    }
  });
});

// post data
app.post("/user", (req, res) => {
  console.log("post data", req.body);
  let Name = req.body.name;
  let Email = req.body.email;
  let Mobile = req.body.mobile;
  let insertSql = `insert into std_angular(name,email,mobile) 
    values('${Name}','${Email}','${Mobile}')`;

  db.query(insertSql, (err, result) => {
    if (err) {
      console.log("error", err);
    }
    console.log("result", result);
    res.send({ message: "Inserted Successfully!" });
  });
});

// update data
app.get("/user/:id", (req, res) => {
  let getId = req.params.id;
  let sql = `select * from std_angular where id = ${getId}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("error", err);
    }
    if (result.length > 0) {
      res.send({ message: "Selected Id Data==>", data: result });
    } else {
      res.send({ message: "Data not found!" });
    }
  });
});

app.put("/user/:id", (req, res) => {
  console.log("update data", req.body);
  let id = req.params.id;
  let Name = req.body.name;
  let Email = req.body.email;
  let Mobile = req.body.mobile;
  let updateSql = `update std_angular set name='${Name}',email='${Email}',mobile='${Mobile}' where id='${id}'`;

  db.query(updateSql, (err, result) => {
    if (err) {
      console.log("error", err);
    }
    console.log("result", result);
    res.send({ message: "updated Successfully!" });
  });
});

// Delete data
app.delete("/user/:id", (req, res) => {
  let DeleteId = req.params.id;
  let sql = `delete from std_angular where id = ${DeleteId}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send({ message: "Deleted Successfully!" });
    }
  });
});

app.listen(port, () => {
  console.log("server is Running==>", port);
});
