import type { Meta, StoryObj } from '@storybook/react'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'
import { SubMenu } from './SubMenu'

const meta = {
  title: 'Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render() {
    return (
      <Menu defaultIndex={'1'} defaultOpenSubMenus={['2']}>
        <MenuItem>cool link</MenuItem>
        <MenuItem disabled>cool link 2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <SubMenu title="dropdown2">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>cool link 3</MenuItem>
      </Menu>
    )
  },
}

export const Vertical: Story = {
  args: {
    mode: 'vertical',
    defaultIndex: '1',
    defaultOpenSubMenus: ['3'],
  },
  render(args) {
    return (
      <Menu {...args}>
        <MenuItem>cool link</MenuItem>
        <MenuItem disabled>cool link 2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <SubMenu title="dropdown2">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>cool link 3</MenuItem>
      </Menu>
    )
  },
  parameters: {
    backgrounds: {
        
    }
  }
}
