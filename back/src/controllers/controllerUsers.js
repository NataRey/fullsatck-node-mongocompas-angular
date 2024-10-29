//paso 1 import bcrypt from 'bcryptjs'; para encriptar la contraseña 
import bcrypt from "bcryptjs";
//paso 2 importo el esquema del usuario para traer los datos del modelo 
import schemaUser from "../models/modelUsers.js";
//paso 4 importo randomstring que sirve para generar cadenas de caracteres aleatorios de forma sencilla y personalizada.
import randomstring from 'randomstring';
//paso 5 importo nodemailer que permite enviar correos electrónicos desde tus aplicaciones Node.js de forma sencilla y eficiente. Imagínate que quieres enviar un correo de bienvenida a un nuevo usuario cuando se registra en tu aplicación, o notificar a un administrador cuando ocurre un error en el servidor. Nodemailer te facilita mucho esta tarea.
import nodemailer from 'nodemailer';


//paso 3 creo los metodos que pertenecen al CRUD

//creo una constante para cada metodo

const ControllerUsers ={
    //crear usuario de manera asincrona para que envie una solicitud y reciba una respuesta
    //primera forma de hacerlo sin encriptar 
    // crearUsuario: async (solicitud,respuesta)=>{
  //   const {nombre, correoElectronico, contrasenia} = solicitud.body;
  //   respuesta.send("hola desde POST");
  //   console.log(solicitud.body);
  // },
    createUser: async(sol, res)=>{
        //usando el metodo try catch recib los datos y obtengo las respectivas respuestas
        try{
            const{name, email, password}= sol.body;
            console.log(sol.body);
            // creo una constante para encriptar la contrasena ingresada esperando con await que bcrypt la encripte segun los carateres que le indique
            const passwordProtected = await bcrypt.hash(password,10);
            //creo una constante que va a almacenar el usuario ya con la contrasena encriptada 
            const newUser = new schemaUser({
                name,
                email,
                password: passwordProtected,
            });
            console.log(newUser);
            //creo una constante para guardar el nuevo usuario en la base de datos
            const userCreate = await newUser.save();
            //uso una condicional para enviar la respuesta en formato JSON 
            if(userCreate._id){
                res.json({
                    result: 'fine',
                    message:'User create',
                    data: userCreate._id,
                });
            }
            //si ocurre algun error
        } catch(error){
            res.json({
                result: 'mistake',
                message:'An error occurred while creating the user',
                data: error,
            });
        }
    },

    // metodo para leer el usuaio creado
    readUser: async(sol, res)=>{
        //aqui usamos el metodo encontrar por id
        try{
            const userFound = await schemaUser.findById(
                sol.params.id
            );
            if(userFound._id){
                res.json({
                    result: 'fine',
                    message:'User found',
                    data: userFound,
                });
            }
        }catch(error){
            res.json({
                result: 'mistake',
                message:'An error occurred while reading the user',
                data: error,
            });  
        }
    },
    // metodo para leer todos los usuarios 

    readUsers: async(sol, res)=>{
        try{
            //aqui uso el metodo encontrar
            const allUserFound = await schemaUser.find();
                res.json({
                    result: 'fine',
                    message:'Users read',
                    data: allUserFound,
                });
        }catch(error){
            res.json({
                result: 'mistake',
                message:'An error occurred while reading all users',
                data: error,
            });  
        }
    },

    // metodo para actualizar
    updateUser: async(sol,res)=>{
        try{
            const userUpdate = await schemaUser.findByIdAndUpdate(
                sol.params.id,
                sol.body
            );
            if(userUpdate._id){
                res.json({
                    result: 'fine',
                    message:'User update',
                    data: userUpdate._id,
                });
            }
        }catch(error){
            res.json({
                result: 'mistake',
                message:'An error occurred while update user',
                data: error,
            }); 
        }
    },

//metodo para eliminar usuario

deleteUser: async(sol,res)=>{
    try{
        const userDelete = await schemaUser.findByIdAndDelete(sol.params.id);
        if(userDelete._id){
            res.json({
                result: 'fine',
                message:'User delete',
                data: null,
            });
        }
    }catch(error){
        res.json({
            result:'mistake',
            message: 'An error ocurred while delete user',
            data: error,
        })
    }
},
// paso 6  creo una funcion para recuperar la contrasena
async forgotPassword(sol,res){
    try{
        const user= await schemaUser.findOne({email: sol.body.email});
        if(!user){
            return res.status(404).json({
                message:'User not found'
            });
        }
        const newPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    await sendEmail(user.email, newPassword);

    res.json({ message: 'Password reset email sent' });

    }catch(error){
        console.error(error);
        res.status(500).json({
            message:'Error resetting password'
        });
    }
}
}
//paso 7 creo una funcion para generar el nuevo password aleatorio y poder enviar el correo desde un correo administrador 
function generateRandomPassword() {
    return randomstring.generate({
      length: 10,
      charset: 'alphanumeric'
    });
  }
  
  async function sendEmail(email, password) {
    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'basedatospruebas@gmail.com', // Reemplaza con tu correo
        pass: 'BaSeSd3d4t0s*' // Reemplaza con tu contraseña
      }
    });
  
    // Crear el correo
    const mailOptions = {
      from: 'basedatospruebas@gmail.com',
      to: email,
      subject: 'Restablecimiento de contraseña',
      text: `Tu nueva contraseña es: ${password}`
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Correo enviado exitosamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
};
export default ControllerUsers;

// ahora voy a la rutas para realizar el enrutamiento creando un archivo para enrutar los usuarios





