const express = require('express')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Strona główna')
})

app.get('/json', (req, res) => {
    res.json({ name: 'Jan', age: 25 })
})

app.get('/html', (req, res) => {
    res.send('<html lang="pl"><body><h1>Wygenerowany HTML</h1></body></html>')
})

app.get('/file', (req, res) => {
    const filePath = path.join(__dirname, 'plik.html')
    if (fs.existsSync(filePath))
    {
        res.sendFile(filePath)
    }
    else
    {
        res.status(404).send('Nie znaleziono pliku')
    }
})

app.get('/get_params', (req, res) => {
    console.log(req.query)
    const timestamp = Date.now()
    const filePath = path.join(__dirname, `params_${timestamp}.json`)
    fs.writeFileSync(filePath, JSON.stringify(req.query, null, 2))
    res.json({ ok: 'ok' })
})

app.use((req, res) => {
    const filePath = path.join(__dirname, 'assets', req.path)
    if (fs.existsSync(filePath))
    {
        const mimeType = mime.lookup(filePath) || 'application/octet-stream'
        res.type(mimeType)
        res.sendFile(filePath)
    }
    else
    {
        res.status(404).json({ error: 'Plik nie znaleziony' })
    }
})

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`)
})
