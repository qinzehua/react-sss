import { ReactNode, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { FormContext } from './Form'
import React from 'react'
import { RuleItem } from 'async-validator'

type FormItemProps = {
  name: string
  label?: string
  children: ReactNode
  valuePropsName?: string
  trigger?: string
  getValueFromEvent?: (e: any) => any
  rules?: RuleItem[]
  validateTrigger?: string
}

export const FormItem = (props: FormItemProps) => {
  const {
    label,
    children,
    name,
    valuePropsName = 'value',
    trigger = 'onChange',
    getValueFromEvent,
    rules,
    validateTrigger = 'onBlur',
  } = props

  const { dispatch, validateValue, fields, initailValues } =
    useContext(FormContext)

  const errors = fields[name]?.errors ?? []
  const hasError = errors.length > 0

  const rowClasses = classNames('row', {
    'form-item-no-label': !label,
  })

  const controlClasses = classNames('form-item-control', {
    'form-item-has-error': hasError,
  })

  const errorClasses = classNames('form-item-explain')

  useEffect(() => {
    const initialValue = initailValues?.[name] ?? ''
    dispatch({
      type: 'addField',
      payload: {
        name,
        value: initialValue,
        rules: rules,
        errors: [],
        isValidate: true,
      },
      name,
    })
  }, [])

  const value = fields?.[name]?.value
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getValueFromEvent ? getValueFromEvent(e) : e.target.value

    dispatch({
      type: 'updateField',
      payload: { value, name },
      name,
    })
  }

  const child = React.Children.toArray(children)[0] as React.ReactElement
  const childProps = { ...child.props }
  childProps[trigger] = handleValueChange
  childProps[valuePropsName] = value

  if (rules) {
    const originEvent = childProps[validateTrigger]
    childProps[validateTrigger] = (e: any) => {
      originEvent?.(e)
      validateValue(name)
    }
  }

  const cloneElement = React.cloneElement(child, childProps)

  return (
    <div className={rowClasses}>
      {label && (
        <div className="form-item-label">
          <label title={label}>{label}:</label>
        </div>
      )}
      <div className="form-item">
        <div className={controlClasses}>{cloneElement}</div>
        {hasError && <div className={errorClasses}>{errors[0].message}</div>}
      </div>
    </div>
  )
}