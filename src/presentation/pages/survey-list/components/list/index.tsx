import { SurveyContext } from '@/presentation/pages/survey-list/contexts/context'
import { SurveyItem, SurveyItemEmpty } from '..'
import { LoadSurveyList } from '@/domain/usecases'
import styles from './styles.scss'
import React, { useContext } from 'react'

export function SurveyListItem (): JSX.Element {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={styles.listWrap} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}
