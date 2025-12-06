import { render, screen } from '@testing-library/react'
import { SuspenseFallback } from './SuspenseFallback'

describe('SuspenseFallback', () => {
  it('renders with default message', () => {
    render(<SuspenseFallback />)

    expect(
      screen.getByText('Loading...', { selector: 'p' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Loading...',
    )
  })

  it('renders with custom message', () => {
    render(<SuspenseFallback message="Загрузка данных..." />)

    expect(
      screen.getByText('Загрузка данных...', { selector: 'p' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Загрузка данных...',
    )
  })

  it('renders without visible message when message is empty string', () => {
    render(<SuspenseFallback message="" />)

    // Message should not be visible, but aria-label should still have "Loading..."
    expect(
      screen.queryByText('Loading...', { selector: 'p' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Loading...',
    )
  })

  it('has correct structure with spinner and message', () => {
    const { container } = render(<SuspenseFallback message="Loading data" />)

    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
    expect(
      screen.getByText('Loading data', { selector: 'p' }),
    ).toBeInTheDocument()

    // Check that it's a flex container
    const box = container.firstChild
    expect(box).toHaveClass('flex', 'flex-col')
  })

  it('renders with different sizes', () => {
    const { container: smContainer } = render(<SuspenseFallback size="sm" />)
    const { container: mdContainer } = render(<SuspenseFallback size="md" />)
    const { container: lgContainer } = render(<SuspenseFallback size="lg" />)

    const smSpinner = smContainer.querySelector('[role="status"]')
    const mdSpinner = mdContainer.querySelector('[role="status"]')
    const lgSpinner = lgContainer.querySelector('[role="status"]')

    expect(smSpinner).toHaveClass('w-4', 'h-4')
    expect(mdSpinner).toHaveClass('w-8', 'h-8')
    expect(lgSpinner).toHaveClass('w-12', 'h-12')
  })

  it('applies custom className', () => {
    const { container } = render(<SuspenseFallback className="custom-class" />)

    const box = container.firstChild
    expect(box).toHaveClass('custom-class')
  })
})
