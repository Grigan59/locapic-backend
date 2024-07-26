var express = require('express');
var router = express.Router();
const Place = require('../models/places');
const { checkBody } = require('../modules/checkBody')

//route POST places
router.post('/', (req, res) => {
    //Check body
    if (!checkBody(req.body, ["nickname", "name", "latitude", "longitude"])) {
        res.json({ result: false })
        return;
    }

    //Add new place
    const newPlace = new Place(req.body);
    newPlace
        .save()
        .then(() => res.json({ result: true }))
})


//route GET places by nickname
router.get('/:nickname', (req, res) => {
    //Initialisation
    const nickname = req.params.nickname;
    //Check params
    if (nickname === null) {
        res.json({ result: false })
        return;
    }

    //Find places
    Place
        .find({ nickname })
        .then((data) => {
            const places = data.map((item) => {
                const obj = {
                    nickname: item.nickname,
                    name: item.name,
                    latitude: item.latitude,
                    longitude: item.longitude
                }
                return obj;
            })
            res.json({ result: true, places });
        })
})

//route DELETE places
router.delete('/', (req, res) => {
    //Check body
    if (!checkBody(req.body, ["nickname", "name"])) {
        res.json({ result: false })
        return;
    }

    //Delete place
    const {nickname,name} = req.body;
    Place
        .deleteMany({nickname,name})
        .then(() => res.json({ result: true }))
})

module.exports = router;
