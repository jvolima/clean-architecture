import React, { Component, ReactNode } from 'react'
import { Error } from '@/presentation/pages'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

type Props = {
  makeLogin: JSX.Element
}

export function Router ({ makeLogin }: Props): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={makeLogin} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
