import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { makeLoginValidation } from './login-validation-factory'
import React from 'react'

export function makeLogin (): JSX.Element {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
