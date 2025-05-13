import React, { useState } from "react";
import Pokedex from "../components/Pokemon";

const PokedexPage: React.FC = () => {
  const [search, setSearch] = useState(""); 
  const [searchInput, setSearchInput] = useState(""); 
  const [sort, setSort] = useState("number-asc"); // 정렬 기준

  const handleSearchSubmit = () => {
    setSearch(searchInput); 
  };

  return (
    <Pokedex
      search={search}
      sort={sort}
      onSearchSubmit={handleSearchSubmit}
      setSearch={setSearchInput}
      setSort={setSort}
      searchValue={searchInput}
      sortValue={sort}
    />
  );
};

export default PokedexPage;