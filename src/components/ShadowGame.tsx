import React, { useEffect, useState } from "react";
import { getKoreanName } from "../utils/getKoreanName";
import "./ShadowGame.css";

interface ShadowGameProps {
  mode: "input" | "choice";
}

const ShadowGame: React.FC<ShadowGameProps> = ({ mode }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [koreanAnswer, setKoreanAnswer] = useState<string>("");
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]); // 4지선다형 선택지를 배열로 저장하게 하고 무작위 포켓몬 ID와 이름이 들어가게 함.
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
  }; // fetch는 단지 확인만 아래 setImageUrl은 보여줄 url선택,적용

  const loadPokemon = async () => {
    const randId = Math.floor(Math.random() * 151) + 1; // 그림자이미지 정답고르는용도(기준) 아래는 보기4개 채우는 용도

    const primaryUrl = testImageUrl(randId); // 공식일러스트그림 고화질
    const fallbackUrl = fallbackImageUrl(randId); // 없을때 대비 저화질도트스타일 / 이미지안뜨는거 방지용
    const isValid = await checkImageExists(primaryUrl); // 이미지주소에 패치요청을 보내서 응답상태로 이미지 존재하는지 미리확인하는거
    setImageUrl(isValid ? primaryUrl : fallbackUrl); // res.ok로 true면 primary, false면 fallback.

    const answerName = await getKoreanName(randId);
    setKoreanAnswer(answerName);

    if (mode === "choice") {
      const ids = new Set<number>();
      ids.add(randId); // 정답은 하나고 오답은 3개 추가인걸로 set으로 중복을 제거하고 getKoreanName으로 이름을 가져오고 배열 options에 번호와 이름형태로 저장.
      while (ids.size < 4) {
        ids.add(Math.floor(Math.random() * 151) + 1); // 랜덤함수가 0이상 1미만의 소수를 만들어주기때문에 0.0~150.999가 나옴 그래서 floor을 써서 버림을 하고 1번 부터 나올 수 있게 +1을 해준거!
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
    }, 2000); // 2초뒤 담문제 ㄱㄱㄱ
  };

  return (
    <div className="shadow-container">
      {imageUrl && (
        <img
          className="shadow-img"
          src={imageUrl}
          alt="포켓몬 그림자"
          style={{
            filter: feedback ? "none" : "brightness(0) saturate(100%)", // 정답 맞추기 전엔 그림자로 맞춘후엔 컬러로!
            mixBlendMode: feedback ? "normal" : "multiply", // multiply : 배경이 흰색일 땐 실루엣처럼 보여짐
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
            </button> // map을 사용(키-값 쌍으로 저장)해서 옵션배열을 돌면서 버튼태그를 4개 자동생성되게 해주는거 opt.name은 버튼에 표시될 포켓몬 이름이고 (옵션스가 이미 키와 값형태인데 이걸 한덩어리고 생각해서 버튼별 인덱스를 부여한거)checkAnswer은 클릭시 정답 확인함수를 호출시켜줌
          ))}
        </div>
      )}

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
};

export default ShadowGame;
