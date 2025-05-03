import axios from "axios";

export const getKoreanName = async (id: number): Promise<string> => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    const korean = res.data.names.find((n: any) => n.language.name === "ko");
    return korean?.name || `#${id}`;
  } catch (err) {
    console.error(`한글 이름 가져오기 실패 (id: ${id})`, err);
    return `#${id}`;
  }
};
