import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

type Factory = {
  makeLogin: JSX.Element
  makeSignUp: JSX.Element
}

export function Router (factory: Factory): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={factory.makeLogin} />
        <Route path="/signup" element={factory.makeSignUp} />
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  )
}
