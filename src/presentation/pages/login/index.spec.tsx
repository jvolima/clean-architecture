import React from 'react'
import { render } from '@testing-library/react'
import { Login } from '.'

describe('Login component', () => {
  it('Should be able to not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})
