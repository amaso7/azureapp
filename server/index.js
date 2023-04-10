const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// Initialize Express app
const app = express();
app.use(express.json())
// Use middlewares
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "saadh",
    password: "A11db2231*$",
    database: "mydb",
    port: 3306
})

app.post('/patientSignup', (req, res) => {
  const sql = "INSERT INTO mydb.patientdata (`firstname`,`lastname`,`email`,`password`,`dateofbirth`,`currentdoctor`) VALUES (?)";
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.password,
    req.body.dateofbirth,
    req.body.currentdoctor

  ]
  db.query(sql, [values], (err, data) => {
    if(err) {
      return res.json("Error");
    }
    return res.json(data)
  })
  
})

app.listen(8000, ()=> {
  console.log("...Server is running on port 8000")
})