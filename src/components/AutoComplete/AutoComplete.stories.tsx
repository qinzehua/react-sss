import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { AutoComplete } from './AutoComplete'

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
  const data = ['apple', 'banana', 'orange', 'pear', 'peach', 'plum']
  return (
    <AutoComplete
      fetchSuggestions={(keyword) => {
        return data.filter((item) => item.includes(keyword))
      }}
    />
  )
}
