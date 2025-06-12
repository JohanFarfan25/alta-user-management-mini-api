import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './routes/UserRoutes.js';
import db from './config/db.js';

db.connect(error => {
    if (error) {
        console.error('Error al conectar:', error);
        return;
    }
    console.log('Conexión exitosa a la base de datos!');
});

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/api', userRoutes);

// Errores del Middleware
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: '¡Algo salió mal!' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
}
);