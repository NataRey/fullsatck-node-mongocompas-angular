import path from "path";//paso 8: me ayuda a trazar el camino a seguir de los enrutamientos 
import express from 'express';// paso 1: para poder realizar la conexion con el servidor
import morgan from"morgan";//paso 2: es util para depurar y monitorear el trafico de la aplicacion usando el dev
import cors from "cors";//paso 9: permitiendo que aplicaciones de diferentes orígenes se comuniquen entre sí
import routerUsers from './routers/routerUsers.js';//paso 10: me permite indicar el enrutamiento ya configurado para conectarse a treavez del servidor 


// ingreso el siguiente codigo 

const servidor = express(); //Paso 3:para realizar la conexion con la constante servidor 
servidor.use(cors());// paso 11
servidor.use(morgan("dev"));//paso 4
servidor.use(express.json());//paso 5
servidor.use('/users',routerUsers); //paso 12 agregar las demas rutas como vayan saliendo

servidor.get('/', (sol, res)=>{
    res.status(404).send("No encontrado");
}); //paso 6: por si no encuentra la conexion me enviara esta respuesta 

export default servidor;//paso 7