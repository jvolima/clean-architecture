import React, { useContext } from 'react'
import styles from './styles.scss'
import { SurveyContext } from '../../contexts/context'
import { SurveyItem, SurveyItemEmpty } from '..'
import { SurveyModel } from '@/domain/models'

export function SurveyListItem (): JSX.Element {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={styles.listWrap} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}
