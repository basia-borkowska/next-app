import { UpdateUserType } from '@/types/User'

export const formatters = {
  formatUser: ({ age, name, sex, height, weight, avatarFile, avatarUrl, email }: UpdateUserType) => {
    const formData = new FormData()
    if (avatarFile) formData.append('avatar', avatarFile)
    formData.append('age', age.toString())
    formData.append('name', name)
    formData.append('sex', sex)
    formData.append('email', email)
    formData.append('height[unit]', height.unit)
    formData.append('height[value]', height.value?.toString() || '')
    if (weight) {
      formData.append('weight[unit]', weight.unit)
      formData.append('weight[value]', weight.value?.toString() || '')
    }
    if (!avatarUrl) formData.append('removeAvatar', 'true')
    return formData
  },
}
