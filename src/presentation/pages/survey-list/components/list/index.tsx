import { SurveyItem, SurveyItemEmpty } from '..'
import { LoadSurveyList } from '@/domain/usecases'
import styles from './styles.scss'
import React from 'react'

type Props = {
  surveys: LoadSurveyList.Model[]
}

export function SurveyListItem ({ surveys }: Props): JSX.Element {
  return (
    <ul className={styles.listWrap} data-testid="survey-list">
      {surveys.length
        ? surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}
