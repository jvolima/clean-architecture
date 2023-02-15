import { ApiContext } from '@/presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'
import { makeLogin, makeSignUp, makeSurveyList } from '../factories/pages'
import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

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
          <PrivateRoute path="/" exact component={makeSurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}
