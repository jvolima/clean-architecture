import React from 'react'
import { Error, Login } from '@/presentation/pages'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Error />
  }
])
