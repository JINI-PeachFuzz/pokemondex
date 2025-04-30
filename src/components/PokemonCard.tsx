// React 기본 기능
import React, { useState } from "react";
import "./PokemonCard.css";

interface PokemonCardProps {
  name: string; // 포켓몬 이름
  image: string; // 포켓몬 이미지 주소
  id: number; // 포켓몬 ID (상세 API 호출에 사용)
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, id }) => {
  // 클릭하면 뒤집히는 상태값 정의 (false면 앞면)
  const [flipped, setFlipped] = useState(false);

  // flipped / 클릭하면 상태를 반전시켜줌줌
  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    // 카드 클릭 시 상태 변경
    <div
      className={`pokemon-card ${flipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      {/* 앞면 */}
      <div className="card-front">
        <img src={image} alt={name} />
        <p>{name}</p>
      </div>

      {/* 뒷면: 현재는 임시 텍스트. 추후에 포켓몬 상세 정보 넣을 예정! */}
      <div className="card-back">
        <p>포켓몬 정보 출력 예정</p>
        <p>키라던지 몸무게라던지 특성같은거</p>
      </div>
    </div>
  );
};

export default PokemonCard;
