import { ReactNode, createContext, useEffect } from 'react'
import { FieldAction, useStore, FieldsStatus } from './hooks/useStore'

type FormProps = {
  children: ReactNode
  name: string
  initailValues?: Record<string, any>
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
  const { children, name, initailValues } = props
  const {
    fields,
    form,
    dispatch,
    validateField,
    getFieldValue,
    validateAllFields,
  } = useStore()

  useEffect(() => {
    validateAllFields()
  }, [fields, validateAllFields])

  return (
    <>
      <form className="form" name={name}>
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
      <div>
        <pre>{JSON.stringify(fields, null, 2)}</pre>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </>
  )
}
