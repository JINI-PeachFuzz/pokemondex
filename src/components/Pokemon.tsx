// React에서 기본 기능들을 불러옴 (컴포넌트 만들기용)
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
  id: number;
  height: number;
  weight: number;
  koreanName: string;
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

      const detailedResults: Pokemon[] = await Promise.all(
        res.data.results.map(async (pokemon: any) => {
          const id = Number(pokemon.url.split("/")[6]);
          const detail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
          const korean = species.data.names.find((n: any) => n.language.name === "ko");

          return {
            ...pokemon,
            id,
            height: detail.data.height,
            weight: detail.data.weight,
            koreanName: korean?.name || pokemon.name,
          };
        })
      );

      const merged = [...pokemonList, ...detailedResults];
      const uniqueList = [
        ...new Map(merged.map((pokemon) => [pokemon.url, pokemon])).values(),
      ];
      setPokemonList(uniqueList);
      setOffset((prev) => prev + 30);
    } catch (error) {
      console.error("포켓몬 데이터를 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPokemon();
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
  }, [loader.current]);

  const filteredList = [...pokemonList]
    .filter((pokemon) =>
      pokemon.name.includes(search.toLowerCase()) ||
      pokemon.koreanName.includes(search)
    )
    .sort((a, b) => {
      switch (sort) {
        case "name":
          return a.koreanName.localeCompare(b.koreanName, "ko");
        case "number-desc":
          return b.id - a.id;
        case "weight-desc":
          return b.weight - a.weight;
        case "weight-asc":
          return a.weight - b.weight;
        case "height-desc":
          return b.height - a.height;
        case "height-asc":
          return a.height - b.height;
        default:
          return a.id - b.id;
      }
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
          style={{ padding: "10px", width: "250px", fontSize: "16px" }}
        />
        <button onClick={onSearchSubmit} style={{ marginLeft: "8px", padding: "10px" }}>
          검색
        </button>

        <select
          value={sortValue}
          onChange={(e) => setSort(e.target.value)}
          style={{ marginLeft: "20px", padding: "10px" }}
        >
          <option value="number-asc">도감번호 순</option>
          <option value="name">이름 순</option>
          <option value="weight-desc">무게 순</option>
          <option value="height-desc">키 순</option>
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
            name={pokemon.koreanName}
            id={pokemon.id}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          />
        ))}
      </div>

      <div ref={loader} style={{ height: "50px", margin: "20px" }} />
    </>
  );
};

export default Pokedex;
