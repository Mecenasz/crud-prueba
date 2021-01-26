/*console.log("Hello world from node js.")

//let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 4]

let arr = [1, 4, 4, 4, 5, 3]

let count = [0,0,0,0,0]
    
for (let i = 0; i < arr.length; i++) {
        
    count[arr[i] - 1]++
        
}



let equals = count.filter(i => i < 3)

//console.log(count.indexOf(Math.max(...count)) + 1)

console.log(equals)


const cowsay = require("cowsay");

console.log(cowsay.say({
    text : "I´m in a mooooodule",
    e : "oO",
    T : "U "
}));


const mascota = {

    nombre: `tom`,
    edad: 10,
    vivo: true,
    caras: ['peludo', 'negro']
}

const web = {

    nombre: 'mecenasweb',
    hyperlinks: {
        enlace: 'www.mecenasweb.cl'
    },
    socialmed: {
        youtube:{
            enlace: 'youtube.com/mecenas',
            nombre: 'mecenas yt'
        }
    }
}

console.log(web.socialmed.youtube.enlace);

const {enlace, nombre} = web.socialmed.youtube;
console.log(enlace);

*/

const { static } = require('express');
const express = require('express');
const { dirname } = require('path');
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()

const port = process.env.PORT || 3000;


//conexion a base de datos
const mongoose = require('mongoose');


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.bjpv8.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority
`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

.then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"))

//rutas web
app.use('/', require('./router/rutasweb'));
app.use('/digimones', require('./router/digimones'));


app.use((req, res, next ) => {
    res.status(404).render("404", {
        titulo : '404'
    })
})



app.listen(port, () =>{

    console.log('servidor a su servicio en el puerto', port);
})
