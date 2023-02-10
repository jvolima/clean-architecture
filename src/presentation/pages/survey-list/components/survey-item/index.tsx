import React from 'react'
import styles from './styles.scss'
import { Icon, IconName } from '@/presentation/components'
import { SurveyModel } from '@/domain/models'

type Props = {
  survey: SurveyModel
}

export function SurveyItem ({ survey }: Props): JSX.Element {
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon iconName={IconName.thumbUp} className={styles.iconWrap} />
        <time>
          <span data-testid="day" className={styles.day}>{survey.date.getDate()}</span>
          <span data-testid="month" className={styles.month}>{survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}</span>
          <span data-testid="year" className={styles.year}>{survey.date.getFullYear()}</span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}
