import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'

export function Router (): JSX.Element {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={() => <SurveyList />} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}
