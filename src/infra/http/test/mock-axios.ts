import { faker } from '@faker-js/faker'
import axios from 'axios'

export const mockHttpResponse = (): any => ({
  data: faker.internet.email(),
  status: faker.random.numeric()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse())
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse())

  return mockedAxios
}
