import React from "react";
import Pokemon from "./components/Pokemon"; // src 폴더 바로 아래에 있으니까 './'로 불러옴
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderTabs from "./components/HeaderTabs";
import PokedexPage from "./pages/PokedexPage";
import ShadowGamePage from "./pages/ShadowGamePage";


function App() {
  return (
    <Router>
      <div className="App">
        {/* 여기서 도감 컴포넌트를 화면에 출력함 */}
        <HeaderTabs />
        <Routes>
          <Route path="/" element={<PokedexPage />} />
          <Route path="/shadow" element={<ShadowGamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
