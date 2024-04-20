import axios from 'axios'
import { Button } from '../Button'
import { useRef, useState } from 'react'

export interface FileStatus {
  name: string
  percentage: number
  status: 'ready' | 'uploading' | 'success' | 'error'
  uid: string
  raw: File
  response?: any
}

type UploadProps = {
  action: string
  beforeUpload?: (file: File) => Promise<File | boolean>
  onChange?: (files: File) => void
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
}

export const Upload = (props: UploadProps) => {
  const { action, beforeUpload, onChange, onProgress, onSuccess, onError } =
    props

  const [fileList, setFileList] = useState<FileStatus[]>([])
  console.log('fileList: ', fileList)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    uploadFiles(files)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    Array.from(files).forEach(async (file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = await beforeUpload(file)
        if (typeof result === 'boolean' && result) {
          post(file)
        } else if (result instanceof File) {
          post(result)
        }
      }
    })
  }

  const post = (file: File) => {
    const _file: FileStatus = {
      name: file.name,
      percentage: 0,
      status: 'ready',
      uid: Date.now() + '_upload-file',
      raw: file,
    }
    setFileList((prevList) => {
      return [_file, ...prevList]
    })

    const formData = new FormData()
    formData.append(file.name, file)
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total!)
          updateFileList({ ..._file, percentage, status: 'uploading' })
          if (percentage < 100) {
            onProgress?.(percentage, file)
          }
        },
      })
      .then((res) => {
        onSuccess?.(res.data, file)
        updateFileList({ ..._file, status: 'success', response: res.data })
      })
      .catch((err) => {
        onError?.(err, file)
        updateFileList({ ..._file, status: 'error', response: err })
      })
      .finally(() => {
        onChange?.(file)
      })
  }

  const updateFileList = (updateFile: FileStatus) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateFile }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div>
      <Button onClick={handleClick} btnType="primary" size="lg">
        Upload
      </Button>
      <input onChange={handleChange} ref={inputRef} type="file" hidden />
    </div>
  )
}
