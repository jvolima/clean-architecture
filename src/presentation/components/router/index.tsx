import React from 'react'
import { Error, Login } from '@/presentation/pages'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

const isUserAuthenticated = false

export function Router (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isUserAuthenticated ? <Error /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
