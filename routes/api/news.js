const express = require('express');
const multer = require('multer');
const fs = require('fs');

const News = require('./schema/news');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
});

const upload = multer({ storage: storage });

router.post('/upload',
    upload.single('image'),
    async (req, res) => {
        if(req.isAuthenticated()){
            const file = req.file;
            const mimetype = file.mimetype;
            const body = req.body
            if (mimetype?.includes("image")) {
                const image = fs.readFileSync(file.path);
                try {
                    await News.create({
                        title: body.title,
                        content: body.content,
                        thumbnail: image,
                        mimetype: mimetype,
                    });
                    res.status(201).send({ status: 'Successful' });
                } catch(err){
                    res.status(500).send({ status: 'Error', errors: err });
                }
            } else {
                res.sendStatus(405);
            }
        } else {
            res.status(401).send({status: "Unauthorized"})
        }
})

router.get('/getImage/:id', async (req, res) => {
    const id = req.params.id;
    const data = await News.findById(id);
    res.contentType(data.get("mimetype"));
    res.status(201).send(data.get("thumbnail"));
})

module.exports = router;