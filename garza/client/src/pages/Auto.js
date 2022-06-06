import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import useSWR from "swr"
import { Container, Card, Button } from "react-bootstrap"
import NavBar from "../components/NavBar"

const Auto = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, err } = useSWR(`/api/auta/${id}`, (url) => fetch(url, {method: "POST"}).then(e => e.json()).then(e => e))
    if (!data) return (<><NavBar /><div>Loading...</div></>)
    const deleteCar = () => {
        fetch(`/api/auta/deletecar/${id}`, {
            method:"POST",
            headers:{'Content-Type':'application/json'}
        }).then(res => {
            navigate("/")
        })
    }
    const editCar = () => {
        navigate("/edit/" + id)
    }
    const opravy = () => {
        navigate("/opravy/"+id)
    }
    console.log(data)
    return (
        <>
            <NavBar />
            <Container>
                <Card style={{width: "100%"}} className="slideFromTop">
                    <Card.Body style={{fontSize: "23px"}}>
                        <div className="car-info">
                            <p className="car-params">Značka:</p>
                            <span className="car-data">{data.nazev}</span>
                            <span className="float-end">
                                <p className="car-params text-center">STK</p>
                                <span className="car-data me-5">{new Date(data.STK).toLocaleDateString()}</span>
                            </span>
                        </div>

                        <div className="car-info">
                            <p className="car-params">Model:</p>
                            <span className="car-data"> {data.model}</span>
                            <span className="float-end">
                                <p className="car-params text-center">Najeto</p>
                                <span className="car-data me-5">{data.pocet_km} km</span>
                            </span>
                            
                        </div>
                        
                        <div className="car-info">
                            <p className="car-params">SPZ:</p>
                            <span className="car-data"> {data.spz}</span>
                            <span className="float-end">
                                <p className="car-params text-center">Počet dveří</p>
                                <span className="car-data me-5">{data.pocet_dveri}</span>
                            </span>
                        </div>

                        <div className="car-info">
                            <p className="car-params">Barva:</p>
                            <span className="car-data"> {data.barva}</span>
                            <span className="float-end">
                                <p className="car-params text-center">VIN</p>
                                <span className="car-data me-5">{data.VIN}</span>
                            </span>
                        </div>

                        <div className="car-info">
                            <p className="car-params">Popis:</p>
                            <span className="car-data"> {data.popis}</span>
                        </div>

                        <div className="opravy-container">
                        {data.opravy.length > 0 ? <span>Opravy:</span> : ""}

                            {data.opravy.map((oprava, index) => 
                                <div key={index} className="opravy">
                                    <p className="oprava">{oprava.popis_opravy}</p>
                                </div>
                            )}
                        </div>
                        <div className="center">
                        <button className="btn btn-outline-primary" onClick={() => opravy()}>Opravy</button>
                        <button className="btn btn-outline-danger" onClick={() => deleteCar()}>Odstranit Auto</button>
                        <button className="btn btn-outline-warning" onClick={() => editCar()}>Upravit Auto</button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Auto
