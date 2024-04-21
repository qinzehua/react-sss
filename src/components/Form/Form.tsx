import { ReactNode, createContext } from 'react'
import { FieldAction, useStore, FieldsStatus } from './hooks/useStore'

type FormProps = {
  children: ReactNode
  name: string
}

export const FormContext = createContext<{
  dispatch: React.Dispatch<FieldAction>
  fields: FieldsStatus
}>({
  dispatch: () => {},
  fields: {},
})

export const Form = (props: FormProps) => {
  const { children, name } = props
  const { fields, form, dispatch } = useStore()
  return (
    <>
      <form className="form" name={name}>
        <FormContext.Provider value={{ dispatch, fields }}>
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
