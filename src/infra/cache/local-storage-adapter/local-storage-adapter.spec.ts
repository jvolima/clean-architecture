import { LocalStorageAdapter } from './local-storage-adapter'
import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('Should be able to call localStorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = {
      random: faker.random.word()
    }
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  it('Should be able to call localStorage.removeItem if value is null', () => {
    const sut = makeSut()
    const key = faker.database.column()
    sut.set(key, undefined)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })

  it('Should be able to call localStorage.getItem with correct value', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = {
      random: faker.random.word()
    }
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
