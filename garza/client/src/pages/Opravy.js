import React from 'react';
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import useSWR from "swr"
import { Container, Card, Button } from "react-bootstrap"
import NavBar from "../components/NavBar"

const Opravy = () => {
    const { id } = useParams()
    const { data } = useSWR(`/api/auta/${id}`, (url) => fetch(url, {method: "POST"}).then(e => e.json()).then(e => e))
    if (!data) return (<><NavBar /><div>Loading...</div></>)

    const addOprava = () => {
        const data = {
            cena: document.getElementById("cena").value,
            popis: document.getElementById("popis").value
        }
        fetch(`/api/opravy/add/${id}`, {
            method:"POST",
            body: JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        }).then(res => {
            window.location.reload()
        })
    }
    const removeOprava = (id_opravy) => {
        fetch(`/api/opravy/remove/${id_opravy}`, {
            method:"POST",
            headers:{'Content-Type':'application/json'}
        }).then(res => {
            window.location.reload()
        })
    }
    return (
        <>
            <NavBar />
            <Container>
                <Card style={{width: "100%"}}>
                    <Card.Body style={{fontSize: "23px"}}>
                        <div id="opravy">{data.opravy.map(oprava => 
                            <div className='border fadeIn p-4' key={oprava.id_opravy}>
                                Cena: {oprava.cena}<br />
                                Popis: {oprava.popis_opravy}<br />
                                <div className="center">
                                <button className="btn btn-outline-danger" onClick={() => {removeOprava(oprava.id_opravy)}}>Smazat</button>
                                </div>
                            </div>)}
                        </div>
                        <br />
                        <div className="center">

                        <div className="box-container">
                            <label for="cena">Cena</label> 
                            <input type="number" placeholder="0" id="cena" />
                        </div>
                        <div className="box-container">
                            <label for="popis">Popis</label> 
                            <textarea id="popis" className="scroll"></textarea>
                        </div>
                            <div className="center">
                                <button className="btn btn-outline-primary" onClick={addOprava}>Přidat</button>
                            </div>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        </>
    )
};

export default Opravy;
