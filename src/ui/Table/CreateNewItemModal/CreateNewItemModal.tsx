import type { MRT_ColumnDef } from 'material-react-table'
import { useState, useTransition } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'

interface CreateModalProps {
  columns: MRT_ColumnDef<any>[]
  onClose: () => void
  onSubmit: (values: any) => void
  open: boolean
}

export const CreateNewItemModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = ''
      return acc
    }, {} as any),
  )
  const [isPending, startTransition] = useTransition()

  // React 19 form action - automatically wrapped in transition
  async function submitAction(formData: FormData) {
    const formValues: any = {}
    columns.forEach((column) => {
      const key = column.accessorKey ?? ''
      formValues[key] = formData.get(key) || ''
    })
    
    // put your validation logic here
    startTransition(async () => {
      await onSubmit(formValues)
      onClose()
      // Reset form
      setValues(
        columns.reduce((acc, column) => {
          acc[column.accessorKey ?? ''] = ''
          return acc
        }, {} as any),
      )
    })
  }

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Item</DialogTitle>
      <DialogContent>
        <form action={submitAction}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                value={values[column.accessorKey ?? ''] || ''}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                required
              />
            ))}
          </Stack>
          <DialogActions sx={{ p: '1.25rem' }}>
            <Button 
              type="button"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              color="secondary" 
              variant="outlined"
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewItemModal
