import React, { useEffect, useState } from "react";
import axios from "axios";
import { getKoreanName } from "../utils/getKoreanName";
import "./ShadowGame.css";

import colors from "../global/styles/colors";
import buttons from "../global/styles/buttons";
const { blue, danger } = colors;
const { checkWbutton, checkbutton } = buttons;

type GamePlayProps = {
  mode: "input" | "choice" | null;
  numQuestions: number;
  onFinish: (finalScore: number) => void;
};

type PokemonData = {
  name: string;
  image: string;
};

export default function GamePlay({
  mode,
  numQuestions,
  onFinish,
}: GamePlayProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);

  const fetchRandomPokemon = async () => {
    const id = Math.floor(Math.random() * 151) + 1;
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const name = await getKoreanName(res.data.name);
    const image = res.data.sprites.other["official-artwork"].front_default;
    setPokemon({ name, image });

    const dummyChoices = ["파이리", "꼬부기", "이상해씨", name];
    const shuffled = dummyChoices.sort(() => Math.random() - 0.5);
    setChoices(shuffled);
  };

  useEffect(() => {
    fetchRandomPokemon();
    setShowResult(false);
    setSelected(null);
  }, [currentQuestion]);

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        handleNext();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showResult]);

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    const correct = answer === pokemon?.name;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    setPokemon(null); // 일단 이전 포켓몬 제거해서 깜빡임 방지

    setTimeout(() => {
      if (currentQuestion < numQuestions) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        onFinish(score);
      }
    }, 50); // 약간의 지연을 줘서 자연스러움 확보
  };

  if (!pokemon)
    return (
      <div style={{ textAlign: "center", marginTop: 65, padding: 20 }}>
        다음 포켓몬을 섭외하는 중입니다..
      </div>
    );

  return (
    <div style={{ textAlign: "center", marginTop: 35, padding: 20 }}>
      <h3>
        {currentQuestion} / {numQuestions} 문제
      </h3>

      {pokemon ? (
        <img
          src={pokemon.image}
          alt="포켓몬"
          style={{
            filter: showResult ? "brightness(1)" : "brightness(0)",
            width: 200,
            transition: "filter 0.3s ease-in-out",
          }}
        />
      ) : (
        <div style={{ height: 200 }} /> // 빈 공간 유지
      )}

      {mode === "input" ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="answerInput"
            style={{
              padding: "8px",
              marginLeft: "60px",
              fontSize: "18px",
              width: "250px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = (e.target as HTMLInputElement).value;
                handleAnswer(value);
              }
            }}
          />
          <button
            style={{ ...checkWbutton }}
            onClick={() => {
              const value = (document.getElementById("answerInput") as HTMLInputElement).value;
              handleAnswer(value);
            }}
          >
            🎯
          </button>
        </div>
      </div>
      ) : (
        <div className="choice-buttons">
          {choices.map((choice) => (
            <button
              key={choice}
              style={{
                ...checkbutton,
                backgroundColor:
                  selected === choice ? colors.dark : colors.white,
                color: selected === choice ? colors.white : colors.dark,
                border: selected === choice ? "none" : checkbutton.border,
              }}
              onClick={() => handleAnswer(choice)}
              disabled={showResult}
            >
              {choice}
            </button>
          ))}
        </div>
      )}

      {showResult && (
        <div className="next-buttons" style={{ marginTop: 15 }}>
          <div style={{ color: isCorrect ? blue : danger, fontWeight: "bold" }}>
            {isCorrect
              ? "🎉 정답입니다! 포켓몬박사신가요? 🎉"
              : `❌ 앗! 정답은 ${pokemon?.name} 였답니다~ ❌`}
          </div>
          <br />

          {/* <div
            style={{ display: "flex", justifyContent: "center", gap: "12px" }}
          >
            <button
              style={{ ...likeBbutton, fontWeight: "bold" }}
              onClick={handleNext}
            >
              다음 문제
            </button>
            <button
              style={{ ...grayBbutton, fontWeight: "bold" }}
              onClick={() => onFinish(score)}
            >
              그만하기
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
}
