import * as Helper from '../utils/helpers'

describe('PrivateRoutes', () => {
  it('Should be able to logout if survey-list has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('Should be able to logout if survey-result has no token', () => {
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })
})
