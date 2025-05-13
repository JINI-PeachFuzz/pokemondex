import axios from "axios";


export const getKoreanName = async (id: number): Promise<string> => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    const korean = res.data.names.find((n: any) => n.language.name === "ko");
    return korean ? korean.name : "";
  } catch (error) {
    console.error("한국어 이름을 불러오는 데 실패했습니다.", error);
    return "";
  }
};
