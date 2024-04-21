import { ReactNode, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { FormContext } from './Form'

type FormItemProps = {
  name: string
  label?: string
  children: ReactNode
}

export const FormItem = (props: FormItemProps) => {
  const { label, children } = props

  const formContext = useContext(FormContext)

  const rowClasses = classNames('row', {
    'form-item-no-label': !label,
  })

  useEffect(() => {
    formContext.dispatch({
      type: 'addField',
      payload: {
        name: props.name,
        label,
        value: '',
        rules: [],
        isValidate: true,
      },
      name: props.name,
    })
  }, [])

  return (
    <div className={rowClasses}>
      {label && (
        <div className="form-item-label">
          <label title={label}>{label}:</label>
        </div>
      )}
      <div className="form-item">{children}</div>
    </div>
  )
}
