import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Input } from './Input'
import { useState } from 'react'

const meta = {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'medium',
    placeholder: '漂亮的 Input',
  },
}

export const IconInput: Story = {
  args: {
    size: 'medium',
    placeholder: '漂亮的 Input',
    icon: 'search',
  },
}

export const SizeInput = () => (
  <div>
    <Input defaultValue="large size" size="large" />
    <Input placeholder="small size" size="small" />
  </div>
)

export const pandInput = () => (
  <div>
    <Input defaultValue="prepend text" prepend="https://" />
    <Input defaultValue="google" append=".com" />
  </div>
)

export const ControlledInput = () => {
  const [value, setValue] = useState('')
  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
  )
}
