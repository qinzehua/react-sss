import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Upload } from './Upload'

const meta = {
  title: 'Upload',
  component: Upload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Upload>

export default meta

type Story = StoryObj<typeof meta>

export const Default = () => {
  return (
    <Upload
      action="http://localhost:3000/upload"
      onProgress={(percentage, file) => {
        console.log('percentage: ', percentage)
      }}
      onSuccess={(data, file) => {
        console.log('data: ', data)
      }}
      onError={(err, file) => {
        console.log('err: ', err)
      }}
    />
  )
}
