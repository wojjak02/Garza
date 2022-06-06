import React from 'react';
import { useNavigate } from "react-router-dom";
import useSWR from "swr"
import NavBar from "../components/NavBar"
import { Table } from "react-bootstrap"

const List = ({search}) => {
    let { data: auta } = useSWR("/api/auta", (url) => fetch(url, {method: "POST"}).then(e => e.json()).then(e => e))
    const navigate = useNavigate()
    
    if (!auta) return (<><NavBar /><div>Loading...</div></>)
    auta = auta.filter(auto => auto.spz.toUpperCase().includes(search))
    return (
        <Table>
            <thead>
                <tr>
                    <th>SPZ</th>
                    <th>Značka</th>
                    <th>Model</th>
                    <th>Typ</th>
                </tr>
            </thead>
            <tbody>
                {auta.map(auto =>
                    <tr key={auto.id_auta} onClick={() => {
                        navigate(`/auto/${auto.id_auta}`)
                    }}>
                        <td>{auto.spz}</td>
                        <td>{auto.nazev}</td>
                        <td>{auto.model}</td>
                        <td>{auto.nazev_skupiny}</td>
                    </tr>)}
            </tbody>
        </Table>
    )
};

export default List;
