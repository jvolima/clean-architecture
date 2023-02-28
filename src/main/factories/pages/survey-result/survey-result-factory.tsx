import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases'
import React from 'react'
import { useParams } from 'react-router-dom'

export function makeSurveyResult (): JSX.Element {
  const { id } = useParams<{ id: string }>()

  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
    />
  )
}
