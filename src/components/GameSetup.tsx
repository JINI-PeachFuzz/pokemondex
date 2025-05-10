import React from "react";

type GameSetupProps = {
  mode: "input" | "choice" | null;
  setMode: (mode: "input" | "choice") => void;
  numQuestions: number;
  setNumQuestions: (count: number) => void;
  onStart: () => void;
};

export default function GameSetup({
  mode,
  setMode,
  numQuestions,
  setNumQuestions,
  onStart,
}: GameSetupProps) {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>모드를 선택해주세요</h2>
      <button onClick={() => setMode("input")}>직접 입력</button>
      <button onClick={() => setMode("choice")}>4지선다형</button>

      <h3>🎯몇 문제에 도전하시나요❓</h3>
      <select
        value={numQuestions}
        onChange={(e) => setNumQuestions(Number(e.target.value))}
      >
        <option value={10}>10문제 풀기</option>
        <option value={20}>20문제 풀기</option>
        <option value={30}>30문제 풀기</option>
      </select>

      <br/>
      <br/>
      <button onClick={onStart} disabled={!mode}>
        도전하기
      </button>
    </div>
  );
}
