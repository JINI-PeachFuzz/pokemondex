import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HeaderTabs from "./components/Header";
import PokedexPage from "./pages/PokedexPage";
import ShadowGamePage from "./pages/ShadowGamePage";
import Footer from "./components/Footer";
import './App.css';

function AppWrapper() {
  return (
    <Router>
      <AppWithBackground />
    </Router>
  );
}

function AppWithBackground() {
  const location = useLocation();

  return (
    <div className="app-container">
      <HeaderTabs />

      <div className="main-content">
        <Routes>
          <Route
            path="/pokedex"
            element={
              <div className="bg-pokedex">
                <PokedexPage />
              </div>
            }
          />
          <Route
            path="/shadowgame"
            element={
              <div className="bg-shadowgame">
                <ShadowGamePage />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div className="bg-main">
                <div>메인 페이지</div>
              </div>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default AppWrapper;
