import React from 'react'
import { Login } from '@/presentation/pages'
import { createBrowserRouter } from 'react-router-dom'
import '@/presentation/styles/global.scss'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  }
])
