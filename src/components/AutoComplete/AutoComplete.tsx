import { FC, useState } from 'react'
import { Input, InputProps } from '../Input'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (keyword: string) => string[]
  onSelect?: (item: string) => void
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (value) {
      const results = fetchSuggestions(value)
      console.log('results: ', results)
      setSuggestions(results)
    } else {
      setSuggestions([])
    }
  }

  const handleSelect = (item: string) => {
    setInputValue(item)
    setSuggestions([])
    onSelect?.(item)
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {item}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div>
      <Input value={inputValue} onChange={handleChange} {...restProps} />

      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}
