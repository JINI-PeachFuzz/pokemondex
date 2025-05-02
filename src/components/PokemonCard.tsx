import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PokemonCard.css";

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
        if (korean) {
          setNameKor(korean.name);
        }
      })
      .catch(() => {
        alert("포켓몬 이름 정보를 불러오지 못했습니다.");
      });
  }, [id]);

  // 카드가 클릭되어 뒤집히면 상세 정보 API 호출
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
      className={`pokemon-card ${flipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      {/* 앞면 */}
      <div className="card-front">
        <img src={image} alt={nameKor || name} />
        <p>{nameKor || "정보를 불러오는 중입니다.."}</p>
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
            <p>타입: {detail.types.map((t: any) => t.type.name).join(", ")}</p>
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
  );
};

export default PokemonCard;
