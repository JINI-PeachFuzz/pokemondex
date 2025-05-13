import React, { useState } from "react";
import Pokedex from "../components/Pokemon";

const PokedexPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("number");

  const handleSearchSubmit = () => {
 
  };

  return (
    <Pokedex
      search={search}
      sort={sort}
      onSearchSubmit={handleSearchSubmit}
      setSearch={setSearch}
      setSort={setSort}
      searchValue={search}
      sortValue={sort}
    />
  );
};

export default PokedexPage;
