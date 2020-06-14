const express = require('express');
const path = require('path');
const fs = require('fs')
const util = require('util');
const PORT = 3000
const app = express();
const uuid = require('uuid')

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
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

app.post('/api/notes', async (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(await readFile(DB_PATH, { encoding: 'utf-8' }))
  newNote.id = uuid.v4()
  notes.push(newNote);
  await writeFile(DB_PATH, JSON.stringify(notes))
  res.json(newNote)
})

app.delete('/api/notes/:id', async (req, res) => {
  const noteId = req.params.id;
  const notes = JSON.parse(await readFile(DB_PATH, { encoding: 'utf-8' }))
    .filter(note => note.id !== noteId)
  await writeFile(DB_PATH, JSON.stringify(notes))
  res.send('Deleted');
})

app.listen(PORT, () => {
  console.log('App is running at http://localhost:3000')
})