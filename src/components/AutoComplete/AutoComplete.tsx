import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Input, InputProps } from '../Input'
import { Icon } from '../Icon'
import { useDebounce } from '../../hooks/useDebounce'
import { useClickOutside } from '../../hooks/useClickOutside'

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
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const inputRef = useRef(false)
  const divRef = useRef<HTMLDivElement>(null)

  const debounceValue = useDebounce(inputValue)

  useEffect(() => {
    const fetchData = async () => {
      if (debounceValue && inputRef.current) {
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

  useClickOutside(divRef, () => {
    setSuggestions([])
    setHighlightIndex(-1)
  })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        if (suggestions.length > 0) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 'Escape':
        setSuggestions([])
        setHighlightIndex(-1)
        break
      case 'ArrowDown':
        setHighlightIndex((prev) => (prev + 1) % suggestions.length)
        break
      case 'ArrowUp':
        setHighlightIndex((prev) =>
          prev <= 0 ? suggestions.length - 1 : prev - 1
        )
        break
      default:
        break
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    inputRef.current = true
  }

  const handleSelect = (item: DataSourceType<T>) => {
    setInputValue(item.value)
    setSuggestions([])
    onSelect?.(item)
    inputRef.current = false
  }

  const renderTemplate = (item: DataSourceType<T>) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const classes = classNames('suggestion_item', {
            suggestion_item_selected: index === highlightIndex,
          })
          return (
            <li
              className={classes}
              key={index}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div ref={divRef}>
      <Input
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...restProps}
      />
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}
