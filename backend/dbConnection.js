//database con
const mysql = require("mysql");
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'metanoia'
})

con.connect((err)=> {
    if(err){
        console.log("err");
    }else{
        console.log("database Connected!");
    }
})

module.exports = con;