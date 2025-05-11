import React from "react";
import buttons from "../global/styles/buttons";
const { likeBbutton } = buttons;

type GameResultProps = {
  score: number;
  numQuestions: number;
  onRestart: () => void;
};

export default function GameResult({
  score,
  numQuestions,
  onRestart,
}: GameResultProps) {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>결과</h2>
      <p>
        🎉 총 {numQuestions}문제 중 {score}문제를 맞췄어요! 🎉
      </p>
      <p>정답률 : {(score / numQuestions) * 100}%</p>
      <button style={{...likeBbutton, fontWeight: "bold"}} onClick={onRestart}>
        재도전하기
      </button>
    </div>
  );
}
