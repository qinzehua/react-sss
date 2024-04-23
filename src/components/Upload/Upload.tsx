import axios from 'axios'
import { useRef, useState } from 'react'
import { UploadList } from './UploadList'
import { Dragger } from './Dragger'

export interface FileUpload {
  name: string
  percentage: number
  status: 'ready' | 'uploading' | 'success' | 'error'
  size: number
  uid: string
  raw?: File
  response?: any
}

type UploadProps = {
  action: string
  defaultFileList?: FileUpload[]
  beforeUpload?: (file: File) => Promise<File | boolean>
  onChange?: (files: File) => void
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onRemove?: (file: FileUpload) => void
  headers?: { [key: string]: any }
  name?: string
  data?: { [key: string]: any }
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
  drag?: boolean
  children?: React.ReactNode
}

export const Upload = (props: UploadProps) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props

  const [fileList, setFileList] = useState<FileUpload[]>(defaultFileList ?? [])
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
    console.log('files: ', files)
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
    const filename = name || file.name
    const _file: FileUpload = {
      name: filename,
      size: file.size,
      percentage: 0,
      status: 'ready',
      uid: Date.now() + '_upload-file',
      raw: file,
    }
    setFileList((prevList) => {
      return [_file, ...prevList]
    })

    const formData = new FormData()
    formData.append(filename, file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
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

  const updateFileList = (updateFile: FileUpload) => {
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

  const handleRemove = (file: FileUpload) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })
    onRemove?.(file)
  }

  return (
    <div className="upload-component">
      <div className="upload-input" onClick={handleClick}>
        {drag ? (
          <Dragger onFile={(files) => uploadFiles(files)}>{children}</Dragger>
        ) : (
          children
        )}
        <input
          onChange={handleChange}
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          hidden
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}
