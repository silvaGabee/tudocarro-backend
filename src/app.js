const express = require('express');
const cors = require('cors');

const carRoutes = require('./routes/carRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        name: 'Tudocarro API',
        version: '1.0.0'
    });
});

app.use('/api/cars', carRoutes);

module.exports = app;