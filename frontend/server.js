import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve the index.html file
app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start the server
app.listen(port, () => {
     console.log(`Server running on port ${port}`);
});
