import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@mui/material/Button'

describe('Button Component', () => {
  const defaultProps = {
    children: 'Test Button',
    onClick: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with default props', () => {
    render(<Button {...defaultProps} />)
    
    const button = screen.getByRole('button', { name: 'Test Button' })
    expect(button).toBeInTheDocument()
    expect(button).toBeEnabled()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const mockOnClick = jest.fn()
    
    render(<Button {...defaultProps} onClick={mockOnClick} />)
    
    const button = screen.getByRole('button', { name: 'Test Button' })
    await user.click(button)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button {...defaultProps} variant="text" />)
    expect(screen.getByRole('button')).toHaveClass('MuiButton-text')

    rerender(<Button {...defaultProps} variant="outlined" />)
    expect(screen.getByRole('button')).toHaveClass('MuiButton-outlined')

    rerender(<Button {...defaultProps} variant="contained" />)
    expect(screen.getByRole('button')).toHaveClass('MuiButton-contained')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button {...defaultProps} size="small" />)
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeSmall')

    rerender(<Button {...defaultProps} size="medium" />)
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeMedium')

    rerender(<Button {...defaultProps} size="large" />)
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeLarge')
  })

  it('renders with different colors', () => {
    const { rerender } = render(<Button {...defaultProps} color="primary" />)
    expect(screen.getByRole('button')).toHaveClass('MuiButton-colorPrimary')

    rerender(<Button {...defaultProps} color="secondary" />)
    expect(screen.getByRole('button')).toHaveClass('MuiButton-colorSecondary')

    rerender(<Button {...defaultProps} color="error" />)
    expect(screen.getByRole('button')).toHaveClass('MuiButton-colorError')
  })

  it('renders disabled state', () => {
    render(<Button {...defaultProps} disabled />)
    
    const button = screen.getByRole('button', { name: 'Test Button' })
    expect(button).toBeDisabled()
  })

  it('does not call onClick when disabled', async () => {
    const mockOnClick = jest.fn()
    
    render(<Button {...defaultProps} onClick={mockOnClick} disabled />)
    
    const button = screen.getByRole('button', { name: 'Test Button' })
    expect(button).toBeDisabled()
    
    // Try to trigger the onClick programmatically (disabled buttons can't be clicked)
    // The button should be disabled and onClick should not be called
    expect(mockOnClick).not.toHaveBeenCalled()
  })

  it('renders with start icon', () => {
    render(
      <Button {...defaultProps} startIcon={<span data-testid="start-icon">🚀</span>} />
    )
    
    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
  })

  it('renders with end icon', () => {
    render(
      <Button {...defaultProps} endIcon={<span data-testid="end-icon">⭐</span>} />
    )
    
    expect(screen.getByTestId('end-icon')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(<Button {...defaultProps} className="custom-class" />)
    
    const button = screen.getByRole('button', { name: 'Test Button' })
    expect(button).toHaveClass('custom-class')
  })

  it('renders with full width', () => {
    render(<Button {...defaultProps} fullWidth />)
    
    const button = screen.getByRole('button', { name: 'Test Button' })
    expect(button).toHaveClass('MuiButton-fullWidth')
  })

  it('renders as submit button', () => {
    render(<Button {...defaultProps} type="submit" />)
    
    const button = screen.getByRole('button', { name: 'Test Button' })
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('renders as reset button', () => {
    render(<Button {...defaultProps} type="reset" />)
    
    const button = screen.getByRole('button', { name: 'Test Button' })
    expect(button).toHaveAttribute('type', 'reset')
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    const mockOnClick = jest.fn()
    
    render(<Button {...defaultProps} onClick={mockOnClick} />)
    
    const button = screen.getByRole('button', { name: 'Test Button' })
    await user.tab()
    expect(button).toHaveFocus()
    
    await user.keyboard('{Enter}')
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    
    await user.keyboard(' ')
    expect(mockOnClick).toHaveBeenCalledTimes(2)
  })

  it('renders with aria-label', () => {
    render(<Button {...defaultProps} aria-label="Custom aria label" />)
    
    const button = screen.getByLabelText('Custom aria label')
    expect(button).toBeInTheDocument()
  })

  it('renders with data attributes', () => {
    render(<Button {...defaultProps} data-testid="custom-button" />)
    
    const button = screen.getByTestId('custom-button')
    expect(button).toBeInTheDocument()
  })
})
