import { router } from '@/presentation/components'
import React from 'react'
import ReactDOM from 'react-dom'
import { RouterProvider } from 'react-router-dom'

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('main')
)
