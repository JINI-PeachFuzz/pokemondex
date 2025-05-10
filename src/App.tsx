import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderTabs from "./components/Header";
import PokedexPage from "./pages/PokedexPage";
import ShadowGamePage from "./pages/ShadowGamePage";
import Footer from "./components/Footer";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <HeaderTabs />
        <div className="main-content">
          <Routes>
            <Route path="/pokedex" element={<PokedexPage />} />
            <Route path="/shadowgame" element={<ShadowGamePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
