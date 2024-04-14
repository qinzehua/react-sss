import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import { Icon } from '../Icon'

interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  icon?: IconProp
  append?: React.ReactNode
  prepend?: React.ReactNode
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = (props: InputProps) => {
  const { disabled, size, icon, append, prepend, className, style, ...rest } =
    props

  const classes = classNames('input-wrapper', className, {
    [`input-size-${size}`]: size,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  })

  return (
    <div className={classes} style={style}>
      {prepend && <div className="in-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} />
        </div>
      )}
      <input className="input-inner" disabled={disabled} {...rest} />
      {append && <div className="in-input-group-append">{append}</div>}
    </div>
  )
}
