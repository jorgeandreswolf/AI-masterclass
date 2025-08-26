const express = require('express');
const path = require('path');
const FrustrationDetector = require('./detectors/frustration-detector');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

// Initialize frustration detector
const detector = new FrustrationDetector();

// API Routes
app.post('/api/analyze-text', (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const result = detector.analyze(text);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stats', (req, res) => {
  res.json(detector.getStats());
});

app.post('/api/feedback', (req, res) => {
  const { text, expectedScore, actualScore } = req.body;
  detector.addFeedback(text, expectedScore, actualScore);
  res.json({ message: 'Feedback recorded' });
});

// Serve the demo page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Frustration Detector Demo</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .container { margin: 20px 0; }
            textarea { width: 100%; height: 100px; margin: 10px 0; }
            button { padding: 10px 20px; margin: 5px; cursor: pointer; }
            .result { padding: 15px; margin: 10px 0; border-radius: 5px; }
            .low { background-color: #d4edda; color: #155724; }
            .medium { background-color: #fff3cd; color: #856404; }
            .high { background-color: #f8d7da; color: #721c24; }
            .stats { background-color: #f8f9fa; padding: 15px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <h1>🤖 Compounding Engineering Demo</h1>
        <h2>Frustration Detector</h2>
        
        <div class="container">
            <h3>Test the Detector</h3>
            <textarea id="textInput" placeholder="Enter text to analyze for frustration levels..."></textarea>
            <br>
            <button onclick="analyzeText()">Analyze Frustration</button>
            <button onclick="loadSampleTexts()">Load Sample Texts</button>
            <div id="result"></div>
        </div>

        <div class="container">
            <h3>Quick Test Buttons</h3>
            <button onclick="testText('I love working with this new framework!')">😊 Positive Text</button>
            <button onclick="testText('This documentation is confusing but I can figure it out.')">😐 Neutral Text</button>
            <button onclick="testText('WHY DOES THIS KEEP BREAKING?! I have tried everything and nothing works!')">😡 Frustrated Text</button>
        </div>

        <div class="container">
            <h3>System Stats</h3>
            <button onclick="loadStats()">Refresh Stats</button>
            <div id="stats"></div>
        </div>

        <script>
            async function analyzeText() {
                const text = document.getElementById('textInput').value;
                if (!text.trim()) {
                    alert('Please enter some text to analyze');
                    return;
                }
                
                try {
                    const response = await fetch('/api/analyze-text', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text })
                    });
                    
                    const result = await response.json();
                    displayResult(result);
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            async function testText(text) {
                document.getElementById('textInput').value = text;
                await analyzeText();
            }

            function displayResult(result) {
                const resultDiv = document.getElementById('result');
                const level = result.frustrationLevel;
                const className = level === 'low' ? 'low' : level === 'medium' ? 'medium' : 'high';
                
                resultDiv.innerHTML = \`
                    <div class="result \${className}">
                        <strong>Frustration Level: \${level.toUpperCase()}</strong><br>
                        Score: \${result.score.toFixed(2)}/10<br>
                        Indicators: \${result.indicators.join(', ') || 'None detected'}<br>
                        Reasoning: \${result.reasoning}
                    </div>
                \`;
            }

            async function loadStats() {
                try {
                    const response = await fetch('/api/stats');
                    const stats = await response.json();
                    document.getElementById('stats').innerHTML = \`
                        <div class="stats">
                            <strong>Detection Statistics:</strong><br>
                            Total Analyses: \${stats.totalAnalyses}<br>
                            Average Score: \${stats.averageScore.toFixed(2)}<br>
                            Common Indicators: \${stats.commonIndicators.join(', ')}<br>
                            Last Updated: \${new Date(stats.lastUpdated).toLocaleString()}
                        </div>
                    \`;
                } catch (error) {
                    console.error('Error loading stats:', error);
                }
            }

            function loadSampleTexts() {
                const samples = [
                    "I'm really excited about this new project!",
                    "This is taking longer than expected, but we're making progress.",
                    "I can't believe this is still not working after 3 hours!",
                    "The documentation could be clearer, but I'm figuring it out.",
                    "ARGH! This error message makes no sense whatsoever!"
                ];
                document.getElementById('textInput').value = samples[Math.floor(Math.random() * samples.length)];
            }

            // Load initial stats
            loadStats();
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Compounding Engineering Demo running at http://localhost:${PORT}`);
  console.log('📊 Try the frustration detector and watch it learn from each interaction!');
});

module.exports = app;