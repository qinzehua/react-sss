import type { Meta } from '@storybook/react'
import { fn } from '@storybook/test'
import { AutoComplete, DataSourceType } from './AutoComplete'

type LakerType = DataSourceType<{ number: number }>

const meta = {
  title: 'AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof AutoComplete>

export default meta

export const Default = () => {
  const fetchSuggestions = (keyword: string) => {
    return fetch('https://api.github.com/search/users?q=' + keyword)
      .then((res) => res.json())
      .then(({ items }) => {
        if (!items) return []

        return items.slice(0, 10).map((item: any) => ({
          value: item.login,
          ...item,
        }))
      })
  }

  const renderOption = (item: LakerType) => {
    return <h2>Name: {item.value}</h2>
  }

  return (
    <AutoComplete<{ number: number }>
      fetchSuggestions={fetchSuggestions}
      renderOption={renderOption}
    />
  )
}
