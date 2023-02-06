import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account'
import { makeLocalUpdateCurrentAccount } from '../../usecases/update-current-account/local-update-current-account-factory'

export function MakeSignUp (): JSX.Element {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
