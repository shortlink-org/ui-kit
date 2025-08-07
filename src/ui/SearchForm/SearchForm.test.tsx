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
    render(<SearchForm {...defaultProps} />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    expect(searchInput).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('placeholder', 'Search...')
  })

  it('renders with custom placeholder', () => {
    render(<SearchForm {...defaultProps} placeholder="Enter search term..." />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    expect(searchInput).toHaveAttribute('placeholder', 'Enter search term...')
  })

  it('renders with initial query', () => {
    render(<SearchForm {...defaultProps} defaultQuery="initial search" />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    expect(searchInput).toHaveValue('initial search')
  })

  it('calls onSearch when form is submitted', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    
    render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    await user.type(searchInput, 'test query')
    await user.click(searchButton)
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query')
  })

  it('debounces search input', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    
    render(<SearchForm {...defaultProps} onSearch={mockOnSearch} debounceDelay={300} />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    
    await user.type(searchInput, 'test')
    
    // Should not be called immediately
    expect(mockOnSearch).not.toHaveBeenCalled()
    
    // Fast forward past debounce delay
    jest.advanceTimersByTime(300)
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test')
    })
  })

  it('renders disabled state', () => {
    render(<SearchForm {...defaultProps} disabled />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    expect(searchInput).toBeDisabled()
    expect(searchButton).toBeDisabled()
  })

  it('does not call onSearch when disabled', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    
    render(<SearchForm {...defaultProps} onSearch={mockOnSearch} disabled />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    await user.type(searchInput, 'test')
    await user.click(searchButton)
    
    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('shows clear button when there is input', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    
    render(<SearchForm {...defaultProps} />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    
    // Clear button should not be visible initially
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument()
    
    await user.type(searchInput, 'test')
    
    // Clear button should be visible
    const clearButton = screen.getByRole('button', { name: /clear search/i })
    expect(clearButton).toBeInTheDocument()
  })

  it('clears input when clear button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    
    render(<SearchForm {...defaultProps} />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    
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
    
    render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    
    await user.type(searchInput, 'test')
    const clearButton = screen.getByRole('button', { name: /clear search/i })
    await user.click(clearButton)
    
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  it('handles keyboard events', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    
    render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    
    await user.type(searchInput, 'test')
    await user.keyboard('{Escape}')
    
    expect(searchInput).toHaveValue('')
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  it('does not call onSearch for empty queries', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    
    render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchButton = screen.getByRole('button', { name: /search/i })
    await user.click(searchButton)
    
    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('trims whitespace from search queries', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    
    render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    const searchButton = screen.getByRole('button', { name: /search/i })
    
    await user.type(searchInput, '  test query  ')
    await user.click(searchButton)
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query')
  })

  it('renders with custom className', () => {
    render(<SearchForm {...defaultProps} className="custom-search-form" />)
    
    const form = screen.getByRole('search')
    expect(form).toHaveClass('custom-search-form')
  })

  it('focuses input after clearing', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    
    render(<SearchForm {...defaultProps} />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    
    await user.type(searchInput, 'test')
    const clearButton = screen.getByRole('button', { name: /clear search/i })
    await user.click(clearButton)
    
    expect(searchInput).toHaveFocus()
  })

  it('handles form submission with Enter key', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    
    render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    
    await user.type(searchInput, 'test query')
    await user.keyboard('{Enter}')
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query')
  })

  it('prevents default form submission', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const mockOnSearch = jest.fn()
    
    render(<SearchForm {...defaultProps} onSearch={mockOnSearch} />)
    
    const form = screen.getByRole('search')
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    
    await user.type(searchInput, 'test')
    
    // Mock preventDefault and create a proper event
    const preventDefault = jest.fn()
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    Object.defineProperty(submitEvent, 'preventDefault', { value: preventDefault })
    
    fireEvent(form, submitEvent)
    
    expect(preventDefault).toHaveBeenCalled()
  })
})
