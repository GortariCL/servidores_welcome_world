//Importacion de modulos
const http = require('http');
const url = require('url');
const fs = require('fs');

//Declaracion de variables
let archivo = '';
let contenido = '';
const dia = new Date().getDate();
const mes = new Date().getMonth();
const anio = new Date().getFullYear();
//Requerimiento 7
//Generador de fecha
const fechaCompleta = () => {
    if(dia < 10 && mes < 10){
        return `0${dia}/0${mes + 1}/${anio}`;
    }else if(dia < 10){
        return `0${dia}/${mes + 1}/${anio}`;
    }else if(mes < 10){
        return `${dia}/0${mes + 1}/${anio}`;
    }else{
        return `${dia}/${mes + 1}/${anio}`;
    }
}

//Requerimiento 1
//Creacion servidor con modulo http
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' }); // agregar nueva informacion al html (reescribir info)
    //Almacenar los parametros recibidos
    const params = url.parse(req.url, true).query;
    archivo = params.archivo;
    contenido = params.contenido;
    nuevoArchivo = params.nuevoArchivo;
    //Requerimiento 2    
    if(req.url.includes('/crear')){
        if(archivo == '' || contenido == ''){
            //Requerimiento 6
            res.write('No se creo el archivo! Debe ingresar información');
            res.end();
        }else{
            fs.writeFile(archivo, contenido, () => {
                //Requerimiento 6
                res.write(`(${fechaCompleta()}) - Archivo creado con exito!`);
                res.end();
            })     
        }
    }
    //Requerimiento 3
    if(req.url.includes('/leer')){
        if(fs.existsSync(`./${archivo}`)){
            fs.readFile(archivo, (err, data) => {
                res.write(`(${fechaCompleta()}) - ${data}`);
                res.end();
            });
        }else{
                //Requerimiento 6
                res.write('El archivo indicado no existe!');
                res.end();
        }     
    }
    //Requerimiento 4
    if(req.url.includes('/renombrar')){
        if(fs.existsSync(`./${archivo}`)){
            fs.rename(`${archivo}`, `${nuevoArchivo}`, (err, data) => {
                //Requerimiento 6 || Requerimiento 8
                res.write(`(${fechaCompleta()}) - El Archivo ${archivo} ha sido renombrado por ${nuevoArchivo}`);
                res.end();
            })
        }else{
                //Requerimiento 6
                res.write(`El archivo indicado no existe!`);
                res.end();
        }
    }
    //Requerimiento 5
    if(req.url.includes('/eliminar')){
        fs.existsSync(`${archivo}`)?(
            res.write(`Tu solicitud para eliminar el archivo ${archivo} se esta procesando
            `),
            fs.unlink(`${archivo}`, (err, data) =>{
                //Requerimiento 9
                setTimeout(function(){
                    //Requerimiento 6
                    res.write(` - (${fechaCompleta()}) - El archivo ${archivo} ha sido eliminado con exito!`);
                    res.end();
                })
            },3000))
                //Requerimiento 6
            :(res.write(`El archivo indicado no existe!`));      
    }

}).listen
(8080, () => console.log('Escuchando el puerto 8080'));