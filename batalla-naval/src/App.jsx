import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import {Component} from "react";
import {UserProvider} from "./components/UserContext.jsx";
import Preparacion from "./pages/Preparacion.jsx";
import Partida from "./pages/Partida.jsx";

export default class App extends Component {

    render() {
        return (
            <>
                <UserProvider>
                    <Router>
                        <Routes>
                            <Route exact path="/" element={<Home/>}/>
                            <Route exact path="/preparacion" element={<Preparacion/>}/>
                            <Route exact path="/partida" element={<Partida/>}/>
                        </Routes>
                    </Router>
                </UserProvider>


            </>
        )
    }
}

