require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// API Configuration
const API_KEY = process.env.API_KEY;
const MODEL_ID = process.env.MODEL_ID;
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.loratech.dev';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        console.log('Received message:', message);

        // Build messages array for API
        const messages = [];

        // Add conversation history (keep last 10 messages for context)
        const recentHistory = history.slice(-10);
        recentHistory.forEach(msg => {
            messages.push({
                role: msg.role,
                content: msg.content
            });
        });

        // Call the API
        const response = await fetch(`${API_BASE_URL}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL_ID,
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Error:', errorData);
            const errorMessage = errorData.error?.message || errorData.error || `API Error: ${response.status}`;
            return res.status(response.status).json({
                error: errorMessage,
                details: errorData
            });
        }

        const data = await response.json();

        // Extract assistant message
        let assistantMessage = '';
        if (data.choices && data.choices[0] && data.choices[0].message) {
            assistantMessage = data.choices[0].message.content;
        } else {
            throw new Error('Unexpected API response format');
        }

        console.log('Response sent');
        res.json({ message: assistantMessage });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});
