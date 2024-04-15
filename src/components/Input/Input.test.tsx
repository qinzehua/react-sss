import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Input } from './Input'

const defaultProps = {
  onChange: jest.fn(),
  placeholder: 'input',
}

const testProps = {
  size: 'medium',
  icon: 'search',
  prepand: 'https://',
  append: '.com',
}

const disabledProps = {
  disabled: true,
  onChange: jest.fn(),
}

describe('Input', () => {
  it('should render the correct default input', async () => {
    render(<Input {...defaultProps} />)
    const element = screen.getByPlaceholderText('input')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('INPUT')
    expect(element).toHaveClass('input-inner')
    await userEvent.type(element, 'test')
    expect(defaultProps.onChange).toHaveBeenCalled()
  })
})
