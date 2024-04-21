import { ReactNode, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { FormContext } from './Form'
import React from 'react'

type FormItemProps = {
  name: string
  label?: string
  children: ReactNode
  valuePropsName?: string
  trigger?: string
  getValueFromEvent?: (e: any) => any
}

export const FormItem = (props: FormItemProps) => {
  const {
    label,
    children,
    name,
    valuePropsName = 'value',
    trigger = 'onChange',
    getValueFromEvent,
  } = props

  const { dispatch, fields } = useContext(FormContext)

  const rowClasses = classNames('row', {
    'form-item-no-label': !label,
  })

  useEffect(() => {
    dispatch({
      type: 'addField',
      payload: {
        name,
        label,
        value: '',
        rules: [],
        isValidate: true,
      },
      name,
    })
  }, [])

  const value = fields?.[name]?.value
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getValueFromEvent ? getValueFromEvent(e) : e.target.value
    console.log('value: ', value)

    dispatch({
      type: 'updateField',
      payload: { value, name },
      name,
    })
  }

  const child = React.Children.toArray(children)[0] as React.ReactElement
  const cloneElement = React.cloneElement(child, {
    ...child.props,
    [valuePropsName]: value,
    [trigger]: handleValueChange,
  })

  return (
    <div className={rowClasses}>
      {label && (
        <div className="form-item-label">
          <label title={label}>{label}:</label>
        </div>
      )}
      <div className="form-item">{cloneElement}</div>
    </div>
  )
}
