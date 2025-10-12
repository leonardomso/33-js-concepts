const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Create HTTP server
const server = http.createServer((req, res) => {
    // Default to index.html for root path
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, 'public', filePath);
    
    // Get file extension
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'text/plain';
    
    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`, 'utf-8');
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🚀 33 JavaScript Concepts - Interactive Learning Platform');
    console.log('='.repeat(60));
    console.log(`\n✅ Server is running on:`);
    console.log(`   - Local:   http://localhost:${PORT}`);
    console.log(`   - Network: http://127.0.0.1:${PORT}`);
    console.log(`\n📚 Ready to explore JavaScript concepts!`);
    console.log(`\n⌨️  Press Ctrl+C to stop the server\n`);
    console.log('='.repeat(60));
});
