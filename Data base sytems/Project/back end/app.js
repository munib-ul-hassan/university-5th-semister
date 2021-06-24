var express = require('express')
var user = new express()
var body = require('body-parser')
user.use(body.json());
var conect = require('./connection')
var sql = require("sql")


var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "DBproject"

});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


// Create table
user.get('/addtable', (req, res) => {
    let sql = 'CREATE TABLE Productlist(id int AUTO_INCREMENT, Name VARCHAR(255), PRIMARY KEY(id),product_type VARCHAR(255), size varchar(255), color VARCHAR(255),category varchar(255))';
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});
user.post('/adddata', async (req, res, next) => {
    var id;
    let sql = 'select * from productlist WHERE name = ?';
    let data = con.query(sql, [req.body.name], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length <= 0) {

            let sql1 = 'INSERT INTO productlist SET ?';
            let values = {
                Name: req.body.name,
                product_type: req.body.producttype,
                size: req.body.size,
                color: req.body.color,
                category: req.body.category
            };
            con.query(sql1, values, (err, result) => {
                if (err) throw err;
                console.log(result);
                res.status(200).send("Data inserted")
            })

        } else {
            let sql2 = 'update Productlist SET name=?,size=?,color=?,category=?,product_type=? where name = ?';
            let values = [req.body.name, req.body.size, req.body.color, req.body.category, req.body.producttype, req.body.name];
            con.query(sql2, values, (err, result) => {
                if (err) throw err;
                console.log(result);
            })
        }
    })
})


user.get('/delete', (req, res) => {
    let sql = 'DELETE FROM PRODUCTLIST WHERE ID = ?'
    con.query(sql, [req.body.id], (err, result) => {
        if (err) {
            console.log(err);
        }
 
        console.log(result);
        res.status(200).send("Data deleted")
    })
})
user.get('/', (req, res) => {
    console.log("//");
    let sql = 'select * from productlist';
    con.query(sql, (err, result) => {
        console.log(result);
        res.status(200).json({ data: result })
     })
})
user.listen(3000, (err, reslt) => {
    console.log("Server is running");
})