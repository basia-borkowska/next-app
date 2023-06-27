import { ButtonComponent } from '../button'
import { ModalComponent } from '../modal'

interface ConfirmationModalProps {
  opened: boolean
  title?: string
  description?: string
  confirmButtonText?: string
  declineButtonText?: string
  loading: boolean

  onClose: () => void
  onSubmit: () => void
}

export const ConfirmationModalComponent = ({
  opened,
  title,
  description,
  loading,
  confirmButtonText,
  declineButtonText,
  onClose,
  onSubmit,
}: ConfirmationModalProps) => (
  <ModalComponent opened={opened} onClose={onClose} title={title || 'Are you sure?'}>
    {description || 'Are you sure you want to confirm this action? It is irreversable!'}
    <div className="basis-1/4 flex gap-2 mt-5">
      <ButtonComponent variant="outline" onClick={onClose}>
        {declineButtonText || 'No'}
      </ButtonComponent>
      <ButtonComponent variant="gradient" loading={loading} onClick={onSubmit}>
        {confirmButtonText || 'Yes'}
      </ButtonComponent>
    </div>
  </ModalComponent>
)
