import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
const mockLoadSuccess = (): void => { Http.mockOk(path, 'GET', 'fx:survey-result') }

describe('SurveyResult', () => {
  describe('load', () => {
    const mockUnexpectedError = (): void => { Http.mockServerError(path, 'GET') }
    const mockAccessDeniedError = (): void => { Http.mockForbiddenError(path, 'GET') }

    beforeEach(() => {
      cy.fixture('account').then(account => {
        Helper.setLocalStorageItem('account', account)
      })
    })

    it('Should be able to present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    })

    it('Should be able to reload on button click', () => {
      mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
      mockLoadSuccess()
      cy.getByTestId('reload').click()
      cy.getByTestId('question').should('exist')
    })

    it('Should be able to logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('/surveys/any_id')
      Helper.testUrl('/login')
    })

    it('Should be able to present survey result', () => {
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
      cy.getByTestId('question').should('have.text', 'Question')
      cy.getByTestId('day').should('have.text', '03')
      cy.getByTestId('month').should('have.text', 'fev')
      cy.getByTestId('year').should('have.text', '2023')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '70%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
      })
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2')
        assert.equal(li.find('[data-testid="percent"]').text(), '30%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })

    it('Should be able to go to SurveyList on back button click', () => {
      mockLoadSuccess()
      cy.visit('/')
      cy.visit('/surveys/any_id')
      cy.getByTestId('back-button').click()
      Helper.testUrl('/')
    })
  })

  describe('save', () => {
    const mockUnexpectedError = (): void => { Http.mockServerError(path, 'PUT') }

    beforeEach(() => {
      cy.fixture('account').then(account => {
        Helper.setLocalStorageItem('account', account)
      })
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
    })

    it('Should be able to present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    })
  })
})
