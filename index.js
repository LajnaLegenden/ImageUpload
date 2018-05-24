const express = require('express');
const multer = require('multer');
const hbs = require('express-hbs');
const path = require('path');
const fs = require('fs');

const imagePath = './public/uploads';
const app = express();
const port = 80;
//Storage engine



//Init upload

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');


function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


//HBS Setup
app.use(express.static('./public'));
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));

hbs.registerHelper('add', function (value, options) {
    return parseInt(value + 1);
});

//Routes

app.get('/', function (req, res) {
    console.log(req.connection.remoteAddress);
    var imagePaths = [' '];
    fs.readdir(imagePath, (err, files) => {

        if (files) {
            if (files.length < 4) {
                for (var i = 0; i < files.length; i++) {
                    imagePaths[i] = '/uploads/' + files[i];
                }
                res.render('index', {
                    items: imagePaths,
                    title: 'Welcome to my portfolio!'
                });
                console.log(`Serverd ${imagePaths.length} images to startpage`);
            } else if (files.length == 4 || files.length > 4) {
                for (var i = 0; i < 3; i++) {
                    imagePaths[i] = '/uploads/' + files[i];

                }
                res.render('index', {
                    items: imagePaths,
                    title: 'Welcome to my portfolio!'
                });
                console.log(`Serverd ${imagePaths.length} images to startpage`);
            }
        }
    })
});
app.get('/upload', function (req, res) {
    res.render('upload', {
        title: 'Upload an image',
        home: 'true'
    });
});
app.get('/uploaded', function (req, res) {

    res.render('uploaded', {
        file: req.query.file,
        title: `You uploaded the file ${req.query.file}`
    });
    console.log(req.query.file)
});
app.get('/gallery', function (req, res) {

    var imagePaths = [' '];
    fs.readdir(imagePath, (err, files) => {

        if (files) {
            for (var i = 0; i < files.length; i++) {
                imagePaths[i] = '/uploads/' + files[i];

            }
            res.render('gallery', {
                items: imagePaths,
                title: 'Gallery'
            });
            console.log(`Serverd ${files.length} images to the gallery`);

        }



    })

});

app.get('/d', function(req,res){
    res.sendFile(__dirname + '/resume.txt');
});
app.post('/upload/post', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('upload', {
                msg: err
            })
        } else if (req.file == undefined) {
            res.render('upload', {
                msg: 'Error: No file selected'
            });
        } else {
            res.redirect('/uploaded?file=/uploads/' + req.file.filename)


        }
    });
})

//Strt server
app.listen(port, () => console.log("Server started on port " + port));