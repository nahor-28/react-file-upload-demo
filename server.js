const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

//Middlewares
app.use(fileUpload());

//Upload Endpoint
app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No files uploaded...'}); //bad request error
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => { //react app uploads folder
        if(err) {
            console.error(err);
            return res.status(500).send(err); //server error
        }

        res.json({ fileName: file.name, filePath: `/upload/${file.name}`});
    })
} )

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
