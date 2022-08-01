import express from 'express'
import path from 'path'
import open from 'open'
const app = express()
const port = process.env.PORT || 8080
const __dirname = path.resolve()

app.use(express.static(__dirname))
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/visualizer/index.html'));
});

app.listen(port);

console.log('Server running on http://localhost:' + port);

open('http://localhost:' + port)