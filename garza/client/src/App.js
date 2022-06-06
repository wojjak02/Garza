import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Route, Routes } from 'react-router';
import Index from "./pages/Index";
import Auto from "./pages/Auto";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Opravy from "./pages/Opravy";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auto/:id" element={<Auto />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/opravy/:id" element={<Opravy />} />
      </Routes>
    </>
  );
}

export default App;
