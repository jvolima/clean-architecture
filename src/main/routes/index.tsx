import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { MakeLogin } from '@/main/factories/pages/login/login-factory'
import { MakeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'

export function Router (): JSX.Element {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MakeLogin />} />
          <Route path="/signup" element={<MakeSignUp />} />
          <Route path="/" element={<SurveyList />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}
