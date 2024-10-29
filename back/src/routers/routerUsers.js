//paso 1 importo router de express
import {Router} from 'express';
//paso 2 importo el controlador de usuarios sin olvidar el .js
import ControllerUsers from '../controllers/controllerUsers.js';
//paso 3 creo una constante para enrutar mis metodos del CRUD
const routerUsers =Router();
//metodo post para crear
routerUsers.post('/',ControllerUsers.createUser);
//metodo get para traer la informacion por id
routerUsers.get('/:id',ControllerUsers.readUser);
//metodo get para traer informacion
routerUsers.get('/',ControllerUsers.readUsers);
//metodo put para actualizar
routerUsers.put('/:id',ControllerUsers.updateUser);
//metodo delete para eliminar 
routerUsers.delete('/:id',ControllerUsers.deleteUser);
//paso 4 metodo para manejar las solicitudes de recuperación de contraseña
routerUsers.post('/forgot-password', async(sol, res)=>{
    const{email} = sol.body;
});

//exporto por defecto el enrutador de usuarios

export default routerUsers;

//paso 4 voy al servidor para importar path, cors, e indicar las rutas a las cuales se va a conectar 


