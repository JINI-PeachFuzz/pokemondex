import React, { useEffect, useState } from "react";
import axios from "axios";
import { getKoreanName } from "../utils/getKoreanName"; // 유틸 함수
import "./ShadowGame.css";

interface ShadowGameProps {
  mode: "input" | "choice"; // 입력 또는 선택 모드
}

const ShadowGame: React.FC<ShadowGameProps> = ({ mode }) => {
  const [answerId, setAnswerId] = useState<number>(1); // 정답 포켓몬 ID
  const [imageUrl, setImageUrl] = useState<string>(""); // 그림자 이미지
  const [koreanAnswer, setKoreanAnswer] = useState<string>(""); // 정답 한글 이름
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]); // 4지선다
  const [userInput, setUserInput] = useState<string>(""); // 입력값
  const [feedback, setFeedback] = useState<string>(""); // 결과

  // 포켓몬 불러오는 함수
  const loadPokemon = async () => {
    const randId = Math.floor(Math.random() * 151) + 1;
    setAnswerId(randId);
    setImageUrl(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randId}.png`
    );

    const answerName = await getKoreanName(randId);
    setKoreanAnswer(answerName);

    // 선택지 4개 생성
    if (mode === "choice") {
      const ids = new Set<number>();
      ids.add(randId);
      while (ids.size < 4) {
        ids.add(Math.floor(Math.random() * 151) + 1);
      }

      const optionsWithNames = await Promise.all(
        Array.from(ids).map(async (id) => {
          const name = await getKoreanName(id);
          return { id, name };
        })
      );

      // 랜덤 섞기
      setOptions(optionsWithNames.sort(() => Math.random() - 0.5));
    }
  };

  useEffect(() => {
    loadPokemon();
  }, [mode]);

  // 정답 확인
  const checkAnswer = (input: string) => {
    if (input.trim() === koreanAnswer) {
      setFeedback("🎉 정답입니다! 포켓몬박사신가요?");
    } else {
      setFeedback(`❌ 앗! 정답은 ${koreanAnswer} 였답니다~`);
    }

    setTimeout(() => {
      setUserInput("");
      setFeedback("");
      loadPokemon();
    }, 2000);
  };

  return (
    <div className="shadow-container">
      <img
        className="shadow-img"
        src={imageUrl}
        alt="포켓몬 그림자"
        style={{
          filter: "drop-shadow(0 0 0 black)", // 검정 그림자처럼 보이게
          width: "200px",
          height: "200px",
        }}
      />

      {mode === "input" ? (
        <div>
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="포켓몬 이름 입력"
          />
          <button onClick={() => checkAnswer(userInput)}>확인</button>
        </div>
      ) : (
        <div className="choices">
          {options.map((opt, idx) => (
            <button key={idx} onClick={() => checkAnswer(opt.name)}>
              {opt.name}
            </button>
          ))}
        </div>
      )}

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
};

export default ShadowGame;
