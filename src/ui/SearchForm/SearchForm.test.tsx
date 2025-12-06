import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import SearchForm from './SearchForm'

describe('SearchForm', () => {
  const setup = (
    props: Partial<React.ComponentProps<typeof SearchForm>> = {},
  ) => {
    const user = userEvent.setup()
    render(
      <SearchForm
        placeholder="Search articles"
        label="Search articles"
        {...props}
      />,
    )
    const input = screen.getByLabelText(/search articles/i)
    return { user, input }
  }

  it('renders input with provided placeholder and label', () => {
    setup()
    expect(screen.getByLabelText(/search articles/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/search articles/i)).toBeInTheDocument()
  })

  it('submits trimmed value when pressing the submit button', async () => {
    const onSearch = jest.fn()
    const { user, input } = setup({ onSearch })

    await user.type(input, '   hello world   ')
    await user.keyboard('{Enter}')

    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('hello world'))
  })

  it('clears the query via button and focuses input', async () => {
    const onSearch = jest.fn()
    const { user, input } = setup({ onSearch })

    await user.type(input, 'query')
    const clearButton = screen.getByRole('button', { name: /clear search/i })
    await user.click(clearButton)

    expect(onSearch).toHaveBeenCalledWith('')
    expect(input).toHaveValue('')
    expect(input).toHaveFocus()
  })

  it('supports Escape key for clearing the value', async () => {
    const onSearch = jest.fn()
    const { user, input } = setup({ onSearch })

    await user.type(input, 'escape me')
    await user.keyboard('{Escape}')

    expect(onSearch).toHaveBeenCalledWith('')
    expect(input).toHaveValue('')
  })

  it('respects disabled state', async () => {
    render(<SearchForm placeholder="Search" label="Search input" disabled />)
    const input = screen.getByLabelText(/search input/i)
    expect(input).toBeDisabled()
    expect(
      screen.queryByRole('button', { name: /clear search/i }),
    ).not.toBeInTheDocument()
  })

  it('calls onSearch after debounce delay if configured', async () => {
    jest.useFakeTimers()
    const onSearch = jest.fn()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(
      <SearchForm
        placeholder="Search"
        label="Search input"
        onSearch={onSearch}
        debounceMs={300}
      />,
    )
    const input = screen.getByLabelText(/search input/i)

    await user.type(input, 'abc')
    expect(onSearch).not.toHaveBeenCalled()

    jest.advanceTimersByTime(300)
    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('abc'))
    jest.useRealTimers()
  })

  it('supports controlled usage via value/onValueChange', async () => {
    const onValueChange = jest.fn()
    const Wrapper = () => {
      const [state, setState] = React.useState('controlled')
      return (
        <SearchForm
          value={state}
          onValueChange={(next) => {
            onValueChange(next)
            setState(next)
          }}
          label="Controlled search"
          placeholder="Search"
        />
      )
    }
    const user = userEvent.setup()
    render(<Wrapper />)
    const input = screen.getByLabelText(/controlled search/i)

    expect(input).toHaveValue('controlled')
    await user.clear(input)
    await user.type(input, 'new value')

    expect(onValueChange).toHaveBeenCalled()
    expect(input).toHaveValue('new value')
  })
})
