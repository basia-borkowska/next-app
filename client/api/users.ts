import { BasicUserType, UserType } from '@/types/User'

export const usersApi = {
  getUsers: async (): Promise<BasicUserType[]> => {
    const res = await fetch('http://localhost:3001/api/users')
    const data = await res.json()
    if (!data?.users) throw new Error(data.error)
    return data.users
  },
  getUser: async (id: string): Promise<UserType> => {
    if (!id) throw new Error('User does not exist')

    const res = await fetch(`http://localhost:3001/api/users/${id}`)
    const data = await res.json()
    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  getBasicUser: async (id: string): Promise<BasicUserType> => {
    if (!id) throw new Error('User does not exist')

    const res = await fetch(`http://localhost:3001/api/users/${id}/basic`)
    const data = await res.json()
    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  addUser: async (user: UserType): Promise<UserType> => {
    const newUser = { ...user, _id: undefined }
    const res = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
    const data = await res.json()

    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  updateUser: async (user: UserType, file?: File): Promise<UserType> => {
    const formData = new FormData()
    if (file) formData.append('avatar', file)

    formData.append('age', user.age.toString())
    formData.append('name', user.name)
    formData.append('sex', user.sex)
    formData.append('height[unit]', user.height.unit)
    formData.append('height[value]', user.height.value?.toString() || '')
    if (user?.weight) {
      formData.append('weight[unit]', user.weight.unit)
      formData.append('weight[value]', user.weight.value?.toString() || '')
    }

    const res = await fetch(`http://localhost:3001/api/users/${user._id}`, {
      method: 'PUT',
      body: formData,
    })
    const data = await res.json()
    console.log({ data })
    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  deleteUser: async (id: string): Promise<boolean> => {
    if (!id) throw new Error('User does not exist')

    const res = await fetch(`http://localhost:3001/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()

    if (!data?.success) throw new Error(data.error)
    return data.success
  },
  updateAvatar: async (id: string | undefined, data: FormData): Promise<UserType> => {
    const res = await fetch(`http://localhost:3001/api/users/${id}/avatar`, {
      method: 'PUT',
      body: data,
    })
    const result = await res.json()

    if (!result?.user) throw new Error(result.error)
    return result.user
  },
}
