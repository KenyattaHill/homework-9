const express = require('express');
const path = require('path');
const fs = require('fs')
const PORT = 3000
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'notes.html'))
})

app.listen(PORT, () => {
  console.log('App is running at http://localhost:3000')
})