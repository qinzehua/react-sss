import React, { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

type BaseButtonProps = ButtonHTMLAttributes<HTMLElement> & {
  className?: string
  disabled?: boolean
  size?: 'lg' | 'sm'
  btnType?: 'primary' | 'default' | 'danger' | 'link'
  children: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

export function Button(props: BaseButtonProps) {
  const {
    className,
    disabled = false,
    size,
    btnType = ButtonType.Default,
    children,
    href,
    onClick,
    ...restProps
  } = props

  const classnames = classNames(
    'btn',
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      disabled: btnType === ButtonType.Link && disabled,
    },
    className
  )

  if (btnType === ButtonType.Link && href) {
    return (
      <a href={href} className={classnames}>
        {children}
      </a>
    )
  } else {
    return (
      <button
        {...restProps}
        className={classnames}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}
