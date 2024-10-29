import servidor from "./servidor.js";//paso 1: importo el servidor que acabo de configurar
import "dotenv/config"; //paso 4: estos pasos los realizo despues de hacer la conexion ala bd importo dotenv para que podamos leer la ruta de nuestra variable de entorno 
import "./conexion.js"//paso 5: importo la conexion que se acaba de realizar para que nos valide si nos conectamos con exito a la BD


//paso 2: indico que el servidor esta escuchando en el link http://localhost:3000
servidor.listen(3000, ()=>{
    console.log("El servidor se esta escuchando en el link http://localhost:3000")
});
/**Paso 3 
 * # package.json
cambio la ruta de conexion en el package.json para poder conectarme con morgan para poder realizar las depuraciones automaticamente a mi codigo 
* en el main pongo la ruta del src/index.js
* en los scripts  agrego el objeto "start" de la siguiente manera:  "start": "node src/index.js", creo un nuevo objeto llamado dev y uso nodemon mas la ruta del main de la siguiente forma "dev": "nodemon src/index.js",
* dentro de los keywords creo un objeto llamado type indicando que voy a usar module
 */

/*Paso 6: Luego de ver exitosa la conexion tanto en el servidor 3000 como en la base de datos 
dentro de nuestro archivo src creamos tres carpetas
* models
* controllers
* routes*/

//voy a models


