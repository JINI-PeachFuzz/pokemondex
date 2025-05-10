import React, { useState } from 'react'
import GameSetup from '../components/GameSetup'
import GamePlay from '../components/GamePlay'
import GameResult from '../components/GameResult'

export default function ShadowGamePage() {
  const [mode, setMode] = useState<'input' | 'choice' | null>(null)
  const [numQuestions, setNumQuestions] = useState<number>(5)
  const [currentStep, setCurrentStep] = useState<'setup' | 'play' | 'result'>('setup')
  const [score, setScore] = useState(0)

  return (
    <>
      {currentStep === 'setup' && (
        <GameSetup
          mode={mode}
          setMode={setMode}
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          onStart={() => setCurrentStep('play')}
        />
      )}

      {currentStep === 'play' && (
        <GamePlay
          mode={mode}
          numQuestions={numQuestions}
          onFinish={(finalScore) => {
            setScore(finalScore)
            setCurrentStep('result')
          }}
        />
      )}

      {currentStep === 'result' && (
        <GameResult
          score={score}
          numQuestions={numQuestions}
          onRestart={() => {
            setScore(0)
            setMode(null)
            setCurrentStep('setup')
          }}
        />
      )}
    </>
  )
}
