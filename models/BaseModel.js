import db from '../config/db.js';

class BaseModel {


    constructor(tableName) {
        this.tableName = tableName;
        this.db = db;
    }

    /**
     * Busca registros en la tabla según las condiciones indicadas.
     * 
     * @author Johan Alexander Farfán Sierra <johanfarfan25@gmail.com>
     * @param {Object} [conditions={}] - Condiciones de búsqueda (ej: { id: 1, name: 'Juan' }).
     * @returns {Promise<Array>} - Lista de registros encontrados.
     * 
     */
    async find(conditions = {}) {
        let query = `SELECT * FROM ${this.tableName}`;
        const params = [];

        if (Object.keys(conditions).length > 0) {
            const whereClauses = Object.keys(conditions).map(key => {
                params.push(conditions[key]);
                return `${key} = ?`;
            });
            query += ` WHERE ${whereClauses.join(' AND ')}`;
        }
        const [rows] = await db.query(query, params);
        return rows;
    }


    /**
     * Busca el primer registro que coincida con las condiciones indicadas.
     * 
     * @author Johan Alexander Farfán Sierra <johanfarfan25@gmail.com>
     * @param {Object} [conditions={}] - Condiciones de búsqueda (ej: { id: 1, name: 'Juan' }).
     * @returns {Promise<Object|null>} - El primer registro encontrado o null si no hay coincidencias.
     * 
     */
    async findFirst(conditions = {}) {
        const rows = await this.find(conditions);
        return rows.length > 0 ? rows[0] : null;
    }

    /**
     * Guarda un nuevo registro en la tabla.
     * 
     * @author Johan Alexander Farfán Sierra <johanfarfan25@gmail.com>
     * @param {Object} data - Datos del registro a guardar (ej: { name: 'Juan', age: 30 }).
     * @returns {Promise<Object>} - El registro guardado con su ID.
     * 
     */
    async save(data) {
        data.uuid = this.generateUUID();
        const [result] = await this.db.query(`INSERT INTO ${this.tableName} SET ?`, [data]);
        return result;
    }

    /**
     * Actualiza un registro existente en la tabla.
     * 
     * @author Johan Alexander Farfán Sierra <johanfarfan25@gmail.com>
     * @param {number} id - ID del registro a actualizar.
     * @param {Object} data - Nuevos datos del registro (ej: { name: 'Juan', age: 31 }).
     * 
     */
    async update(id, data) {
        await db.query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [data, id]);
    }


    /**
     * Realiza un soft delete de un registro estableciendo su estado a 0 por integridad de la data no se elimina para guardar el historial o controil de registros.
     * 
     * @author Johan Alexander Farfán Sierra <johanfarfan25@gmail.com>
     * @param {number} id - ID del registro a eliminar.
     * @param {Object} model - Modelo del registro a eliminar.
     * @returns {Promise<void>} - No retorna nada, pero actualiza el estado del registro a 0.
     * 
     */
    async softDelete(id, model) {
        model.status = 0; // Soft delete by setting status to 0
        this.update(id, model);// Soft delete by setting status to 0
    }

}

export default BaseModel;