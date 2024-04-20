import { useState } from 'react'
import classNames from 'classnames'

type DraggerProps = {
  onFile: (files: FileList) => void
  children: React.ReactNode
}

export const Dragger = (props: DraggerProps) => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  console.log('dragOver: ', dragOver)
  const classes = classNames('uploader-dragger', {
    'is-dragover': dragOver,
  })

  return (
    <div
      className={classes}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setDragOver(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files)
      }}
    >
      {children}
    </div>
  )
}
