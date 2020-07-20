var express = require('express');//Manda llamar modulo de express
var router = express.Router();//Se instancia la libreria de router

var LstPersonas = 
[
    {
        Id: 1,
        Src : "http://indicador60segundos.com/images/avatares/av06.png",
        Nombre : "Juan",
        Telefono : "1",
        Curp : "1",
        ECivil : "Soltero(a)",
        Edad : 1
    },
    {
        Id: 2,
        Src : "http://indicador60segundos.com/images/avatares/av06.png",
        Nombre : "Maria",
        Telefono : "2",
        Curp : "2",
        ECivil : "Casado(a)",
        Edad : 2
    },
    {
        Id: 3,
        Src : "http://indicador60segundos.com/images/avatares/av06.png",
        Nombre : "Chuy",
        Telefono : "3",
        Curp : "3",
        ECivil : "Viudo(a)",
        Edad : 3
    }
];
//var LstPersonas_ = [];

router.get('/getPersona', (req, res, next) =>
{
    //Consulta de base de datos
    res.send(LstPersonas);
});

router.get('/getPersonaByNombre/:Nombre', (req, res, next) =>
 {
     //Obtener parametro
     var Nombre = req.params.Nombre;
     var LstBusqueda = [];
     
     LstPersonas.forEach(persona => {
         if(persona.Nombre.toUpperCase().includes(Nombre.toUpperCase()))
         {
            LstBusqueda.push(persona);
         }
     });

     res.send(LstBusqueda);

     /*
     Para probar en el navegador se coloca esta ruta a lado de localhost:3000. Enseguida en vez 
     de :Id se coloca el Id que se desea, http://localhost:3000/api//getImgById/1 ...
     Para varios parametros http://localhost:3000/api//getImgById/:pUno/:pDos/:pTres
     */
 });

 router.post('/postPersona', (req, res, next) =>
 {
      /*var ObjImg =
      {
          Id : 0,
          Src : '',
          Link : '',
          Alt : '',
          Title : ''
      }*/
      var ObjPersona = new Object();
      
      //Los valores despues del .body deben ser igual a los del Postman
      ObjPersona.Nombre = req.body.Nombre;
      ObjPersona.Telefono = req.body.Telefono;
      ObjPersona.Curp = req.body.Curp;
      ObjPersona.ECivil = req.body.ECivil;
      ObjPersona.Edad = req.body.Edad;
      ObjPersona.Src = req.body.Src;

      //Insertar en base de datos
      ObjPersona.Id = LstPersonas.length + 1;

      LstPersonas.push(ObjPersona);
      //Responder a enviado de datos
      res.send(LstPersonas);
     /*Los datos en post no se ven en la ULR a comparacion de get*/
 });

 router.put('/putPersona/:Id', (req, res, next) =>
 {
    var Id = req.params.Id;
    //Consulta de base de datos
    var ObjPersona = new Object();

    ObjPersona.Nombre = req.body.Nombre;
    ObjPersona.Telefono = req.body.Telefono;
    ObjPersona.Curp = req.body.Curp;
    ObjPersona.ECivil = req.body.ECivil;
    ObjPersona.Edad = req.body.Edad;

    //Insertar en base de datos
    ObjPersona.Id = LstImg.length + 1;

    LstPersonas[Id - 1] = ObjPersona;
    //LstImg.push(ObjImg);

    res.send(LstPersonas);
 });

 router.delete('/delPersona', (req, res, next) =>
 {
    //var ObjImg = LstImg[Id - 1];
    LstPersona.pop();
    res.send(LstPersonas);
 });

 router.delete('/delPersonaById/:Id', (req, res, next) =>
 {
    var Id = req.params.Id;
    //Consulta de base de datos
    //var ObjImg = LstImg[Id - 1];
    LstPersona.splice(Id-1,1);
    //res.send("Elimiacion correcta\n\nLista: \n");
    res.send(LstPersonas);
 });


module.exports = router;