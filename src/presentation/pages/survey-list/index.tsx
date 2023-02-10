import React, { useEffect, useState } from 'react'
import { Footer, Header } from '@/presentation/components'
import styles from './styles.scss'
import { SurveyItem, SurveyItemEmpty } from './components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList?: LoadSurveyList
}

export function SurveyList ({ loadSurveyList }: Props): JSX.Element {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => { setState({ ...state, surveys }) })
      .catch(error => { setState({ ...state, error: error.message }) })
  }, [])

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error
          ? (
            <div>
              <span data-testid="error">{state.error}</span>
              <button>Recarregar</button>
            </div>
            )
          : (
            <ul data-testid="survey-list">
            {state.surveys.length
              ? state.surveys.map(survey => <SurveyItem key={survey.id} survey={survey} />)
              : <SurveyItemEmpty />
            }
            </ul>
            )
        }
      </div>
      <Footer />
    </div>
  )
}
