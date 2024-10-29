//paso 1: importo schema que le indica a la maquina que voy a usar un esquema o coleccion de datos para mi bd

import { Schema, model } from 'mongoose';
//paso 2 creo la coleccion de datos que voy a usar para el usuario 
const schemaUser = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
//ppsso 3: exporto la variable que ya contien los datos del esquema 
export default model('User', schemaUser);
//paso 4: voy a mi carpeta controllers para crear mis controladores 