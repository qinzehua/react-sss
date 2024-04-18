import { FC, useEffect, useState } from 'react'
import { Input, InputProps } from '../Input'
import { Icon } from '../Icon'
import { useDebounce } from '../../hooks/useDebounce'

export type BaseItem = {
  value: string
}

export type DataSourceType<T = {}> = T & BaseItem

export interface AutoCompleteProps<T> extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (
    keyword: string
  ) => DataSourceType<T>[] | Promise<DataSourceType<T>[]>
  onSelect?: (item: DataSourceType<T>) => void
  renderOption?: (item: DataSourceType<T>) => React.ReactNode
}

export function AutoComplete<T>(props: AutoCompleteProps<T>) {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } =
    props
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<DataSourceType<T>[]>([])
  const [loading, setLoading] = useState(false)

  const debounceValue = useDebounce(inputValue)

  useEffect(() => {
    const fetchData = async () => {
      if (debounceValue) {
        const results = fetchSuggestions(debounceValue)
        if (results instanceof Promise) {
          setLoading(true)
          const data = await results
          setSuggestions(data)
          setLoading(false)
        } else {
          setSuggestions(results)
        }
      } else {
        setSuggestions([])
      }
    }
    fetchData()
  }, [debounceValue, fetchSuggestions])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
  }

  const handleSelect = (item: DataSourceType<T>) => {
    setInputValue(item.value)
    setSuggestions([])
    onSelect?.(item)
  }

  const renderTemplate = (item: DataSourceType<T>) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div>
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}
