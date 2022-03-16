const http = require('http');
const url = require('url');
const fs = require('fs');

let archivo = '';
let contenido = '';
const dia = new Date().getDate();
const mes = new Date().getMonth();
const anio = new Date().getFullYear();
//7. Agrega la fecha actual al comienzo del contenido de cada archivo creado en formato
//“dd/mm/yyyy”. Considera que si el día o el mes es menor a 10 concatenar un “0” a la
//izquierda. 
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
            res.write(`(${fechaCompleta()}) - Archivo creado con exito!`);
            res.end();
        })        
    }
    //3. Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es
    //declarado en los parámetros de la consulta recibida.
    if(req.url.includes('/leer')){
        if(fs.existsSync(`./${archivo}`)){
            fs.readFile(archivo, (err, data) => {
                res.write(`(${fechaCompleta()}) - ${data}`);
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
                //8. En la ruta para renombrar, devuelve un mensaje de éxito incluyendo el nombre
                //anterior del archivo y su nuevo nombre de forma dinámica.
                res.write(`(${fechaCompleta()}) - El Archivo ${archivo} ha sido renombrado por ${nuevoArchivo}`);
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
        fs.existsSync(`${archivo}`)?(
            res.write(`Tu solicitud para eliminar el archivo ${archivo} se esta procesando
            `),
            fs.unlink(`${archivo}`, (err, data) =>{
                //9. En el mensaje de respuesta de la ruta para eliminar un archivo, devuelve el siguiente
                //mensaje: “Tu solicitud para eliminar el archivo <nombre_archivo> se está
                //procesando”, y luego de 3 segundos envía el mensaje de éxito mencionando el
                //nombre del archivo eliminado.
                setTimeout(function(){
                    //6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
                    //recibida.
                    res.write(` - (${fechaCompleta()}) - El archivo ${archivo} ha sido eliminado con exito!`);
                    res.end();
                })
            },3000))
                //6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
                //recibida.
            :(res.write(`El archivo indicado no existe!`));

        /* if(fs.existsSync(`${archivo}`)){
            fs.unlink(`${archivo}`, (err, data) => {
                //6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
                //recibida.
                res.write(`(${fechaCompleta()}) - Archivo ${archivo} eliminado con éxito`);
                res.end();
            })
        }else{
                
                res.write(`El archivo indicado no existe!`);
                res.end();
        }  */       
    }

}).listen
(8080, () => console.log('Escuchando el puerto 8080'));