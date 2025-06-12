


class Validations {

    /**
     * Valida los datos de la solicitud para crear un nuevo usuario.
     * 
     * @author Johan Alexander Farfán Sierra <johanfarfan25@gmail.com>
     * 
     */
    static validateDataRequest(userData) {
        let errorMessaje = '';
        // Campos obligatorios
        const requiredFields = ['document_type', 'document_number', 'first_name', 'last_name', 'email', 'phone', 'genre'];
        for (const field of requiredFields) {
            if (!userData[field]) {
                errorMessaje = `El campo ${field} es obligatorio`;
            }
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            errorMessaje = 'El formato del correo electrónico es inválido';
        }

        //validacion del telefono
        if (!userData.phone || userData.phone.length < 10 || userData.phone.length > 15) {
            errorMessaje = 'El número de teléfono debe tener entre 10 y 15 dígitos';
        }

        if (errorMessaje.length > 0) {
            throw new Error(errorMessaje);
        }

        return userData;
    }
}

export default Validations;