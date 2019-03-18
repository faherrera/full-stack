if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    console.log('Este es el entorno', process.env.NODE_ENV);
}
const express = require('express');
const morgan = require('morgan'); //Para mostrarnos por consola las peticiones al servidor
const multer = require('multer'); //Nos ayuda a procesar imagenes
const path = require('path');
//Inits
const app = express();
require('./database');

//Settings
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({ //Configuración de multer
    destination: path.join(__dirname, 'public/uploads'), //Carpeta donde guardamos las imagenes
    filename(req,file,cb){ //Manejo del archivo
        cb(null, new Date().getDate() + path.extname(file.originalname)) //callback con el nombre.
    }
});
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.use('/api/books', require('./routes/books'));

//static files.
app.use(express.static(path.join(__dirname, 'public'))); //Archivos estaticos.

//start server 
app.listen(app.get('port'), () => {
    console.log("Server on port ",app.get('port'));
});