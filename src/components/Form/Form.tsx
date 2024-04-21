import { ReactNode, createContext } from 'react'
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
  validateValue: (name: string) => void
  getFieldValue: (field: string) => any
}>({
  dispatch: () => {},
  fields: {},
  initailValues: {},
  validateValue: () => {},
  getFieldValue: () => {},
})

export const Form = (props: FormProps) => {
  const { children, name, initailValues } = props
  const { fields, form, dispatch, validateValue, getFieldValue } = useStore()
  return (
    <>
      <form className="form" name={name}>
        <FormContext.Provider
          value={{
            dispatch,
            validateValue,
            fields,
            initailValues,
            getFieldValue,
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
