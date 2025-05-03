import React, { useState } from "react";
import ShadowGame from "../components/ShadowGame";

const ShadowGamePage: React.FC = () => {
  const [mode, setMode] = useState<"input" | "choice">("input");

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button onClick={() => setMode("input")}>직접 입력</button>
        <button
          onClick={() => setMode("choice")}
          style={{ marginLeft: "10px" }}
        >
          4지선다형
        </button>
      </div>
      <ShadowGame mode={mode} />
    </div>
  );
};

export default ShadowGamePage;
