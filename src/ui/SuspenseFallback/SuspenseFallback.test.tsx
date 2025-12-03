import { render, screen } from '@testing-library/react'
import { SuspenseFallback } from './SuspenseFallback'

describe('SuspenseFallback', () => {
  it('renders with default message', () => {
    render(<SuspenseFallback />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<SuspenseFallback message="Загрузка данных..." />)

    expect(screen.getByText('Загрузка данных...')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders without message when message is empty string', () => {
    render(<SuspenseFallback message="" />)

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('has correct structure with spinner and message', () => {
    const { container } = render(<SuspenseFallback message="Loading data" />)

    const spinner = screen.getByRole('progressbar')
    expect(spinner).toBeInTheDocument()
    expect(screen.getByText('Loading data')).toBeInTheDocument()

    // Check that it's a flex container
    const box = container.firstChild
    expect(box).toHaveStyle({ display: 'flex' })
  })
})

