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

const checkFileSize = async (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }
  return true
}

const modifyFile = async (file: File) => {
  const newFile = new File([file], 'new_name', { type: file.type })
  return newFile
}

export const Default = () => {
  return (
    <Upload
      action="http://localhost:3000/upload"
      beforeUpload={modifyFile}
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
