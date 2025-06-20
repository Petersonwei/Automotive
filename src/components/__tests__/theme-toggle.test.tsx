import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '../ThemeToggle'

// Mock the matchMedia function
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('ThemeToggle', () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  }
  
  beforeEach(() => {
    // Setup localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    })
    // Clear all mocks before each test
    jest.clearAllMocks()
    // Reset the document's class list
    document.documentElement.classList.remove('dark')
  })

  it('toggles between light and dark mode when clicked', () => {
    render(<ThemeToggle />)
    
    // Get the toggle button
    const toggleButton = screen.getByRole('button')
    expect(toggleButton).toBeInTheDocument()

    // Initially should show dark mode icon (MdDarkMode)
    expect(toggleButton.firstChild).toHaveAttribute('data-testid', 'dark-icon')

    // Click the button
    fireEvent.click(toggleButton)

    // Should now show light mode icon (MdOutlineLightMode)
    expect(toggleButton.firstChild).toHaveAttribute('data-testid', 'light-icon')
    
    // Should have added 'dark' class to document
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    // Should have set localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')

    // Click again to toggle back
    fireEvent.click(toggleButton)

    // Should now show dark mode icon again
    expect(toggleButton.firstChild).toHaveAttribute('data-testid', 'dark-icon')
    
    // Should have removed 'dark' class
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    
    // Should have set localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
  })
}) 