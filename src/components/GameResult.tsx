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
    <div style={{ textAlign: "center", marginTop: 90 }}>
      <h2>결과</h2>
      <p>
        🎉 총 {numQuestions}문제 중 {score}문제를 맞췄어요! 🎉
      </p>
      <p>정답률 : {Math.floor((score / numQuestions) * 100)}%</p>
      {/* 소수점아래는 버림 / 첫째자리까지면 {((score / numQuestions) * 100).toFixed(1)}% 이런식으로.. */}
      <button
        style={{ ...likeBbutton, fontWeight: "bold" }}
        onClick={onRestart}
      >
        재도전하기
      </button>
    </div>
  );
}
