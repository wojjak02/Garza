import React from 'react';
import useSWR from "swr"
import { Container, Card, Button } from "react-bootstrap"
import NavBar from "../components/NavBar"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"

const fetcher = (url) => fetch(url, {method: "POST"}).then(e => e.json()).then(e => e)
const Edit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const {data: znackyRaw} = useSWR(`/api/znacky`, fetcher)
    const {data: barvyRaw} = useSWR(`/api/barvy`, fetcher)
    const {data: skupinyRaw} = useSWR(`/api/skupiny`, fetcher)

    const znacky = znackyRaw ? znackyRaw : []
    const barvy = barvyRaw ? barvyRaw : []
    const skupiny = skupinyRaw ? skupinyRaw : []

    const { data, err } = useSWR(`/api/auta/${id}`, (url) => fetch(url, { method: "POST" }).then(e => e.json()).then(e => e))
    if (!data) return (<><NavBar /><div>Loading...</div></>)

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
        fetch("/api/edit/" + id, {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res);
            navigate("/auto/"+id)
        })
    }
    console.log(data)
    return (
        <>
            <NavBar />
            <Container>
                <Card style={{ width: "100%" }}>
                    <Card.Body style={{ fontSize: "23px" }}>
                       

                        <div className="input-container">
                            <label htmlFor="znacky">Značka</label>
                            <select id="znacka" defaultValue={znacky.find(znacka => data.nazev === znacka.nazev)?.id_znacka}>
                                {znacky.map(znacka => <option key={znacka.id_znacka} value={znacka.id_znacka}>{znacka.nazev}</option>)}
                            </select>
                        </div>


                        <div className="input-container">
                            <label htmlFor="model">Model</label>
                            <input type="text" id="model" defaultValue={data.model} />
                        </div>
                        

                        <div className="input-container">
                            <label htmlFor="spz">SPZ</label> 
                            <input type="text" id="spz" defaultValue={data.spz} />
                        </div>

                        <div className="input-container">
                            <label htmlFor="stk">STK</label>
                            <input type="date" id="stk" defaultValue={new Date(data.STK).toJSON().slice(0,10)} />
                        </div>

                        <div className="input-container">
                            <label htmlFor="barva">Barva</label>
                            <select id="barva" defaultValue={barvy.find(barva => data.barva === barva.barva)?.id_barva}>
                                {barvy.map(barva => <option key={barva.id_barva} value={barva.id_barva}>{barva.barva}</option>)}
                            </select>
                        </div>

                       <div className="input-container">
                            <label htmlFor="najeto">Najeto </label> 
                            <input type="text" id="najeto" defaultValue={data.pocet_km} />
                        </div> 

                        <div className="input-container">
                            <label htmlFor="vin">VIN </label> 
                            <input type="text" id="vin" defaultValue={data.VIN} />
                        </div>

                        <div className="input-container">
                            <label htmlFor="skupina"> Skupina</label>
                            <select id="skupina" defaultValue={skupiny.find(skupina => data.nazev_skupiny === skupina.nazev_skupiny)?.id_skupiny}>
                            {skupiny.map(skupina => <option key={skupina.id_skupiny} value={skupina.id_skupiny}>{skupina.nazev_skupiny}</option>)}
                            </select>
                        </div>

                        <div className="input-container">
                            <label htmlFor="dvere">Počet dveří </label> 
                            <input type="number" id="dvere" defaultValue={data.pocet_dveri} />
                        </div>

                        <div className="input-container">
                            <label htmlFor="popis">Popis</label>
                            <textarea id="popis" className="scroll" defaultValue={data.popis} />
                        </div>

                        <br />
                        <div className="center">
                        <button className="btn btn-outline-primary" onClick={onSubmit}>Změnit</button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
};

export default Edit;
