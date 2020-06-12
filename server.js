const express = require('express');
const path = require('path');
const fs = require('fs')
const util = require('util');
const PORT = 3000
const app = express();

const readFile = util.promisify(fs.readFile);
const DB_PATH = path.resolve(__dirname, 'db', 'db.json')


app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'notes.html'))
})

// API Routes
app.get('/api/notes', async (req, res) => {
  const notes = JSON.parse(await readFile(DB_PATH, {encoding: 'utf-8'}))
  res.json(notes)
})

app.listen(PORT, () => {
  console.log('App is running at http://localhost:3000')
})
