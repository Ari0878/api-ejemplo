const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.json());

// Middleware para configurar las cabeceras CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Rutas de la API
app.use('/api', routes);

// Puerto
const PORT = process.env.PORT || 5432 ;
app.listen(PORT, () => {
  console.log(`Servidor API a la espera de consulta, por el puerto ${PORT}`);
// });
// routes.js
const express = require('express');
const router = express.Router();
const connection = require('./db');

const port = process.env.PORT || 5432;

// Obtener todos los registros
router.get('/registros_alumnos', (req, res) => {
  connection.query('SELECT * FROM alumnos ', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});
  router.get('/registros_grupo', (req, res) => {
    connection.query('SELECT * FROM tb_grupos  ', (err, results) => {
      if (err) {
        console.error('Error al obtener registros:', err);
        res.status(500).json({ error: 'Error al obtener registros' });
        return;
      }
      res.json(results);
    });
  });
    router.get('/registros_carreras', (req, res) => {
      connection.query('SELECT * FROM tb_carrera', (err, results) => {
        if (err) {
          console.error('Error al obtener registros:', err);
          res.status(500).json({ error: 'Error al obtener registros' });
          return;
        }
        res.json(results);
      });
    });
      router.get('/registros_universidades', (req, res) => {
        connection.query('SELECT * FROM tb_universidad ', (err, results) => {
          if (err) {
            console.error('Error al obtener registros:', err);
            res.status(500).json({ error: 'Error al obtener registros' });
            return;
          }
          res.json(results);
        });
});

// Obtener un registro por su ID
router.get('/registros_alumnos/:id_alumno', (req, res) => {
    const id = req.params.id_alumno;
    connection.query('SELECT * FROM alumnos  WHERE id_alumno = ?', id, (err, results) => {
      if (err) {
        console.error('Error al obtener el registro:', err);
        res.status(500).json({ error: 'Error al obtener el registro' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Registro no encontrado' });
        return;
      }
      res.json(results[0]);
    });
});

router.get('/registros_carreras/:id_carrera', (req, res) => {
  const id = req.params.id_carrera;
  connection.query('SELECT * FROM 	tb_carrera WHERE id_carrera = ?', id, (err, results) => {
    if (err) {
      console.error('Error al obtener el registro:', err);
      res.status(500).json({ error: 'Error al obtener el registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro no encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

router.get('/registros_grupo/:id_grupo', (req, res) => {
  const id = req.params.id_grupo;
  connection.query('SELECT * FROM tb_grupos   WHERE id_grupo = ?', id, (err, results) => {
    if (err) {
      console.error('Error al obtener el registro:', err);
      res.status(500).json({ error: 'Error al obtener el registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro no encontrado' });
      return;
    }
    res.json(results[0]);
  });
});
router.get('/registros_universidades/:id_universidad', (req, res) => {
  const id = req.params.id_universidad;
  connection.query('SELECT * FROM tb_universidad  WHERE id_universidad = ?', id, (err, results) => {
    if (err) {
      console.error('Error al obtener el registro:', err);
      res.status(500).json({ error: 'Error al obtener el registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro no encontrado' });
      return;
    }
    res.json(results[0]);
  });
});
// Crear un nuevo registro
router.post('/registros', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO alumnos  SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Actualizar un registro
router.put('/registros/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  connection.query('UPDATE alumnos SET ? WHERE id = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Eliminar un registro
router.delete('/registros/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM alumnos  WHERE id = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});


// Obtener todos los registros de dos tablas
router.get('/datos', (req, res) => {
  connection.query('SELECT car.id_carrera AS id, car.nombre AS carrera, gru.nombre AS grupo ' +
    'FROM tb_carrera AS car, tb_grupos  AS gru ' +
    'WHERE car.id_carrera=gru.id_carrera', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});


module.exports = router;
