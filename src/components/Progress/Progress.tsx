import React, { FC } from 'react'
import { ThemeProps } from '../Icon'

export interface ProgressProps {
  percent: number
  strokeHeight?: number
  showText?: boolean
  style?: React.CSSProperties
  theme?: ThemeProps
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, style, theme } = props
  return (
    <div className="progress-bar" style={style}>
      <div
        className="progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
}

export default Progress
