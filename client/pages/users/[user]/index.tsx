import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useDisclosure } from '@mantine/hooks'

import { api } from '@/api'
import { UserModalComponent } from '@/components/userModal'
import { ConfirmationModalComponent } from '@/components/confirmationModal'
import { notify } from '@/utils/notifications'
import { Pathnames } from '@/utils/pathnames'
import { UserType } from '@/types/User'

import { ChartSectionComponent } from './chart'
import { HeaderComponent } from './header'
import { RangesComponent } from './ranges'
import { PageLoaderComponent } from '@/components/pageLoader'
import { ErrorComponent } from '@/components/error'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'
import { queryClient } from '@/pages/_app'
import { EmptyStateComponent } from '@/components/emptyState'

const UserProfilePage = () => {
  const router = useRouter()

  const { user: userId } = router.query

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.USER],
    queryFn: () => api.user.getUser(userId?.toString() || ''),
    enabled: router.isReady,
  })

  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false)
  const [confirmationModalOpened, { open: openConfirmationModal, close: closeConfirmationModal }] = useDisclosure(false)

  const editUserMutation = useMutation({
    mutationFn: (user: UserType, file?: File) => api.user.updateUser(user, file),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [QueryKeyEnum.USER] })
      notify({ type: 'success', message: 'User updated successfully' })
    },
    onError: () => {
      notify({ type: 'error', message: 'Unable to update user' })
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: () => api.user.deleteUser(userId?.toString() || ''),
    onSuccess: async () => {
      closeConfirmationModal()
      notify({ type: 'success', message: 'User deleted successfully' })
      router.push(Pathnames.home)
    },
    onError: () => {
      notify({ type: 'error', message: 'Unable to delete user' })
    },
  })

  if (error) return <ErrorComponent title={error.toString()} />
  if (isLoading) return <PageLoaderComponent />
  if (!user) return <EmptyStateComponent compact />

  return (
    <>
      <HeaderComponent user={user} openModal={openEditModal} openConfirmationModal={openConfirmationModal} />

      <RangesComponent userId={user._id} />
      <ChartSectionComponent userId={user._id} />

      <UserModalComponent
        opened={editModalOpened}
        user={user}
        onClose={closeEditModal}
        onSubmit={editUserMutation.mutate}
        loading={editUserMutation.isLoading}
      />
      <ConfirmationModalComponent
        opened={confirmationModalOpened}
        loading={deleteUserMutation.isLoading}
        title={`Delete ${user.name} User`}
        description="Are you sure you want to delete this user and all of their measurements? This action is irreversible."
        confirmButtonText="Delete"
        declineButtonText="Cancel"
        onClose={closeConfirmationModal}
        onSubmit={deleteUserMutation.mutate}
      />
    </>
  )
}

export default UserProfilePage
