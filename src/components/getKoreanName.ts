export async function getKoreanName(englishName: string): Promise<string> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${englishName}`)
    const data = await res.json()
    const korean = data.names.find((n: any) => n.language.name === 'ko')
    return korean ? korean.name : englishName
  }