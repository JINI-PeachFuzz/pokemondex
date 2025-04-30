// React에서 기본 기능들을 불러옴 (컴포넌트 만들기용)
import React, { useEffect, useState } from 'react';
// API 요청을 쉽게 해주는 axios 라이브러리
import axios from 'axios';

// 포켓몬 개체 하나를 위한 타입 정의 (name과 url이 들어있는 객체)
interface Pokemon {
  name: string; // 포켓몬 이름
  url: string;  // 상세 정보 URL (일단 지금은 안씀 혹시나해서 넣어둠둠)
}

// 함수형 컴포넌트 정의. Pokedex 컴포넌트
const Pokedex: React.FC = () => {
  // 포켓몬 리스트 상태 만들기. 기본값은 빈 배열
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  // 컴포넌트가 화면에 처음 보여질 때 딱 한 번 실행되는 코드 (useEffect 사용)
  useEffect(() => {
    // axios로 API 호출해서 포켓몬 151마리 목록 불러오기
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => {
        // 받아온 포켓몬 데이터를 상태에 저장 (setPokemonList 실행)
        setPokemonList(response.data.results);
      })
      .catch((error) => {
        // 에러가 나면 콘솔에 출력하기
        console.error('포켓몬 데이터를 불러오는 데 실패하였습니다:', error);
      });
  }, []); // 의존성 배열이 빈 배열이면 -> 처음 1번만 실행이란 뜻

  return (
    <div>
      <h1>포켓몬 도감</h1>
      
      {/* 포켓몬 목록을 하나씩 돌면서 이름 출력 */}
      <ul>
      {pokemonList.map((pokemon, index) => {
          const id = index + 1; // 포켓몬 ID는 1부터 시작
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <li key={pokemon.name}>
              <img src={imageUrl} alt={pokemon.name} />
              <span>{pokemon.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// 이 컴포넌트를 외부에서도 쓸 수 있게 내보냄
export default Pokedex;
