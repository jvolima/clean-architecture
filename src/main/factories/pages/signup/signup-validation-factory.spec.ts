import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'
import { makeSignUpValidation } from './signup-validation-factory'

describe('SignUpValidationFactory', () => {
  it('Should be able to make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().min(5).build(),
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(5).build(),
      ...Builder.field('passwordConfirmation').required().sameAs('password').build()
    ]))
  })
})
