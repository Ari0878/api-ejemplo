const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'dpg-d170pcadbo4c73cuekvg-a',
  user: 'alumnos_zqpq_user',
  password: 'VBeWEJFNMeOPu8wpPvfTKqXLxwf5mPKo',
  database: 'alumnos_zqpq'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

module.exports = connection;
