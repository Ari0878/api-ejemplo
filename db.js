const { Client } = require('pg');

const client = new Client({
  host: 'dpg-d170pcadbo4c73cuekvg-a.oregon-postgres.render.com', // Host completo
  user: 'alumnos_zqpq_user',
  password: 'VBeWEJFNMeOPu8wpPvfTKqXLxwf5mPKo',
  database: 'alumnos_zqpq',
  port: 5432, // Puerto estándar de PostgreSQL
  ssl: {
    rejectUnauthorized: false // Importante para conexiones a Render
  }
});

client.connect()
  .then(() => console.log('Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('Error de conexión a la base de datos:', err));

module.exports = client;
