var express = require('express');//Manda llamar modulo de express
var router = express.Router();//Se instancia la libreria de router
var mysql = require ('mysql');

//console.log(__dirname.split("routes")[0] + "public/Img");
var Multipart = require('connect-multiparty');
var MiddlewareMultipart = Multipart({
    uploadDir : __dirname.split("routes")[0] + "public/Img"
});

var conn = mysql.createConnection({
    host: "", //Ip
    user : "",
    password : "",
    database : "Formulario_1"
});

conn.connect((err) => 
{
    if(err)
    {
        console.log("Error: " + err);
    }
    else
    {
        console.log("Conectado");
    }
});

router.get("/getPersonas", (req,res, next) =>
{
    var query = "CALL getPersonas()";
    
    conn.query(query, true, (err, results, fields) =>
    {
        if(err)
        {
            console.log("Error" + err);
            res.send("Error" + err);
        }
        else
        {
            console.log(results);
            res.send(results);
        }
    });
});

router.get("/getPersonasByNombre/:Nombre", (req,res, next) =>
{
    var Nombre = req.params.Nombre;
    var query = "CALL getPersonasNombre(?)";
    
    conn.query(query, Nombre, (err, results, fields) =>
    {
        if(err)
        {
            console.log("Error" + err);
            res.send("Error" + err);
        }
        else
        {
            console.log(results);
            res.send(results);
        }
    });
});

router.post("/postPersona", MiddlewareMultipart, (req, res, next) =>
{
    //console.log("." + req.files.Src.path.split("public")[1]);
    //console.log(req.body);

    var query = 'CALL addPersona(?,?,?,?,?,?)';
    var imgPath = "http://localhost:3000" + req.files.Src.path.split("public")[1];
    //imgPath = imgPath.replace("\\Img\\", "/Img/");

    var datos = 
    [
        req.body.Nombre,
        req.body.Telefono,
        req.body.Curp,
        req.body.ECivil,
        Number(req.body.Edad),
        imgPath
    ]

    conn.query(query, datos, (err, results, fields) =>
    {
        if(err)
        {
            console.log("Error" + err);
            res.send(JSON.stringify("Error: " + err));
        }
        else
        {
            console.log(results);
            res.send(JSON.stringify(results));
        }
    });
});

router.put("/putPersonaById", MiddlewareMultipart, (req, res, next) =>
{
    //console.log("." + req.files.Src.path.split("public")[1]);
    //console.log(req.body);

    var query = "CALL updatePersona(?,?,?,?,?,?,?)";
    var imgPath = "http://localhost:3000" + req.files.Src.path.split("public")[1];
    //imgPath = imgPath.replace("\\Img\\", "/Img/");


    var datos = 
    [
        Number(req.body.Id),
        req.body.Nombre,
        req.body.Telefono,
        req.body.Curp,
        req.body.ECivil,
        Number(req.body.Edad),
        imgPath
    ]

    conn.query(query, datos, (err, results, fields) =>
    {
        if(err)
        {
            console.log("Error" + err);
            res.send(JSON.stringify("Error: " + err));
        }
        else
        {
            console.log(results);
            res.send(JSON.stringify(results[0]));
        }
    });
});

router.delete("/delPersonaById/:Id", (req, res, next) => 
{
    var Id = Number(req.params.Id);
    var query = "CALL deletePersona(?)";

    var datos = [Id];

    conn.query(query, datos, (err, results, fields) =>
    {
        if(err)
        {
            console.log("Error" + err);
            res.send(JSON.stringify("Error: " + err));
        }
        else
        {
            console.log(results);
            res.send(JSON.stringify(results[0]));
        }
    });
});


module.exports = router;