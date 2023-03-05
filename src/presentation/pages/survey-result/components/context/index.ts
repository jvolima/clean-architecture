import { createContext } from 'react'

type Props = {
  onAnswer: (answer: string) => void
}

export const SurveyResultContext = createContext<Props>(null)
