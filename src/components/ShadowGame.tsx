import React, { useEffect, useState } from "react";
import axios from "axios";
import { getKoreanName } from "../utils/getKoreanName";
import "./ShadowGame.css";

interface ShadowGameProps {
  mode: "input" | "choice";
}

const ShadowGame: React.FC<ShadowGameProps> = ({ mode }) => {
  const [answer, setAnswer] = useState<string>(""); // 정답 영어이름
  const [imageUrl, setImageUrl] = useState<string>(""); // 이미지 주소
  const [koreanName, setKoreanName] = useState<string>(""); // 정답 한글이름
  const [options, setOptions] = useState<string[]>([]); // 4지선다 옵션
  const [userInput, setUserInput] = useState<string>(""); // 직접 입력값
  const [feedback, setFeedback] = useState<string>(""); // 정답 결과

  // 랜덤 포켓몬 1마리 불러오기
  const loadRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1; // 1~151번
    try {
      const detail = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const species = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${randomId}`
      );

      const korean = species.data.names.find(
        (n: any) => n.language.name === "ko"
      );
      setKoreanName(korean?.name || detail.data.name);
      setAnswer(detail.data.name);
      setImageUrl(detail.data.sprites.front_default);

      if (mode === "choice") {
        const choices = [detail.data.name];
        while (choices.length < 4) {
          const rand = Math.floor(Math.random() * 151) + 1;
          const res = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${rand}`
          );
          if (!choices.includes(res.data.name)) {
            choices.push(res.data.name);
          }
        }
        setOptions(shuffleArray(choices));
      }
    } catch (error) {
      console.error("포켓몬 불러오기 실패", error);
    }
  };

  // 배열 섞기
  const shuffleArray = (arr: string[]) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    loadRandomPokemon();
  }, [mode]);

  const checkAnswer = (input: string) => {
    if (input.toLowerCase().trim() === answer.toLowerCase()) {
      setFeedback("🎉 정답입니다!");
    } else {
      setFeedback(`❌ 오답입니다! 정답: ${koreanName}`);
    }
    setTimeout(() => {
      setUserInput("");
      setFeedback("");
      loadRandomPokemon();
    }, 2000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          margin: "20px auto",
          width: 300,
          height: 300,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="포켓몬 실루엣"
            style={{ filter: "brightness(0)", width: "200px", height: "200px" }}
          />
        )}
      </div>

      {/* 모드별로 다르게 렌더링 */}
      {mode === "input" ? (
        <div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="포켓몬 이름 입력"
            style={{ padding: "10px", width: "300px" }}
          />
          <button
            onClick={() => checkAnswer(userInput)}
            style={{ marginLeft: "10px" }}
          >
            확인
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => checkAnswer(opt)}
              style={{
                margin: "10px",
                padding: "10px 20px",
                backgroundColor: "#eee",
                cursor: "pointer",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {feedback && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>{feedback}</p>
      )}
    </div>
  );
};

export default ShadowGame;
