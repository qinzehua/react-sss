import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { FileUpload, Upload } from './Upload'
import { Icon } from '../Icon'

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

const defaultFileList: FileUpload[] = [
  {
    uid: '123',
    size: 1234,
    name: 'hello.md',
    status: 'uploading',
    percentage: 30,
  },
  {
    uid: '122',
    size: 1234,
    name: 'xyz.md',
    status: 'success',
    percentage: 30,
  },
  {
    uid: '121',
    size: 1234,
    name: 'eyiha.md',
    status: 'error',
    percentage: 30,
  },
]

export const Default = () => {
  return (
    <Upload
      action="http://localhost:3000/upload"
      beforeUpload={modifyFile}
      defaultFileList={defaultFileList}
      onProgress={(percentage, file) => {
        console.log('percentage: ', percentage)
      }}
      onSuccess={(data, file) => {
        console.log('data: ', data)
      }}
      onError={(err, file) => {
        console.log('err: ', err)
      }}
      onRemove={(file) => {
        console.log('remove file: ', file)
      }}
      name="qzh_file"
      data={{ kkkkk: 'value' }}
      headers={{ 'X-Powered-By': 'qzh' }}
      accept=".rar"
      multiple
    />
  )
}

export const Dragger = () => {
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
      onRemove={(file) => {
        console.log('remove file: ', file)
      }}
      name="qzh_file"
      data={{ kkkkk: 'value' }}
      headers={{ 'X-Powered-By': 'qzh' }}
      accept=".rar"
      multiple
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary"></Icon>
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  )
}
