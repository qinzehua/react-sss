import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button, ButtonSize } from './Button'

const meta = {
  title: '第四章: Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Buttonaa',
    size: ButtonSize.Small,
  },
}
