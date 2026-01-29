import preview from '#.storybook/preview'
import { FamilyDialog } from './FamilyDialog'

const meta = preview.meta({
  title: 'UI/FamilyDialog',
  component: FamilyDialog,
  parameters: {
    layout: 'centered',
  },
})

export default meta

export const Default = meta.story({
  args: {
    trigger: 'Open Dialog',
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action? This cannot be undone.',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => new Promise((resolve) => setTimeout(resolve, 1000)),
  },
})

export const Danger = meta.story({
  args: {
    trigger: 'Delete Item',
    title: 'Delete Confirmation',
    description: 'This will permanently delete this item. This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Keep',
    variant: 'danger',
    onConfirm: () => new Promise((resolve) => setTimeout(resolve, 1500)),
  },
})

export const WithContent = meta.story({
  args: {
    trigger: 'Share Link',
    title: 'Share this link',
    description: 'Anyone with the link can view this document.',
    confirmText: 'Copy Link',
    cancelText: 'Cancel',
    variant: 'success',
    children: (
      <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <input
          type="text"
          readOnly
          value="https://example.com/share/abc123"
          className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-200 outline-none"
        />
      </div>
    ),
  },
})
