const express = require('express')
const router = express.Router();

const Digimon = require('../models/digimon')

router.get('/', async (req, res) => {
    try {
        const arraydigimondb = await Digimon.find();
        console.log(arraydigimondb)
        res.render("digimones", {
            listadigimones: "digimones",
            arraydigimon: arraydigimondb
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/registrar', (req, res) => {

    res.render('registrar');
})

router.post('/', async (req, res) => {

    const body = req.body
    console.log(body)

    try {

        const digimondb = new Digimon(body)
        await digimondb.save()

        console.log(digimondb)
        res.redirect('/digimones')
        
    }catch (error) {
        console.log('error', error)
        
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        
        const digimondb = await Digimon.findOne({_id: id})
        console.log(digimondb);
        res.render('detalle', {
            digimon: digimondb,
            error:false
        })

    } catch (error) {
        console.log(error);
        res.render('detalle', {
            digimon: digimondb,
            error:true
        })
    }
            
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {

        const digimondb = await Digimon.findByIdAndDelete({ _id: id });
        console.log(digimondb)

        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/mascotas')
        if (!digimondb) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })
        }
        
    } catch (error) {
        console.log(error)
    }
})


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;


    try {

        const digimondb = await Digimon.findByIdAndUpdate(id, body, { useFindAndModify: false })
        console.log(digimondb)

        res.json({
            estado: true,
            mensaje: 'digimon editado'
        })

    } catch(error){
            console.log(error);
            res.json({
                estado: false,
                mensaje: 'fallamos'
            })
    }
})

module.exports = router;
