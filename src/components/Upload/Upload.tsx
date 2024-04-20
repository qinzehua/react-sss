import axios from 'axios'
import { Button } from '../Button'
import { useRef } from 'react'

type UploadProps = {
  action: string
  onChange?: (files: File) => void
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
}

export const Upload = (props: UploadProps) => {
  const { action, onChange, onProgress, onSuccess, onError } = props

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
    Array.from(files).forEach((file) => {
      const formData = new FormData()
      formData.append(file.name, file)
      axios
        .post(action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (e) => {
            const percentage = Math.round((e.loaded * 100) / e.total!)
            if (percentage < 100) {
              onProgress?.(percentage, file)
            }
          },
        })
        .then((res) => {
          onSuccess?.(res.data, file)
        })
        .catch((err) => {
          onError?.(err, file)
        })
        .finally(() => {
          onChange?.(file)
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
