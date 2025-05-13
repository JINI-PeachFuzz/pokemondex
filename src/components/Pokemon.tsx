import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

interface PokedexProps {
  search: string;
  sort: string;
  onSearchSubmit: () => void;
  setSearch: (value: string) => void;
  setSort: (value: string) => void;
  searchValue: string;
  sortValue: string;
}

interface Pokemon {
  name: string;
  url: string;
}

const Pokedex: React.FC<PokedexProps> = ({
  search,
  sort,
  onSearchSubmit,
  setSearch,
  setSort,
  searchValue,
  sortValue,
}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const loader = useRef(null);

  const fetchPokemon = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`
      );
      const merged = [...pokemonList, ...res.data.results];
      const uniqueList = [...new Map(merged.map((p) => [p.url, p])).values()];
      setPokemonList(uniqueList);
    } catch (error) {
      console.error("포켓몬 데이터를 불러오는 데 실패했습니다.", error);
    }
  };

  // 무한 스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev) => prev + 30);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  // offset 변경될 때마다 fetch
  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  // 정렬 및 필터링
  const filteredList = [...pokemonList]
    .filter((pokemon) => pokemon.name.includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name, "ko");
      if (sort === "name-desc") return b.name.localeCompare(a.name, "ko");
      return Number(a.url.split("/")[6]) - Number(b.url.split("/")[6]);
    });

  return (
    <>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearchSubmit();
          }}
          placeholder="포켓몬 이름 검색"
          style={{
            padding: "10px",
            width: "250px",
            fontSize: "16px",
            textAlign: "center",
          }}
        />
        <button
          onClick={onSearchSubmit}
          style={{ marginLeft: "8px", padding: "10px" }}
        >
          검색
        </button>

        <select
          value={sortValue}
          onChange={(e) => setSort(e.target.value)}
          style={{ marginLeft: "20px", padding: "10px" }}
        >
          <option value="number">도감번호 순</option>
          <option value="name-asc">이름 오름차순</option>
          <option value="name-desc">이름 내림차순</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredList.map((pokemon) => (
          <PokemonCard
            key={pokemon.url}
            name={pokemon.name}
            id={Number(pokemon.url.split("/")[6])}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Number(
              pokemon.url.split("/")[6]
            )}.png`}
          />
        ))}
      </div>

      <div ref={loader} style={{ height: "50px", margin: "20px" }} />
    </>
  );
};

export default Pokedex;
