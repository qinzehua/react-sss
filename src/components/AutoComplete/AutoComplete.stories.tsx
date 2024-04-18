import type { Meta, StoryObj } from '@storybook/react'
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

type Story = StoryObj<typeof meta>

export const Default = () => {
  const lakerWithNumber: LakerType[] = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
  ]
  const fetchSuggestions = (keyword: string) => {
    return lakerWithNumber.filter((item) => item.value.includes(keyword))
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
