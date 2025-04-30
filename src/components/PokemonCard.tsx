// React 기본 기능
import React, { useState } from 'react';
import './PokemonCard.css';

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  id: number;
  koreanName: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  moves: string[];
}

// 함수형 컴포넌트 정의
const PokemonCard: React.FC<PokemonCardProps> = ({
  name, imageUrl, id, koreanName, height, weight, types, abilities, moves
}) => {
  // 카드가 뒤집혔는지를 저장하는 상태값
  const [flipped, setFlipped] = useState(false);

  // 클릭했을 때 뒤집힘 상태를 반전시키는 함수
  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    // 카드 전체 영역에 클릭 이벤트와 클래스명 지정
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      {/* 앞면 - 포켓몬 이름과 이미지 */}
      <div className="card-front">
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </div>

      {/* 뒷면 - 정보들 */}
      <div className="card-back">
        <h2>{koreanName} (#{id})</h2>
        <img src={imageUrl} alt={name} />
        <p>English Name: {name}</p>
        <p>Height: {height}</p>
        <p>Weight: {weight}</p>
        <p>Type: {types.join(', ')}</p>
        <p>Abilities: {abilities.join(', ')}</p>
        <p>Moves:</p>
        <ul>
          {moves.slice(0, 7).map((move, index) => (
            <li key={index}>{move}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
