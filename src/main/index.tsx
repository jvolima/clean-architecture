import { router } from '@/presentation/components'
import React from 'react'
import ReactDOM from 'react-dom'
import { RouterProvider } from 'react-router-dom'
import '@/presentation/styles/global.scss'

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('main')
)
