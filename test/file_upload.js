const formidable = require('formidable')
const http = require('http')
const fs = require('fs/promises')
const {readFile} = require("fs/promises");

const srv = http.createServer(async (req, res) => {
    if (req.url === '/file-upload') {
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
            const oldPath = files.filetoupload.filepath
            const newPath = `./upload/${files.filetoupload.originalFilename}`
            await fs.rename(oldPath, newPath)
            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end()
        })
    }
    else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const html = await readFile('upload-form.html')
        return res.end(html);
    }
})
srv.listen(3000)