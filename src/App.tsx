import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HeaderTabs from "./components/Header";
import PokedexPage from "./pages/PokedexPage";
import ShadowGamePage from "./pages/ShadowGamePage";
import Footer from "./components/Footer";
import './App.css';
import MainPage from "./pages/MainPage"; 

function AppWrapper() {
  return (
    <Router>
      <AppWithBackground />
    </Router>
  );
}

function AppWithBackground() {
  const location = useLocation();

  let bgClass = "bg-main";
  if (location.pathname === "/pokedex") {
    bgClass = "bg-pokedex";
  } else if (location.pathname === "/shadowgame") {
    bgClass = "bg-shadowgame";
  }

  return (
    <div className={bgClass}>
      <div className="app-container">
        <HeaderTabs />

        <div className="main-content">
          <Routes>
            <Route path="/pokedex" element={<PokedexPage />} />
            <Route path="/shadowgame" element={<ShadowGamePage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default AppWrapper;
