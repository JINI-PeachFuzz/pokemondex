import React, { useEffect, useState } from "react";
import { getKoreanName } from "../utils/getKoreanName";
import "./ShadowGame.css";

interface ShadowGameProps {
  mode: "input" | "choice";
}

const ShadowGame: React.FC<ShadowGameProps> = ({ mode }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [koreanAnswer, setKoreanAnswer] = useState<string>("");
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  const testImageUrl = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const fallbackImageUrl = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const checkImageExists = async (url: string) => {
    try {
      const res = await fetch(url);
      return res.ok;
    } catch {
      return false;
    }
  };

  const loadPokemon = async () => {
    const randId = Math.floor(Math.random() * 151) + 1;

    const primaryUrl = testImageUrl(randId);
    const fallbackUrl = fallbackImageUrl(randId);
    const isValid = await checkImageExists(primaryUrl);
    setImageUrl(isValid ? primaryUrl : fallbackUrl);

    const answerName = await getKoreanName(randId);
    setKoreanAnswer(answerName);

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
      setOptions(optionsWithNames.sort(() => Math.random() - 0.5));
    }
  };

  useEffect(() => {
    loadPokemon();
  }, [mode]);

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
      {imageUrl && (
        <img
          className="shadow-img"
          src={imageUrl}
          alt="포켓몬 그림자"
          style={{
            filter: feedback ? "none" : "brightness(0) saturate(100%)",
            mixBlendMode: feedback ? "normal" : "multiply",
            width: "200px",
            height: "200px",
          }}
        />
      )}

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
