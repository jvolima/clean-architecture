import { SurveyResult } from '.'
import { ApiContext } from '@/presentation/contexts'
import { LoadSurveyResultSpy, mockAccountModel, mockSurveyResultModel, SaveSurveyResultSpy } from '@/domain/test'
import { AccountModel } from '@/domain/models'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import React from 'react'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy
  saveSurveyResultSpy?: SaveSurveyResultSpy
}

const history = createMemoryHistory({ initialEntries: ['/surveys/any_id'] })
const makeSut = ({ loadSurveyResultSpy = new LoadSurveyResultSpy(), saveSurveyResultSpy = new SaveSurveyResultSpy() }: SutParams = {}): SutTypes => {
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} saveSurveyResult={saveSurveyResultSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy,
    setCurrentAccountMock,
    saveSurveyResultSpy
  }
}

describe('SurveyResult Component', () => {
  it('Should be able to present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    await waitFor(() => {
      expect(surveyResult.childElementCount).toBe(0)
      expect(screen.queryByTestId('error')).not.toBeInTheDocument()
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  it('Should be able to call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => {
      expect(loadSurveyResultSpy.callsCount).toBe(1)
    })
  })

  it('Should be able to present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2023-02-23T00:00:00')
    })
    loadSurveyResultSpy.surveyResult = surveyResult
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => {
      expect(screen.getByTestId('day')).toHaveTextContent('23')
      expect(screen.getByTestId('month')).toHaveTextContent('fev')
      expect(screen.getByTestId('year')).toHaveTextContent('2023')
      expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
      expect(screen.getByTestId('answers').childElementCount).toBe(surveyResult.answers.length)
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      expect(answersWrap[0]).toHaveClass('active')
      expect(answersWrap[1]).not.toHaveClass('active')
      const images = screen.queryAllByTestId('image')
      expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
      expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
      expect(images[1]).toBeFalsy()
      const answers = screen.queryAllByTestId('answer')
      expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
      expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
      const percents = screen.queryAllByTestId('percent')
      expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
      expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
    })
  })

  it('Should be able to render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => {
      expect(screen.queryByTestId('question')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  it('Should be able to logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock } = makeSut({ loadSurveyResultSpy })
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.location.pathname).toBe('/login')
    })
  })

  it('Should be able to call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('reload'))
      expect(loadSurveyResultSpy.callsCount).toBe(1)
    })
  })

  it('Should be able to go to SurveyList on back button click', async () => {
    makeSut()
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('back-button'))
      expect(history.location.pathname).toBe('/')
    })
  })

  it('Should not be able to present Loading on active answer click', async () => {
    makeSut()
    await waitFor(() => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[0])
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  it('Should be able to call SaveSurveyResult on non active answer click', async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = makeSut()
    await waitFor(() => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[1])
      expect(screen.queryByTestId('loading')).toBeInTheDocument()
      expect(saveSurveyResultSpy.params).toEqual({
        answer: loadSurveyResultSpy.surveyResult.answers[1].answer
      })
    })
  })

  it('Should be able to render error on UnexpectedError in save', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)
    makeSut({ saveSurveyResultSpy })
    await waitFor(async () => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[1])
      await waitFor(() => {
        expect(screen.queryByTestId('question')).not.toBeInTheDocument()
        expect(screen.getByTestId('error')).toHaveTextContent(error.message)
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      })
    })
  })
})
