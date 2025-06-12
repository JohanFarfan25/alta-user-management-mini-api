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
}

export default UsersController;