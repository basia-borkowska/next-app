import { AccountType, CreateAccountType, CredentialsType } from '@/types/Account'
import { AddUserType, UserType } from '@/types/User'

import { AccountStatusEnum } from '@/enums/AccountStatus.enum'

import { formatters } from '@/utils/formatters'

export const authApi = {
  authenticate: async (credentials: CredentialsType): Promise<AccountType> => {
    const res = await fetch('http://localhost:3001/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const data = await res.json()
    if (!data?.account) throw new Error(data.error)

    return data.account
  },
  createAccount: async (account: CreateAccountType): Promise<AccountType> => {
    const res = await fetch('http://localhost:3001/api/auth/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    })
    const data = await res.json()

    if (!data?.account) throw new Error(data.error)

    return data.account
  },
  verifyEmail: async (id: string): Promise<AccountType> => {
    const res = await fetch(`http://localhost:3001/api/auth/accounts/${id}/verifyEmail`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()

    if (!data?.account) throw new Error(data.error)
    return data.account
  },
  completeProfile: async (
    accountId: string,
    user: AddUserType,
  ): Promise<{ user: UserType; status: AccountStatusEnum }> => {
    const body = formatters.formatUser(user)
    const res = await fetch(`http://localhost:3001/api/auth/accounts/${accountId}/completeProfile`, {
      method: 'POST',
      body,
    })
    const data = await res.json()

    if (!data?.user || !data?.status) throw new Error(data.error)
    return { user: data.user, status: data.status }
  },
}
