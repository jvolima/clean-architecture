import React from 'react'
import ReactDOM from 'react-dom'
import '@/presentation/styles/global.scss'
import { Router } from '@/presentation/components'
import { MakeLogin } from './factories/pages/login/login-factory'
import { MakeSignUp } from './factories/pages/signup/signup-factory'

ReactDOM.render(
  <Router
    makeLogin={<MakeLogin />}
    makeSignUp={<MakeSignUp />}
  />,
  document.getElementById('main')
)
