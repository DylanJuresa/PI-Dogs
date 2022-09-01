const { Router } = require('express');
const axios = require("axios");
const { Dog, Temperamento, } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



const getApiInfo = async () => {


    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            weight: weight=el.weight.metric.split("-").map(el => el.trim()),
            temperamentos: el.temperament?.split(",").map(el => el.trim()),
            img: el.image["url"],
            createdInDb: false
        }
    })

    return apiInfo;



}

const getDbInfo = async () => {

    return await Dog.findAll({
        include: {
            model: Temperamento,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllDogs = async () => {


    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal


}

router.get("/dogs/test/", async function (req, res) {res.status(200).send(req.ip)})
           
router.get("/dogs", async function (req, res) {



    const name = req.query.name
    const totalDogs = await getAllDogs();

    if (name) {
        let searchedDogs = await totalDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        searchedDogs.length ?
            res.status(200).send(searchedDogs) :
            res.status(404).send("No se encontro el perro especificado")
    }
    else {

        res.status(200).send(totalDogs)

    }




})

router.get("/dogs/:id", async function (req, res) {

    const getId = req.params.id

    const getDogDetail = async () => {
        const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
        const apiInfo = await apiUrl.data.map(el => {
            return {
                id: el.id,
                name: el.name,
                weight: el.weight.metric.split("-").map(el => el.trim()),
                height: el.weight.metric.split("-").map(el => el.trim()),
                yearsLife: el.life_span,
                temperamentos: el.temperament?.split(",").map(el => el.trim()),
                img: el.image["url"],
                createdInDb: false
            }
        })


        return apiInfo;

    }
    const dogsApi = await getDogDetail()
    const dogsDb = await getDbInfo();
    const totalDogs = dogsApi.concat(dogsDb)

    if (getId) {
        let searchedDogs = await totalDogs.filter(el => el.id == getId)
        searchedDogs.length ?

            res.status(200).send(searchedDogs) :
            res.status(404).send("No se encontro el perro especificado")
    }

})

router.get("/temperaments", async function (req, res) {


    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const temperaments = apiUrl.data.map(el => el.temperament).toString().split(',').map(el => el.trim())
    let splitTemperaments = temperaments.filter(word => word.length > 0);
    splitTemperaments.forEach(el => {
        Temperamento.findOrCreate({
            where: { name: el }
        })
    });
    const allTemperament = await Temperamento.findAll();
    res.send(allTemperament);


})

router.post("/dogs", async function (req, res) {


    let { name, height, weight, yearsLife, temperamentos,imagen } = req.body.infoPost;
    const createdInDb = true


    try {

        let perroCreado = await Dog.create({
            name,
            height,
            weight,
            yearsLife,
            createdInDb,
            imagen
        })


        let temperamentoDb = await Temperamento.findAll({
            where: { name: temperamentos }
        })


        await perroCreado.addTemperamento(temperamentoDb)

        res.status(200).send("Dog created successfully!")

    } catch (error) {
        res.status(500).json(error);

    }




})



module.exports = router;
