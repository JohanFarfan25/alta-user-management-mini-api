
# 📌 Alta User Management API (Node.js + MySQL)

API RESTful para gestión de usuarios con operaciones CRUD (Create, Read, Update, Delete).

---

## 📋 Tabla de Contenidos

- [🛠 Requisitos Previos](#-requisitos-previos)
- [⚙️ Configuración Inicial](#️-configuración-inicial)
- [🚀 Ejecutar el Proyecto](#-ejecutar-el-proyecto)
- [🔍 Endpoints Disponibles](#-endpoints-disponibles)
- [📤 Ejemplos de Peticiones](#-ejemplos-de-peticiones)
- [📬 Contacto](#-contacto)

---

## 🛠 Requisitos Previos

| Componente  | Windows                                                                 | Linux/macOS                                                                                     |
|-------------|--------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **Node.js** | [Descargar instalador](https://nodejs.org/en) (LTS v23.8.0+)                | `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`<br>`sudo apt install -y nodejs` |
| **MySQL**   | [Descargar instalador](https://dev.mysql.com/downloads/mysql/) (v8.0+)  | `sudo apt update && sudo apt install mysql-server`<br>`sudo mysql_secure_installation`          |
| **Git**     | [Descargar instalador](https://git-scm.com/) (Opcional)                 | `sudo apt install git`                                                                          |

---

## ⚙️ Configuración Inicial

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/JohanFarfan25/alta-user-management-mini-api.git
cd alta-user-management-mini-api
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar la base de datos (MySQL)

Ejecutar el siguiente query en MYSQL:

```sql
CREATE SCHEMA `alta-mini-api`;

CREATE TABLE `alta-mini-api`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `document_type` VARCHAR(45),
  `document_number` VARCHAR(255),
  `first_name` VARCHAR(255),
  `last_name` VARCHAR(255),
  `email` VARCHAR(255),
  `phone` VARCHAR(255),
  `genre` ENUM('Masculino', 'Femenino', 'No definido'),
  `status` TINYINT(1) DEFAULT 1,
  `created_at` DATETIME,
  `updated_at` DATETIME,
  `created_at_db` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_at_db` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC)
);
```

### 4️⃣ Configurar variables de entorno

Crear un archivo `.env` en la raíz con el siguiente contenido:

```env
PORT=3000
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=alta-mini-api
DB_USERNAME=root
DB_PASSWORD=tu_contraseña
```

---

## 🚀 Ejecutar el Proyecto

```bash
npm run dev
```

✅ Salida esperada:

```bash
Server running on port 3000
```

---

## 🔍 Endpoints Disponibles

| Método | Endpoint           | Descripción               |
|--------|--------------------|---------------------------|
| POST   | /api/users         | Crear un nuevo usuario    |
| GET    | /api/users         | Obtener todos los usuarios|
| GET    | /api/users/:id     | Obtener usuario por ID    |
| PUT    | /api/users/:id     | Actualizar un usuario     |
| DELETE | /api/users/:id     | Eliminar un usuario (lógico)|

---

## 📤 Ejemplos de Peticiones

### ➕ Crear usuario

```bash
curl --location 'http://localhost:3000/api/users' --header 'Content-Type: application/json' --data-raw '{
  "document_type": "CC",
  "document_number": "78888888",
  "first_name": "Oscar",
  "last_name": "Maldonado",
  "email": "maldonado@gmail.com",
  "phone": "65151616156",
  "genre": "Masculino"
}'
```

### 📥 Obtener todos los usuarios

```bash
curl --location 'http://localhost:3000/api/users'
```

### 🔎 Obtener usuario específico por id

```bash
curl --location 'http://localhost:3000/api/users/4'
```

### ✏️ Actualizar usuario

```bash
curl --location --request PUT 'http://localhost:3000/api/users/4' \
--header 'Content-Type: application/json' \
--data-raw '{
    "document_type": "CC",
    "document_number": "207966158",
    "first_name": "johan",
    "last_name": "Maldonado",
    "email": "maldonado@gmail.com",
    "phone": "65151616156",
    "genre": "Masculino"
}'
```

### ❌ Eliminar usuario (Eliminación lógica Soft Delete)

```bash
curl --location --request DELETE 'http://localhost:3000/api/users/4'
```

---

## 📬 Contacto

📧 johanfarfan25@gmail.com

🐙 [GitHub](https://github.com/JohanFarfan25)  

💼 [LinkedIn](https://linkedin.com/in/tu-perfil) 
