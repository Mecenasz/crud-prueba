const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const digimonSchema = new Schema({

    nombre: String,
    tipo: String
})


//crear modelo
const Digimon = mongoose.model('Digimon', digimonSchema, 'digimon')

module.exports = Digimon;