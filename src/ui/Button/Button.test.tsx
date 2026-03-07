import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

import { Button } from './Button'

describe('Button', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders a button with default semantics', () => {
    render(<Button>Save changes</Button>)

    const button = screen.getByRole('button', { name: /save changes/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('data-variant', 'primary')
    expect(button).toHaveAttribute('data-size', 'md')
    expect(button).toHaveAttribute('data-icon', 'left')
  })

  it('calls onClick when pressed', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Create product</Button>)

    await user.click(screen.getByRole('button', { name: /create product/i }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders icons and icon-only mode correctly', () => {
    render(
      <Button
        size="icon"
        variant="outline"
        icon={<ArrowRightIcon data-testid="button-icon" />}
        aria-label="Continue"
      />,
    )

    const button = screen.getByRole('button', { name: /continue/i })

    expect(button).toHaveAttribute('data-size', 'icon')
    expect(button).toHaveAttribute('data-icon', 'only')
    expect(screen.getByTestId('button-icon')).toBeInTheDocument()
  })

  it('renders loading state as busy and disabled', () => {
    render(<Button loading>Saving</Button>)

    const button = screen.getByRole('button', { name: /saving/i })

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toHaveAttribute('data-loading', 'true')
  })

  it('renders as a link when requested', () => {
    render(
      <Button as="a" asProps={{ href: '/billing' }} variant="link">
        Open billing
      </Button>,
    )

    const link = screen.getByRole('link', { name: /open billing/i })

    expect(link).toHaveAttribute('href', '/billing')
    expect(link).toHaveAttribute('data-variant', 'link')
  })

  it('prevents clicks when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(
      <Button disabled onClick={handleClick}>
        Disabled action
      </Button>,
    )

    const button = screen.getByRole('button', { name: /disabled action/i })

    expect(button).toBeDisabled()
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
