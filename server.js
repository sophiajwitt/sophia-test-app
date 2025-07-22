const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Porter App</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem;
                background-color: #f5f5f5;
            }
            .container {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 { color: #333; }
            .btn {
                background: #007bff;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                margin: 10px 0;
            }
            .btn:hover { background: #0056b3; }
            #response { 
                margin-top: 1rem; 
                padding: 1rem; 
                background: #e9ecef; 
                border-radius: 4px;
                display: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Sophia Test App!</h1>
            <p>Your web app is running successfully</p>
            
            <h3>Quick Test</h3>
            <button class="btn" onclick="testApi()">Test API Endpoint</button>
            <div id="response"></div>
            
            <h3>Environment Info</h3>
            <p><strong>Node Version:</strong> ${process.version}</p>
            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
            <p><strong>Port:</strong> ${PORT}</p>
        </div>
        
        <script>
            async function testApi() {
                try {
                    const response = await fetch('/api/test');
                    const data = await response.json();
                    document.getElementById('response').style.display = 'block';
                    document.getElementById('response').innerHTML = 
                        '<strong>API Response:</strong><br>' + JSON.stringify(data, null, 2);
                } catch (error) {
                    document.getElementById('response').style.display = 'block';
                    document.getElementById('response').innerHTML = 'Error: ' + error.message;
                }
            }
        </script>
    </body>
    </html>
  `);
});

app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});