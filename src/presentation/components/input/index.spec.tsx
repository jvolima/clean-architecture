import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { Input } from '.'
import { FormContext } from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name="field" />
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  it('Should be able to begin with readonly', () => {
    const sut = makeSut()
    const input = sut.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
