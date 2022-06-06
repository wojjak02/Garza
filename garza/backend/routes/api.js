var express = require('express');
var router = express.Router({ strict: true });
const { getAuta, getAuto, deleteAuto, getZnacky, getBarvy, addAuto, getSkupiny, editAuto, addOprava, removeOprava } = require("../database/database")

router.post('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.all('/auta', async (req, res) => {
    res.json(await getAuta())
})

router.all('/auta/deletecar/:id', async (req, res) => {
    res.json(await deleteAuto(req.params.id))
})

router.all("/znacky", async (req, res) => {
    res.json(await getZnacky())
})

router.all("/barvy", async (req, res) => {
    res.json(await getBarvy())
})

router.all("/skupiny", async (req, res) => {
    res.json(await getSkupiny())
})

router.all("/add", async (req, res) => {
    const { znacka, spz, model, stk, barva, najeto, vin, dvere, popis, skupina } = req.body;
    if (!znacka || !spz || !model || !stk || !barva || !najeto || !vin || !dvere || !popis || !skupina) return res.status(400).send()
    res.json(await addAuto(znacka, spz, model, stk, barva, najeto, vin, dvere, popis, skupina))
})

router.all("/auta/:id", async (req, res) => {
    const data = await getAuto(req.params.id)
    if (!data) return res.status(404).send()
    res.json(data)
})

router.all("/edit/:id", async (req, res) => {
    const auto = await getAuto(req.params.id)
    if (!auto) return res.status(404).send()
    const { znacka, spz, model, stk, barva, najeto, vin, dvere, popis, skupina } = req.body
    if (!znacka || !spz || !model || !stk || !barva || !najeto || !vin || !dvere || !popis || !skupina) return res.status(400).send()
    const resp = await editAuto(req.params.id, znacka, spz, model, stk, barva, najeto, vin, dvere, popis, skupina).catch(e => {res.status(500).send(); console.log(e);return false})
    if (!resp) return
    res.send()
})

router.all("/opravy/add/:id", async (req, res) => {
    const {cena, popis} = req.body
    if (cena == null || !popis) return res.status(400).send()
    await addOprava(req.params.id, cena, popis).catch(err => res.status(500))
    res.send()
})

router.all("/opravy/remove/:id", async (req, res) => {
    await removeOprava(req.params.id).catch(err => res.status(500))
    res.send()
})

module.exports = router;