import Users from '../models/Users.js';
import Validations from '../UseCases/Users/Validations.js';
class UsersController {

    /**
     * Crea un nuevo usuario en la base de datos.
     * 
     * @author Johan Alexander Farfán Sierra <johanfarfan25@gmail.com>
     * @param {Object} req - Objeto de solicitud que contiene los datos del usuario.
     * @param {Object} res - Objeto de respuesta para enviar la respuesta al cliente.
     * 
     */
    addAction = async (req, res) => {
        try {

            //Validacion de datos
            await Validations.validateDataRequest(req.body);

            // Usuario ya existe
            const existingUser = await (new Users).findFirst({ document_type: req.body.document_type, document_number: req.body.document_number, status: 1 });
            if (existingUser?.id) {
                throw new Error(`Ya existe un usuario con este tipo de documento ${existingUser.document_type}  y numero de documento ${existingUser.document_number}`);
            }
            // Crear usuario
            const user = await (new Users).create(req.body);
            res.status(201).json({ message: 'Usuario creado exitosamente', user });
        } catch (error) {
            res.status(500).json({ message: error.message, error });
        }
    }

    /**
     * Obtiene todos los usuarios activos de la base de datos.
     * 
     * @author Johan Alexander Farfán Sierra <johanfarfan25@gmail.com>
     * @param {Object} req - Objeto de solicitud que contiene los parámetros de la solicitud.
     * @param {Object} res - Objeto de respuesta para enviar la respuesta al cliente.
     * 
     */
    getAllAction = async (req, res) => {
        try {
            // Obtener todos los usuarios
            const users = await (new Users).findAll({ status: 1 });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message, error });
        }
    }


    /**
     * Obtiene un usuario por su ID.
     * 
     * @author Johan Alexander Farfán Sierra <johanfarfan25@gmail.com>
     * @param {Object} req - Objeto de solicitud que contiene el ID del usuario en los parámetros.
     * @param {Object} res - Objeto de respuesta para enviar la respuesta al cliente.
     * 
     */
    getByIdAction = async (req, res) => {
        try {
            // Validar ID
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                throw new Error('ID de usuario inválido');
            }

            // Buscar usuario por ID
            const user = await (new Users).findById(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message, error });
        }
    }
}

export default UsersController;