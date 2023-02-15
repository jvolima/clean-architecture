import { SignUp } from '@/presentation/pages'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases'
import React from 'react'

export function makeSignUp (): JSX.Element {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
