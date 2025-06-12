import db from '../config/db.js';

class BaseModel {
    

    constructor(tableName) {
        this.tableName = tableName;
        this.db = db;
    }

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

    async findFirst(conditions = {}) {
        const rows = await this.find(conditions);
        return rows.length > 0 ? rows[0] : null;
    }

    async save(data) {
        const [result] = await this.db.query(`INSERT INTO ${this.tableName} SET ?`, [data]);
        return result;
    }

    async update(id, data) {
        await db.query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [data, id]);
    }

    async softDelete(id) {
        this.update(id, 'status = 0');// Soft delete by setting status to 0
    }

}

export default BaseModel;