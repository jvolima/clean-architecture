import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

export function PrivateRoute (props: RouteProps): JSX.Element {
  return <Route {...props} component={() => <Redirect to="/login" />} />
}
