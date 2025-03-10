const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS yapılandırması
app.use(cors({ origin: '*' }));
app.use(express.json());

// Ana endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Örnek JSON verisi döndüren endpoint
app.get('/data', (req, res) => {
    const data = {
        name: 'Zeynep',
        age: 23,
        location: 'TURKIYE'
    };
    res.json(data);
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`✅ Backend running at: http://localhost:${PORT}`);
});
