import * as Helper from '../support/helpers'
import * as Http from '../support/survey-list-mocks'
import { faker } from '@faker-js/faker'

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', { accessToken: faker.datatype.uuid(), name: faker.name.fullName() })
  })

  it('Should be able to present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })
})
