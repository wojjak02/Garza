const {createConnection} = require("mysql")
const {promisify} = require("util")

const connection = createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "garaz"
})
const query = promisify(connection.query).bind(connection)

const getAuta = async () => {
    const auta = await query(`SELECT auta.id_auta, auta.model, auta.spz, auta.VIN, auta.popis, auta.STK,
                                     znacka.nazev,
                                     barva.barva,
                                     skupina.nazev_skupiny,
                                     info.pocet_km, info.pocet_dveri
                              FROM auta
                              JOIN znacka  ON auta.id_znacka=znacka.id_znacka 
                              JOIN barva   ON auta.id_barva =barva.id_barva
                              JOIN skupina ON auta.id_skupiny=skupina.id_skupiny
                         LEFT JOIN info    ON auta.id_auta=info.id_auta`)
    const opravy = await query(`SELECT id_opravy, id_auta, popis_opravy, cena
                                FROM oprava
                                WHERE id_auta IN (${auta.map(auto => auto.id_auta).join(",")})`)
    auta.map(auto => auto.opravy = [])
    opravy.map(oprava => auta.find(auto => auto.id_auta == oprava.id_auta).opravy.push(oprava))
    return auta
}

const getBarvy = async () => {
    const barvy = (await query(`SELECT * FROM barva`))
    return barvy
}

const getAuto = async (id) => {
    if (isNaN(id)) return;
    const auto = (await query(`SELECT auta.id_auta, auta.model, auta.spz, auta.VIN, auta.popis, auta.STK,
                                     znacka.nazev,
                                     barva.barva,
                                     skupina.nazev_skupiny,
                                     info.pocet_km, info.pocet_dveri
                              FROM auta
                              JOIN znacka  ON auta.id_znacka=znacka.id_znacka 
                              JOIN barva   ON auta.id_barva =barva.id_barva
                              JOIN skupina ON auta.id_skupiny=skupina.id_skupiny
                         LEFT JOIN info    ON auta.id_auta=info.id_auta
                              WHERE auta.id_auta=${id}
                         `))[0]
    if (!auto) return
    const opravy = await query(`SELECT id_opravy, id_auta, popis_opravy, cena
                                FROM oprava
                                WHERE id_auta=${id}`)
    auto.opravy = []
    opravy.map(oprava => auto.opravy.push(oprava))
    return auto
}

const deleteAuto = async (id) => {
    const auto = (await query(`DELETE FROM auta WHERE auta.id_auta=${id}`))
    if (!auto) return;
    return auto;
}

const getZnacky = async () => {
    const znacky = (await query(`SELECT * FROM znacka`))
    return znacky 
}

const addAuto = async (znacka, spz, model, stk, barva, najeto, vin, dvere, popis, skupina) => {
    //TODO: STK
    await query(`INSERT INTO auta (id_znacka, id_barva, model, spz, id_skupiny, VIN, popis, STK) VALUES (${znacka}, ${barva}, '${model}', '${spz}', ${skupina}, '${vin}', '${popis}', '${stk}');`)
    const id = (await query("SELECT LAST_INSERT_ID() as id;"))[0].id
    await query(`INSERT INTO info (id_auta, pocet_km, pocet_dveri) VALUES (${id}, ${najeto}, ${dvere});`)
}

const getSkupiny = async () => {
    const skupiny = (await query(`SELECT * FROM skupina`))
    return skupiny 
}

const editAuto = async (id, znacka, spz, model, stk, barva, najeto, vin, dvere, popis, skupina) => {
    const autaSql = `UPDATE auta SET id_znacka=${znacka}, id_barva=${barva}, model='${model}', spz='${spz}', id_skupiny=${skupina}, VIN='${vin}', popis='${popis}', STK='${stk}' WHERE id_auta=${id}`
    const infoSql = `UPDATE info SET pocet_km=${najeto}, pocet_dveri=${dvere} WHERE id_auta=${id}`
    await query(autaSql)
    return await query(infoSql)
}

const addOprava = async (id, cena, popis) => {
    const sql = `INSERT INTO oprava (id_auta, popis_opravy, cena) VALUES (${id}, '${popis}', ${cena})`
    return await query(sql)
}

const removeOprava = async (id) => {
    const sql = `DELETE FROM oprava WHERE id_opravy=${id}`
    return await query(sql)
}

module.exports = { getAuta, getAuto, deleteAuto, getZnacky, getBarvy, addAuto, getSkupiny, editAuto, addOprava, removeOprava }