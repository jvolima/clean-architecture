import React from 'react'
import { faker } from '@faker-js/faker'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { Input } from '.'
import { FormContext } from '@/presentation/contexts/form/form-context'

const makeSut = (field: string): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name={field} />
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  it('Should be able to begin with readonly', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  it('Should be able to remove readOnly on focus', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })

  it('Shoud be able to focus input on label click', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field)
    const label = sut.getByTestId(`${field}-label`) as HTMLLabelElement
    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
