const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'wil_project'
})

app.post("/registration", (req, res) =>{

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const typeOfFarmer = req.body.typeOfFarmer;

    db.query("INSERT INTO user (firstName, lastName, email, password, dob, gender, typeOfFarmer) VALUES (?,?,?,?,?,?,?)",
    [firstName, lastName, email, password, dob, gender, typeOfFarmer],
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Values Inserted!")
        }
    }
    );
})

app.post("/login", (req, res) =>{

    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM user WHERE email = ? AND password = ?",
    [username,password],
    (err, result) => {
        if(err){
            res.send({err : err})
        }

        if(result.length > 0) {
            res.send(result);
        } else {
            res.send({message : "Wrong username/password combination!!"})
        }
    }
    );
})

app.listen(3005, () =>{
    console.log("yes the server is working in port 3005!!")
})