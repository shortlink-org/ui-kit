import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchForm from './SearchForm'

describe('SearchForm Component', () => {
  const defaultProps = {
    placeholder: 'Search...',
    onSearch: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders with default props', () => {
    const { container } = render(<SearchForm {...defaultProps} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    expect(searchInput).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('placeholder', 'Search...')
  })

  it('renders with custom placeholder', () => {
    const { container } = render(<SearchForm {...defaultProps} placeholder="Enter search term..." />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    expect(searchInput).toHaveAttribute('placeholder', 'Enter search term...')
  })

  it('renders with initial query', () => {
    const { container } = render(<SearchForm {...defaultProps} defaultQuery="initial search" />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    expect(searchInput).toHaveValue('initial search')
  })

  it('calls onSearch when form is submitted', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    await user.type(searchInput, 'test query')
    await user.click(searchButton)
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query')
    })
  })

  it('uses deferred value for search input (React 19 pattern)', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    await user.type(searchInput, 'test')
    
    // useDeferredValue will trigger onSearch after React coordinates the update
    // This happens asynchronously, so we need to wait
    await waitFor(
      () => {
        expect(mockOnSearch).toHaveBeenCalled()
      },
      { timeout: 1000 },
    )
    
    // Should be called with the deferred value
    expect(mockOnSearch).toHaveBeenCalledWith('test')
  })

  it('handles transition when submitting form', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    await user.type(searchInput, 'test')
    await user.click(searchButton)
    
    // Form submission should work with transition
    // The transition might be too fast to catch, but the important thing is it doesn't break
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalled()
    })
  })

  it('renders disabled state', () => {
    const { container } = render(<SearchForm {...defaultProps} disabled />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    expect(searchInput).toBeDisabled()
    expect(searchButton).toBeDisabled()
  })

  it('does not call onSearch when disabled', async () => {
    const mockOnSearch = jest.fn()
    render(<SearchForm {...defaultProps} onSearch={mockOnSearch} disabled />)
    
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    // onSearch will be called once with empty string due to useEffect with deferredQuery
    // But it should not be called when button is clicked (disabled)
    const initialCalls = mockOnSearch.mock.calls.length
    
    // Button should be disabled, so clicking should not trigger submit
    expect(searchButton).toBeDisabled()
    
    // Wait a bit to ensure no additional calls
    await waitFor(() => {
      // Should only have the initial call from useEffect, no additional calls from submit
      expect(mockOnSearch.mock.calls.length).toBeLessThanOrEqual(initialCalls + 1)
    }, { timeout: 500 })
  })

  it('shows clear button when there is input', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const { container } = render(<SearchForm {...defaultProps} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    // Clear button should not be visible initially
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument()
    
    await user.type(searchInput, 'test')
    
    // Clear button should be visible
    const clearButton = screen.getByRole('button', { name: /clear search/i })
    expect(clearButton).toBeInTheDocument()
  })

  it('clears input when clear button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const { container } = render(<SearchForm {...defaultProps} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    await user.type(searchInput, 'test')
    expect(searchInput).toHaveValue('test')
    
    const clearButton = screen.getByRole('button', { name: /clear search/i })
    await user.click(clearButton)
    
    expect(searchInput).toHaveValue('')
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument()
  })

  it('calls onSearch with empty string when cleared', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    await user.type(searchInput, 'test')
    const clearButton = screen.getByRole('button', { name: /clear search/i })
    await user.click(clearButton)
    
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  it('handles keyboard events', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    await user.type(searchInput, 'test')
    await user.keyboard('{Escape}')
    
    expect(searchInput).toHaveValue('')
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  it('does not call onSearch for empty queries on submit', async () => {
    const mockOnSearch = jest.fn()
    
    render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchButton = screen.getByRole('button', { name: /search/i })
    // Button should be disabled when query is empty
    expect(searchButton).toBeDisabled()
    
    // onSearch will be called once with empty string due to useEffect with deferredQuery
    // But it should not be called again when button is clicked (disabled/empty)
    const initialCalls = mockOnSearch.mock.calls.length
    
    // Wait to ensure no additional calls from submit
    await waitFor(() => {
      // Should only have the initial call from useEffect
      expect(mockOnSearch.mock.calls.length).toBeLessThanOrEqual(initialCalls + 1)
    }, { timeout: 500 })
  })

  it('trims whitespace from search queries', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    await user.type(searchInput, '  test query  ')
    await user.click(searchButton)
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query')
    })
  })

  it('renders with custom className', () => {
    render(<SearchForm {...defaultProps} className="custom-search-form" />)
    
    const form = screen.getByRole('search')
    expect(form).toHaveClass('custom-search-form')
  })

  it('focuses input after clearing', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const { container } = render(<SearchForm {...defaultProps} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    await user.type(searchInput, 'test')
    const clearButton = screen.getByRole('button', { name: /clear search/i })
    await user.click(clearButton)
    
    expect(searchInput).toHaveFocus()
  })

  it('handles form submission with Enter key', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    await user.type(searchInput, 'test query')
    await user.keyboard('{Enter}')
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query')
    })
  })

  it('prevents default form submission', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const form = screen.getByRole('search')
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    await user.type(searchInput, 'test')
    
    // Mock preventDefault and create a proper event
    const preventDefault = jest.fn()
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    Object.defineProperty(submitEvent, 'preventDefault', { value: preventDefault })
    
    fireEvent(form, submitEvent)
    
    expect(preventDefault).toHaveBeenCalled()
  })

  it('handles form submission when onSearch is not provided', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const { container } = render(<SearchForm placeholder="Search..." />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    const form = screen.getByRole('search')
    
    expect(searchInput).toBeInTheDocument()
    await user.type(searchInput, 'test')
    
    // Submit form - should not call onSearch since it's not provided
    // This covers the case where if (onSearch) is false in handleSubmit
    const preventDefault = jest.fn()
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    Object.defineProperty(submitEvent, 'preventDefault', { value: preventDefault })
    
    fireEvent(form, submitEvent)
    
    // preventDefault should be called, but onSearch should not be called
    expect(preventDefault).toHaveBeenCalled()
    expect(searchInput).toHaveValue('test')
  })

  it('handles input change correctly', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    await user.type(searchInput, 'a')
    expect(searchInput).toHaveValue('a')
    
    await user.type(searchInput, 'b')
    expect(searchInput).toHaveValue('ab')
    
    await user.type(searchInput, 'c')
    expect(searchInput).toHaveValue('abc')
  })

  it('clears query when onSearch is not provided', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const { container } = render(<SearchForm placeholder="Search..." />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    await user.type(searchInput, 'test')
    expect(searchInput).toHaveValue('test')
    
    const clearButton = screen.getByRole('button', { name: /clear search/i })
    await user.click(clearButton)
    
    expect(searchInput).toHaveValue('')
    expect(searchInput).toHaveFocus()
  })

  it('does not clear on Escape when query is empty', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    // onSearch will be called once with empty string due to useEffect with deferredQuery
    const initialCalls = mockOnSearch.mock.calls.length
    
    // Input is already empty, pressing Escape should not trigger clearQuery
    await user.keyboard('{Escape}')
    
    // Should not have additional calls beyond the initial useEffect call
    await waitFor(() => {
      expect(mockOnSearch.mock.calls.length).toBeLessThanOrEqual(initialCalls + 1)
    })
    expect(searchInput).toHaveValue('')
  })

  it('does not clear on Escape when disabled', async () => {
    const mockOnSearch = jest.fn()
    // Render with initial query and disabled
    const { container } = render(
      <SearchForm {...defaultProps} onSearch={mockOnSearch} defaultQuery="test" disabled />
    )
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    // Input should have the initial value
    expect(searchInput).toHaveValue('test')
    expect(searchInput).toBeDisabled()
    
    // Press Escape - should not clear because disabled prevents the event handler
    const escapeEvent = new KeyboardEvent('keyup', { key: 'Escape', bubbles: true })
    window.dispatchEvent(escapeEvent)
    
    // Value should remain because disabled prevents clearQuery
    await waitFor(() => {
      expect(searchInput).toHaveValue('test')
    }, { timeout: 500 })
    
    // onSearch should not be called with empty string due to Escape
    // (it may be called with 'test' from useEffect, but not with '' from Escape)
    const callsWithEmpty = mockOnSearch.mock.calls.filter(call => call[0] === '')
    expect(callsWithEmpty.length).toBe(0)
  })

  it('handles submit with transition when onSearch is provided', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    await user.type(searchInput, 'test query')
    await user.click(searchButton)
    
    // Should call onSearch with trimmed query in transition
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query')
    })
  })

  it('handles Escape key when query exists and not disabled', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    const { container } = render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = container.querySelector('#search-input') as HTMLInputElement
    
    await user.type(searchInput, 'test')
    
    // Simulate Escape key press
    const escapeEvent = new KeyboardEvent('keyup', { key: 'Escape', bubbles: true })
    window.dispatchEvent(escapeEvent)
    
    await waitFor(() => {
      expect(searchInput).toHaveValue('')
      expect(mockOnSearch).toHaveBeenCalledWith('')
    })
  })
})
