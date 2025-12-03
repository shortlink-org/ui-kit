import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

export interface SuspenseFallbackProps {
  message?: string
}

/**
 * Default fallback component for Suspense boundaries.
 * Shows a loading spinner with optional message.
 */
export const SuspenseFallback: React.FC<SuspenseFallbackProps> = ({
  message = 'Loading...',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2,
      }}
    >
      <CircularProgress />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  )
}

export default SuspenseFallback

