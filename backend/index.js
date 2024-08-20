// index.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 5000;

// Middleware to enable CORS and parse JSON bodies
app.use(cors());
app.use(express.json());

// Define the /api/submit route
app.post('/api/submit', async (req, res) => {
    console.log('Received request:', req.body); // For debugging
    try {
        const response = await axios.post('https://sandbox.alloy.co/v1/evaluations', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${process.env.ALLOY_API_KEY}:${process.env.ALLOY_API_SECRET}`).toString('base64')}`
            }
        });
        console.log('Alloy API response:', response.data); // For debugging
        res.send(response.data);
    } catch (error) {
        console.error('Error in request:', error); // For debugging
        res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : 'Internal Server Error');
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
