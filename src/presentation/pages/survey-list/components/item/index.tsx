import { Calendar, Icon, IconName } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import styles from './styles.scss'
import React from 'react'

type Props = {
  survey: LoadSurveyList.Model
}

export function SurveyItem ({ survey }: Props): JSX.Element {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon iconName={iconName} className={styles.iconWrap} />
        <Calendar className={styles.calendarWrap} date={survey.date} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}
