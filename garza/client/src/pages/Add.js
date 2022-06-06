import React from 'react'
import NavBar from "../components/NavBar"
import { Container, Card, Button } from 'react-bootstrap'
import useSWR from "swr"

const fetcher = (url) => fetch(url, {method: "POST"}).then(e => e.json()).then(e => e)
const Add = () => {
    const {data: znackyRaw} = useSWR(`/api/znacky`, fetcher)
    const {data: barvyRaw} = useSWR(`/api/barvy`, fetcher)
    const {data: skupinyRaw} = useSWR(`/api/skupiny`, fetcher)

    const znacky = znackyRaw ? znackyRaw : []
    const barvy = barvyRaw ? barvyRaw : []
    const skupiny = skupinyRaw ? skupinyRaw : []

    const onSubmit = () => {
        let data = {
            znacka: document.getElementById("znacka").value,
            spz: document.getElementById("spz").value,
            model: document.getElementById("model").value,
            stk: document.getElementById("stk").value,
            barva: document.getElementById("barva").value,
            najeto: document.getElementById("najeto").value,
            vin: document.getElementById("vin").value,
            dvere: document.getElementById("dvere").value,
            popis: document.getElementById("popis").value,
            skupina: document.getElementById("skupina").value
        }
        console.log(data)
        fetch("/api/add", {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res);
        })
    }

    return (
        <>
        <NavBar />
        <Container>
            <Card style={{ width: "100%" }}>
                <Card.Body style={{ fontSize: "23px" }}>
                   

                    <div className="input-container">
                        <label for="znacky">Značka</label>
                        <select id="znacka">
                            {znacky.map(znacka => <option key={znacka.id_znacka} value={znacka.id_znacka}>{znacka.nazev}</option>)}
                        </select>
                    </div>


                    <div className="input-container">
                        <label for="model">Model</label>
                        <input type="text" id="model" />
                    </div>
                    

                    <div className="input-container">
                        <label for="spz">SPZ</label> 
                        <input type="text" id="spz" />
                    </div>

                    <div className="input-container">
                        <label for="stk">STK</label>
                        <input type="date" id="stk" />
                    </div>

                    <div className="input-container">
                        <label for="barva">Barva</label>
                        <select id="barva">
                            {barvy.map(barva => <option key={barva.id_barva} value={barva.id_barva}>{barva.barva}</option>)}
                        </select>
                    </div>

                   <div className="input-container">
                        <label for="najeto">Najeto </label> 
                        <input type="text" id="najeto" />
                    </div> 

                    <div className="input-container">
                        <label for="vin">VIN </label> 
                        <input type="text" id="vin" />
                    </div>

                    <div className="input-container">
                        <label for="skupina"> Skupina</label>
                        <select id="skupina">
                        {skupiny.map(skupina => <option key={skupina.id_skupiny} value={skupina.id_skupiny}>{skupina.nazev_skupiny}</option>)}
                        </select>
                    </div>

                    <div className="input-container">
                        <label for="dvere">Počet dveří </label> 
                        <input type="number" id="dvere"  />
                    </div>

                    <div className="input-container">
                        <label for="popis">Popis</label>
                        <textarea id="popis" className="scroll" />
                    </div>

                    <br />
                    <div className="center">
                    <button className="btn btn-outline-primary" onClick={onSubmit}>Přidat</button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    </>
    )
}

export default Add
