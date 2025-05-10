// React에서 기본 기능들을 불러옴 (컴포넌트 만들기용)
// useState는 상태(state)를 저장하고 바꿀 수 있게 해주는 기능 -> count와 setCount가 있을 경우에 +1증가시켜주는 버튼을 만들었을 경우 useState가 상태를 초기값0에서 클릭할때의 상태를 저장하기 때문에 숫자가 증가되게 해줌. ->숫자, 문자열, 객체 등 상태 저장할 때 사용함
// useEffect 는 화면이 처음 보이거나 상태가 바뀔 때 실행되는 코드(컴포넌트가 랜더링되거나 업데이트될 때)인데 처음 딱 1번 실행됌 / 의존성 배열이라고 함/입력하는 두 번째 매개변수를 뜻하고 배열의 내용이 변경되었을 경우 부수 효과 함수가 실행됨.-> API 호출, 타이머, 외부요소 사용시 사용함.
import React, { useState, useEffect, useRef } from "react";
// API 요청을 쉽게 해주는 axios 라이브러리
import axios from "axios";

import PokemonCard from "./PokemonCard";

// 포켓몬 개체 하나를 위한 타입 정의 (name과 url이 들어있는 객체)
interface Pokemon {
  name: string; // 포켓몬 이름
  url: string; // 상세 정보 URL
}

// 함수형 컴포넌트 정의. Pokedex 컴포넌트
const Pokedex: React.FC = () => {
  // 포켓몬 리스트 상태. 기본값은 빈 배열
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0); // offset - API 호출 시 몇 번째부터 불러올지 정하는 값
  // 옵셋=30이면 31번째부터 시작하는거
  const loader = useRef(null); // 관찰 대상 요소 (화면 하단에 도달했는지 확인용) / 무한스크롤하고싶어서..

  const fetchPokemon = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`
      ); // axios.get(...)으로 포켓몬 30마리를 가져옴
      setPokemonList((prev) => [...prev, ...res.data.results]); // 기존 리스트에 추가 / 기존 배열에 이어붙임: setPokemonList((prev) => [...prev, ...새로운애들])
      setOffset((prev) => prev + 30); // 다음 요청을 위해 offset 30 증가
    } catch (error) {
      console.error("포켓몬 데이터를 불러오는 데 실패했습니다.", error);
    }
  };

  // 컴포넌트가 화면에 처음 보여질 때 딱 한 번 실행되는 코드 (useEffect 사용) == 처음 마운트될 때 첫 데이터를 불러옴
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 요소가 화면에 보이면 fetch 실행
        if (entries[0].isIntersecting) {
          fetchPokemon();
        }
      },
      { threshold: 1 } // 여기서 1은 요소가 화면에 100% 다 보여졌을 때만 감지함
    );

    // loader div가 있다면 관찰 시작
    if (loader.current) {
      observer.observe(loader.current);
    } // loader.current가 화면에 100% 보일 때(threshold: 1) → fetchPokemon() 호출 / <div ref={loader} /> 부분을 의미함 (감시 대상)
    // -> 사용자가 스크롤을 내려 하단 감시 div가 보이면 새로운 포켓몬을 자동으로 추가로 불러와줌

    return () => {
      // 컴포넌트 언마운트 시 관찰 중지
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader.current]); // loader.current 값이 바뀔 때마다 실행됨

  return (
    <>
    
      {/* 포켓몬 카드들을 출력하는 영역 */}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {pokemonList.map((pokemon, index) => (
          // map으로 카드들을 렌더링함
          <PokemonCard
            key={index}
            name={pokemon.name}
            id={index + 1}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              index + 1
            }.png`}
          />
        ))}
      </div>

      {/* 무한 스크롤을 위한 감시 대상 div */}
      <div ref={loader} style={{ height: "50px", margin: "20px" }} />
      {/* <div ref={loader} />는 화면 맨 아래 감시용 요소로 사용하기 위해서 넣은거 */}
    </>
  );
};

export default Pokedex;
