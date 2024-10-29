// luego de crear la variable de entorno importo mongoose
import mongoose from "mongoose";
//activo mongoose
mongoose
// creo una funcion llamada conect a la cual le voy a decir que se conecte con la base de datos en el proceso de recibir la variable de entorno que esta en el archivo .env
.connect(process.env.URLMONGO)
//si recibo un dato de conexion exitoso envio un mensaje por consola indicando que se conecto de forma exitosa 
.then((dato)=>{
    console.log("conectado con exito a la BD");
    // de lo contrario envio un mensaje de error
}).catch((error)=>{
    console.log("error al conectarse a la BD");
});