import styles from './styles.scss'
import React from 'react'

type Props = {
  answer: {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
  }
}

export function SurveyResultAnswer ({ answer }: Props): JSX.Element {
  const activeClassName = answer.isCurrentAccountAnswer ? styles.active : ''
  return (
    <li data-testid="answer-wrap" className={[styles.answerWrap, activeClassName].join(' ')}>
      { answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} /> }
      <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
    </li>
  )
}
