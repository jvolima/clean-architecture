export type SurveyModel = {
  id: string
  question: string
  answers: Array<{
    image?: string
    answer: string
  }>
  date: Date
  didAnswer: boolean
}
