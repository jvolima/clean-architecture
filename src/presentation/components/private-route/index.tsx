import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

export function PrivateRoute (props: RouteProps): JSX.Element {
  const { getCurrentAccount } = useContext(ApiContext)
  return getCurrentAccount()?.accessToken
    ? <Route {...props} />
    : <Route {...props} component={() => <Redirect to="/login" />} />
}
