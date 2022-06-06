import { useState } from 'react'
import { Container } from 'react-bootstrap'
import NavBar from "../components/NavBar"
import List from "../components/List"
const Index = () => {
    const [search, setSearch] = useState("")
    return (
        <>
            <NavBar />
            <Container className="border fadeIn">
                <input className="w-100 mt-2" onChange={(e) => setSearch(e.target.value.toUpperCase())} type="search" placeholder="Vyhledat podle SPZ" aria-label="Search" />
                <List search={search} />
            </Container>
        </>
    )
}

export default Index
