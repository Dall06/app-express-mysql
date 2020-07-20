/*
<div class="col"><img alt="*" height="50" width="50" src="
https://image.flaticon.com/icons/png/512/16/16363.png"
></div><div class="col"><div class="row"><div><img src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-person_90382.png" height="20" width="20"><b>Nombre: </b><label id = "lblNombre">
Vacio
</label></div><br><div><img src="https://image.freepik.com/iconos-gratis/telefono-auricular_318-1028.jpg" height="20" width="20"><b>Telefono: </b><label id="">
Vacio
</label></div></div><div class="row"><div><img src="https://image.flaticon.com/icons/svg/56/56239.svg" height="20" width="20"><b>Curp: </b><label>
Vacio
</label>
</div></div><div class="row"><div><img src="https://cdn3.iconfinder.com/data/icons/wedding-35/512/Anniversary_engagement_heart_ring_rings_valentine_wedding-512.png" height="20" width="20"><b>Estado civil: </b><label>
Vacio
</label></div><div><div><img src="https://www.viscoform.es/wp-content/uploads/2015/07/icon-edad.png" height="20" width="20"><b>Edad: </b><label>
Vacio
</label></div></div></div></div>
 */

var LstPersonas = [];
var _LstPersonas = [];

//Variables extraidas del HTML
var ImgSrc = document.getElementById("btnImg");
var imgSrc2 = document.getElementById("txtImgUrl");
var IdSrc = document.getElementById("txtId");
var NomSrc = document.getElementById("txtNombre");
var TelSrc = document.getElementById("txtTelefono");
var CurpSrc = document.getElementById("txtCurp");
var EstCSrc = "";
var selectionC = () =>
{
    var estadoC = document.getElementById("selEstadoC");
    EstCSrc = estadoC.options[estadoC.selectedIndex].text;
}
var EdadSrc = document.getElementById("txtEdad");

//Limpiar lista
var Reset = () =>
{
    $("#blockPersonas").empty();
    LstPersonas = [];
    getDatos();
}

//LECTURA
var getDatos = () =>
{

    var url = "http://localhost:3000/apiMYSQL/getPersonas";
    console.log("CARGAR Datos");

    fetch(url).then((res) => {return res.json();}).then(data =>
    {
        $("#blockPersonas").empty();

        LstPersonas = data[0];

        LstPersonas.forEach(elemento =>
        {
            LlenadoInformacion(elemento);
        });
    }).catch(function(error){console.log(error)});
}

getDatos();

//AGREGAR
var Agregar = () =>
{
    document.getElementById("txtId").value = 0;
    var formData = new FormData();
    formData.append("Nombre", NomSrc.value);
    formData.append("Telefono", TelSrc.value);
    formData.append("Curp", CurpSrc.value);
    formData.append("ECivil", EstCSrc);
    formData.append("Edad", EdadSrc.value);
    
    if(!ImgSrc.files[0])
    {
        alert("Selecciona una imagen");
    }
    formData.append("Src", ImgSrc.files[0]);

    var url = "http://localhost:3000/apiMYSQL/postPersona";

    fetch(url, {
        method : "POST", 
        body : formData
    })
    .then((response) => 
    {
        return response.json();
    })
    .then((data) =>
    {
        console.log(data);
        $("#blockPersonas").empty();

        LstPersonas = data[0];
        LstPersonas.forEach(elemento =>
        {
            LlenadoInformacion(elemento);
        });
    })
    .catch((error) => 
    {
        console.log("Error: " + error);
    });
}

//BUSQUEDA
var Buscar = () =>
{
    var Busqueda = document.getElementById("txtBusqueda");
    //var Lst   var 
    var url = "http://localhost:3000/apiMYSQL/getPersonas";
    console.log("CARGAR Datos");

    fetch(url).then((res) => {return res.json();}).then(data =>
    {
        $("#blockPersonas").empty();

        LstPersonas = data[0];

        LstPersonas.forEach(elemento =>
        {
            if(elemento.Nombre.toUpperCase().includes(Busqueda.value.toUpperCase()))
            LlenadoInformacion(elemento);
        });
    }).catch(function(error){console.log(error)});
}

//ACTUALIZAR
var Actualizar = () =>
{
    var formData = new FormData();
    formData.append("Id", IdSrc.value);
    formData.append("Nombre", NomSrc.value);
    formData.append("Telefono", TelSrc.value);
    formData.append("Curp", CurpSrc.value);
    formData.append("ECivil", EstCSrc);
    formData.append("Edad", EdadSrc.value);

    if(ImgSrc.files[0])
    {
        formData.append("Src", ImgSrc.files[0]);
    }
    else
    {
        formData.append("Src", imgSrc2.value);
    }

    var url = "http://localhost:3000/apiMYSQL/putPersonaById";

    fetch(url, {method : "PUT", body : formData}).then((response) => 
    {
        return response.json();
    })
    .then((data) =>
    {
        console.log(data);
        $("#blockPersonas").empty();
        LstPersonas = data;
        LstPersonas.forEach(elemento =>
        {
            LlenadoInformacion(elemento);
        });
        
    })
    .catch((error) => 
    {
        console.log("Error: " + error);
    })
}

var Configurar = (id) =>
{
    var idAux = id;
    var estadoC = document.getElementById("selEstadoC");

    LstPersonas.forEach(element =>
    {
        if(element.Id === idAux)
        {
            document.getElementById("txtNombre").value = element.Nombre;
            document.getElementById("txtTelefono").value = element.Telefono;
            document.getElementById("txtCurp").value = element.Curp;
            document.getElementById("txtEdad").value = element.Edad;
            document.getElementById("txtId").value = element.Id;
            document.getElementById("txtImgUrl").value = element.UrlImg;
            for(let i = 0; i < estadoC.options.length; i++)
            {
                if(estadoC.options[i].text === element.EstCivil)
                {
                    estadoC.options[i].selected = true;
                }
            }
            console.log(document.getElementById("txtImgUrl").value);
        }
    });
}

//ELIMINAR
var Eliminar = (id) =>
{
    var idaux = id;
    var url = "http://localhost:3000/apiMYSQL/delPersonaById/"+idaux;
    /*{method : "DELETE", body : JSON.stringify({Id:IdSrc.value})}*/

    fetch(url,{method : "DELETE"}).then((response) =>
    {
        return response.json();
    })
    .then((data) =>
    {
        console.log(data);
        $("#blockPersonas").empty();
        LstPersonas = data;
        LstPersonas.forEach(elemento =>
        {
            LlenadoInformacion(elemento);
        });
    })
    .catch((error) => 
    {
        console.log("Error: " + error);
    })
}


var c1 = '</div><div class="row" style="border-style: solid"><div class="col-4" ><img id="UrlImg" height="50" width="50" src="';
var c2 = '"></div><div class="col-8"><div class="row"><div><img src="./img/User.png" height="20" width="20"><b>Nombre: </b><label id="lblNombre">';
var c3 = '</label></div><br><div><img src="./img/Phone.png" height="20" width="20"><b>Telefono: </b><label id="lblTelefono">';
var c4 = '</label></div></div><div class="row"><div><img src="./img/Info.png" height="20" width="20"><b>Curp: </b><label id="lblCurp">';
var c5 = '</div></div><div class="row"><div><img src="./img/Ring.png" height="20" width="20"><b>Estado civil: </b><label id="lblEciv">';
var c6 = '</label></div><div><div><img src="./img/Old.png" height="20" width="20"><b>Edad: </b><label id="lblEdad">';
var c7 = '</label></div></div></div><div><button onclick="Configurar()" class="btn btn-primary row btn-sm" ><h4>Configurar</h4></button></div><div><button onclick="Configurar()" class="btn btn-primary row btn-sm" ><h4>Configurar</h4></button></div></div></div>';
var c8 = '<br><div>';

//LLENADO DE INFORMACION MEDIANTE LA LISTA
var LlenadoInformacion = (element) =>
{   
    var  elemento = c1;
         elemento += element.UrlImg;
         //console.log(element.UrlImg);
         elemento += c2;
         elemento += element.Nombre;
         elemento += c3;
         elemento += element.Telefono;
         elemento += c4;
         elemento += element.Curp;
         elemento += c5;
         elemento += element.EstCivil;
         elemento += c6;
         elemento += element.Edad;
         elemento += '</label></div></div></div><div><button onclick="Configurar('+element.Id+')" class="btn btn-primary row btn-sm" ><h4>Configurar</h4></div><div><button onclick="Eliminar('+element.Id+')" class="btn btn-primary row btn-sm" ><h4>Eliminar</h4></button></div></div></div>';         ;
         elemento += c8;
         //_LstPersonas[i++] = element.Id;

    $("#blockPersonas").append(elemento);
}