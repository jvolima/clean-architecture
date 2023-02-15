import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'
import { makeLoginValidation } from './login-validation-factory'

describe('LoginValidationFactory', () => {
  it('Should be able to make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(5).build()
    ]))
  })
})
