import { FamilyDialog } from '../FamilyDialog/FamilyDialog'
import { TrashIcon } from '@heroicons/react/24/outline'

export interface ConfirmDeleteModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  count?: number
}

/**
 * ConfirmDeleteModal - wrapper around FamilyDialog for delete confirmations
 * 
 * @deprecated Consider using FamilyDialog directly with variant="danger"
 */
export function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirm deletion',
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  count,
}: ConfirmDeleteModalProps) {
  const displayMessage =
    message ||
    (count !== undefined
      ? `Are you sure you want to delete ${count} item(s)? This action cannot be undone.`
      : 'Are you sure you want to delete this item? This action cannot be undone.')

  return (
    <FamilyDialog
      trigger={
        <span className="inline-flex items-center gap-2">
          <TrashIcon className="size-4" />
          Delete
        </span>
      }
      title={title}
      description={displayMessage}
      confirmText={confirmText}
      cancelText={cancelText}
      variant="danger"
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
      onConfirm={onConfirm}
      onCancel={onClose}
      triggerClassName="hidden"
    />
  )
}

export default ConfirmDeleteModal
