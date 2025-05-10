import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getKoreanName } from '../utils/getKoreanName'

type GamePlayProps = {
  mode: 'input' | 'choice' | null
  numQuestions: number
  onFinish: (finalScore: number) => void
}

type PokemonData = {
  name: string
  image: string
}

export default function GamePlay({ mode, numQuestions, onFinish }: GamePlayProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [pokemon, setPokemon] = useState<PokemonData | null>(null)

  const fetchRandomPokemon = async () => {
    const id = Math.floor(Math.random() * 151) + 1
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const name = await getKoreanName(res.data.name)
    const image = res.data.sprites.front_default
    setPokemon({ name, image })
  }

  useEffect(() => {
    fetchRandomPokemon()
  }, [currentQuestion])

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === pokemon?.name
    if (isCorrect) setScore((prev) => prev + 1)

    if (currentQuestion < numQuestions) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      onFinish(score + (isCorrect ? 1 : 0))
    }
  }

  if (!pokemon) return <div>로딩 중...</div>

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h3>{currentQuestion} / {numQuestions} 문제</h3>

      <img
        src={pokemon.image}
        alt="포켓몬"
        style={{ filter: 'brightness(0)', width: 200 }}
      />

      {mode === 'input' ? (
        <>
          <input id="answerInput" />
          <button
            onClick={() =>
              handleAnswer((document.getElementById('answerInput') as HTMLInputElement).value)
            }
          >
            제출
          </button>
        </>
      ) : (
        <>
          <div>
            <button onClick={() => handleAnswer(pokemon.name)}>{pokemon.name}</button>
            <button onClick={() => handleAnswer('파이리')}>파이리</button>
            <button onClick={() => handleAnswer('꼬부기')}>꼬부기</button>
            <button onClick={() => handleAnswer('이상해씨')}>이상해씨</button>
          </div>
        </>
      )}
    </div>
  )
}
