import { AccountModel } from '@/domain/models'
import { createContext } from 'react'

type Props = {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

export const ApiContext = createContext<Props>(null)
