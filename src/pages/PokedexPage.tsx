import React, { useState } from "react";
import Pokedex from "../components/Pokemon";

const PokedexPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("number");

  const handleSearchSubmit = () => {
    // 여기서 setSearch는 이미 적용되어 있으므로 필요시 로직 추가
    // 예: 검색을 눌렀을 때 포커스 제거 또는 스크롤 이동 등
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
