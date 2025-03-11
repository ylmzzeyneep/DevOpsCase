const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.get('/health', (req, res) => {
    res.json({ message: 'Application is healthy!'});
});

app.get('/data', (req, res) => {
    const data = {
        name: 'Zeynep',
        age: 23,
        location: 'TURKIYE'
    };
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`✅ Backend running at: http://localhost:${PORT}`);
});
