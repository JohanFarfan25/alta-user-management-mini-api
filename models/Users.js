
import BaseModel from './BaseModel.js';
import dayjs from 'dayjs';

class User extends BaseModel {

    constructor() {
        super('users');

        this.columns = [
            'id',
            'uuid',
            'document_type',
            'document_number',
            'first_name',
            'last_name',
            'email',
            'phone',
            'genre',
            'status',
            'created_at',
            'updated_at',
            'created_at_db',
            'update_at_db'
        ];
    }

    async findAll(conditions = {}) {
        return this.find(conditions);
    }

    async findById(id) {
        return this.findFirst({ id });
    }

    async create(data) {
        data.uuid = this.generateUUID();
        data.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
        return this.save(data);
    }

    async modify(id, data) {
        data.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
        return this.update(id, data);
    }

    async delete(id) {
        return this.softDelete(id);
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export default User;
