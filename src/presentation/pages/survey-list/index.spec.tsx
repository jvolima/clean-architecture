import { SurveyList } from '.'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

const history = createMemoryHistory({ initialEntries: ['/'] })
const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadSurveyListSpy,
    setCurrentAccountMock
  }
}

describe('SurveyListComponent', () => {
  it('Should be able to present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => {
      expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
      expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    })
  })

  it('Should be able to call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    await waitFor(() => { expect(loadSurveyListSpy.callsCount).toBe(1) })
  })

  it('Should be able to render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => {
      expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
      expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    })
  })

  it('Should be able to render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    })
  })

  it('Should be able to logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock } = makeSut(loadSurveyListSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.location.pathname).toBe('/login')
    })
  })

  it('Should be able to call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('reload'))
      expect(loadSurveyListSpy.callsCount).toBe(1)
    })
  })
})
