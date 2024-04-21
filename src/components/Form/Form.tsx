import { ReactNode, createContext, useEffect } from 'react'
import { FieldAction, useStore, FieldsStatus } from './hooks/useStore'
import { ValidateError } from 'async-validator'

type FormProps = {
  children: ReactNode
  name: string
  initailValues?: Record<string, any>
  onFinish?: (values: Record<string, any>) => void
  onFinishFailed?: (
    values: Record<string, any>,
    error: Record<string, ValidateError[]>
  ) => void
}

export const FormContext = createContext<{
  dispatch: React.Dispatch<FieldAction>
  fields: FieldsStatus
  initailValues?: Record<string, any>
  validateField: (name: string) => void
  getFieldValue: (field: string) => any
  validateAllFields: () => void
}>({
  dispatch: () => {},
  fields: {},
  initailValues: {},
  validateField: () => {},
  getFieldValue: () => {},
  validateAllFields: () => {},
})

export const Form = (props: FormProps) => {
  const { children, name, initailValues, onFinish, onFinishFailed } = props
  const {
    fields,
    form,
    dispatch,
    validateField,
    getFieldValue,
    validateAllFields,
  } = useStore()
  console.log('form.isValidate) : ', form.isValidate)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { isValidate, values, errors } = await validateAllFields()
    if (isValidate) {
      onFinish?.(values)
    } else {
      onFinishFailed?.(values, errors)
    }
  }

  return (
    <>
      <form className="form" name={name} onSubmit={handleSubmit}>
        <FormContext.Provider
          value={{
            dispatch,
            validateField,
            fields,
            initailValues,
            getFieldValue,
            validateAllFields,
          }}
        >
          {children}
        </FormContext.Provider>
      </form>
    </>
  )
}
