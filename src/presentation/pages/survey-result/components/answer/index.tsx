import styles from './styles.scss'
import { SurveyResultAnswerModel } from '@/domain/models'
import { SurveyResultContext } from '@/presentation/pages/survey-result/components'
import React, { useContext } from 'react'

type Props = {
  answer: SurveyResultAnswerModel
}

export function SurveyResultAnswer ({ answer }: Props): JSX.Element {
  const { onAnswer } = useContext(SurveyResultContext)
  const activeClassName = answer.isCurrentAccountAnswer ? styles.active : ''

  const answerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains(styles.active)) {
      return
    }

    onAnswer(answer.answer)
  }

  return (
    <li
      data-testid="answer-wrap"
      className={[styles.answerWrap, activeClassName].join(' ')}
      onClick={answerClick}
    >
      { answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} /> }
      <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
    </li>
  )
}
