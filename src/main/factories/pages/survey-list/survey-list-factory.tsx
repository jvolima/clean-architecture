import { SurveyList } from '@/presentation/pages'
import { makeRemoteLoadSurveyList } from '@/main/factories/usecases'
import React from 'react'

export function makeSurveyList (): JSX.Element {
  return (
    <SurveyList
      loadSurveyList={makeRemoteLoadSurveyList()}
    />
  )
}
