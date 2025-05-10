import React, { useState, useEffect } from "react";
import axios from "axios";
import sizes from "../global/styles/sizes";
import "./PokemonCard.css";

const cardStyle = {
  width: sizes.big,
  height: sizes.big,
  padding: "13px",
};

const translateType = (type: string) => {
  const map: { [key: string]: string } = {
    grass: "풀",
    poison: "독",
    fire: "불꽃",
    water: "물",
    flying: "비행",
    bug: "벌레",
    electric: "전기",
    ground: "땅",
    rock: "바위",
    psychic: "에스퍼",
    ice: "얼음",
    dragon: "드래곤",
    dark: "악",
    fairy: "페어리",
    steel: "강철",
    ghost: "고스트",
    fighting: "격투",
    normal: "노말",
  };
  return map[type] || type; // 등록안된건 영어그대로 나오게
};

interface PokemonCardProps {
  name: string;
  image: string;
  id: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, id }) => {
  const [flipped, setFlipped] = useState(false); // 카드가 뒤집혔는지 상태 저장
  const [detail, setDetail] = useState<any>(null); // 포켓몬 상세정보 저장
  const [nameKor, setNameKor] = useState<string>(""); // 한글 이름 저장

  const handleClick = () => {
    setFlipped(!flipped); // 클릭 시 앞/뒤 상태 반전
  };

  // 한글 이름 불러오기 (처음 렌더링될 때 1번 실행)
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((res) => {
        const korean = res.data.names.find(
          (n: any) => n.language.name === "ko"
        );
        if (korean) setNameKor(korean.name);
      })
      .catch(() => {
        alert("포켓몬 이름 정보를 불러오지 못했습니다.");
      });
  }, [id]);

  // 카드가 클릭되어 뒤집히면 상세 정보 API 호출 (뒤집었을 때만 실행)
  // flipped는 카드가 클릭되어 뒤집혔는지 상태를 저장하는 값이고 detail은 카드가 뒤집혔을 때 한번만 API를 불러와 상세 정보를 저장함

  /* 1. 카드앞면에서 이미지와 한글이름이 없으면 로딩텍스트나오게
  2. 카드클릭시 flipped상태를 반전시켜 앞/뒷면을 전환시킴
  3. 카드가 flipped상태일땐 API를 통해 상세정보 키, 몸무게,타입등 을 가져오게
  4. 타입은 translateType함수를 통해 한글로 변환시킴 */
  useEffect(() => {
    if (flipped && !detail) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => setDetail(res.data))
        .catch(() => {
          alert("포켓몬 상세 정보를 불러오지 못했습니다.");
        });
    }
  }, [flipped, detail, id]);

  return (
    <div
      style={cardStyle}
      className={`pokemon-card ${flipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      {/* 회전 효과를 줄 박스 / 이게 있어야함 */}
      <div className="card-inner">
        {/* 앞면 */}
        <div className="card-front">
          <img src={image} alt={nameKor || name} />
          <p>{nameKor || "불러오는 중..."}</p>
        </div>

        {/* 뒷면 */}
        <div className="card-back">
          {detail ? (
            <>
              <h3>
                {nameKor} (#{id})
              </h3>
              <p>키: {detail.height}</p>
              <p>몸무게: {detail.weight}</p>
              <p>
                타입:{" "}
                {detail.types
                  .map((t: any) => translateType(t.type.name))
                  .join(", ")}
              </p>
              <p>
                기술:{" "}
                {detail.moves
                  .slice(0, 3)
                  .map((m: any) => m.move.name)
                  .join(", ")}
              </p>
            </>
          ) : (
            <p>정보 불러오는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
