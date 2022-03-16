const http = require('http');
const url = require('url');
const fs = require('fs');

let archivo = '';
let contenido = '';

//1. Crear un servidor en Node con el módulo http
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' }); // agregar nueva informacion al html (reescribiendo info)

    const params = url.parse(req.url, true).query;
    archivo = params.archivo;
    contenido = params.contenido;
    nuevoArchivo = params.nuevoArchivo;

    //2. Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta
    //recibida.
    if(req.url.includes('/crear')){
        fs.writeFile(archivo, contenido, () => {
            //6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
            //recibida.
            res.write('Archivo creado con exito!');
            res.end();
        })        
    }
    //3. Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es
    //declarado en los parámetros de la consulta recibida.
    if(req.url.includes('/leer')){
        if(fs.existsSync(`./${archivo}`)){
            fs.readFile(archivo, (err, data) => {
                res.write(data);
                res.end();
            });
        }else{
                //6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
                //recibida.
                res.write('El archivo indicado no existe!');
                res.end();
        }     
    }
    //4. Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es
    //declarado en los parámetros de la consulta recibida.
    if(req.url.includes('/renombrar')){
        if(fs.existsSync(`./${archivo}`)){
            fs.rename(`${archivo}`, `${nuevoArchivo}`, (err, data) => {
                //6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
                //recibida.
                res.write(`Archivo ${archivo} renombrado por ${nuevoArchivo}`);
                res.end();
            })
        }else{
                //6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
                //recibida.
                res.write(`El archivo indicado no existe!`);
                res.end();
        }
    }
    //5. Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los
    //parámetros de la consulta recibida.
    if(req.url.includes('/eliminar')){
        if(fs.existsSync(`${archivo}`)){
            fs.unlink(`${archivo}`, (err, data) => {
                //6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
                //recibida.
                res.write(`Archivo ${archivo} eliminado con éxito`);
                res.end();
            })
        }else{
                //6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
                //recibida.
                res.write(`El archivo indicado no existe!`);
                res.end();
        }        
    }

}).listen
(8080, () => console.log('Escuchando el puerto 8080'));