// React에서 기본 기능들을 불러옴 (컴포넌트 만들기용)
// useState는 상태(state)를 저장하고 바꿀 수 있게 해주는 기능 -> count와 setCount가 있을 경우에 +1증가시켜주는 버튼을 만들었을 경우 useState가 상태를 초기값0에서 클릭할때의 상태를 저장하기 때문에 숫자가 증가되게 해줌. ->숫자, 문자열, 객체 등 상태 저장할 때 사용함
// useEffect 는 화면이 처음 보이거나 상태가 바뀔 때 실행되는 코드(컴포넌트가 랜더링되거나 업데이트될 때)인데 처음 딱 1번 실행됌 / 의존성 배열이라고 함/입력하는 두 번째 매개변수를 뜻하고 배열의 내용이 변경되었을 경우 부수 효과 함수가 실행됨.-> API 호출, 타이머, 외부요소 사용시 사용함.
import React, { useEffect, useState } from 'react';
// API 요청을 쉽게 해주는 axios 라이브러리
import axios from 'axios';

import PokemonCard from './PokemonCard'

// 포켓몬 개체 하나를 위한 타입 정의 (name과 url이 들어있는 객체)
interface Pokemon {
  name: string; // 포켓몬 이름
  url: string;  // 상세 정보 URL (일단 지금은 안씀 혹시나해서 넣어둠)
}

// 함수형 컴포넌트 정의. Pokedex 컴포넌트
const Pokedex: React.FC = () => {
  // 포켓몬 리스트 상태 만들기. 기본값은 빈 배열
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  // 컴포넌트가 화면에 처음 보여질 때 딱 한 번 실행되는 코드 (useEffect 사용)
  useEffect(() => {
    // axios로 API 호출해서 포켓몬 151마리 목록 불러오기
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=30') // 포켓몬 30마리만 가져오기
      .then((res) => {
        // 받아온 포켓몬 데이터를 상태에 저장 (setPokemonList 실행)
        setPokemonList(res.data.results);
      })
      .catch((error) => {
        // 에러가 나면 콘솔에 출력하기
        console.error('포켓몬 데이터를 불러오는 데 실패하였습니다:', error);
      });
  }, []); // 의존성 배열이 빈 배열이면 -> 처음 1번만 실행이란 뜻

  return (
    <>
      <h1>포켓몬 도감</h1>
      
      {/* 포켓몬 목록을 하나씩 돌면서 이름 출력 */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pokemonList.map((pokemon, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            id={index + 1}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
          />
        ))}
      </div>
    </>
  )
}

// 이 컴포넌트를 외부에서도 쓸 수 있게 내보냄
export default Pokedex;
