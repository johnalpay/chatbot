const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));  // Para sa static files (HTML, CSS, JS)

const OPENAI_API_KEY = 'your-openai-api-key';  // Palitan ng iyong OpenAI API key

// Endpoint na maghahandle ng mga chat requests
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
            max_tokens: 150,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const botReply = response.data.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error communicating with AI API:', error);
        res.status(500).json({ error: 'Error communicating with AI' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
