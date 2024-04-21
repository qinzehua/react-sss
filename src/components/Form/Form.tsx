import {
  ReactNode,
  createContext,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {
  FieldAction,
  useStore,
  FieldsStatus,
  FormStatus,
} from './hooks/useStore'
import { ValidateError } from 'async-validator'

type ChildrenType = ReactNode | ((props: FormStatus) => ReactNode)

export type IFormRefProps = Omit<
  ReturnType<typeof useStore>,
  'form' | 'fields' | 'dispatch'
>

type FormProps = {
  children: ChildrenType
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

export const Form = forwardRef<IFormRefProps, FormProps>((props, ref) => {
  const { children, name, initailValues, onFinish, onFinishFailed } = props
  const { fields, form, dispatch, ...resetProps } = useStore(initailValues)
  const { validateField, getFieldValue, validateAllFields } = resetProps

  useImperativeHandle(
    ref,
    () => {
      return {
        ...resetProps,
      }
    },
    [resetProps]
  )

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

  let childElement: ReactNode

  if (typeof children === 'function') {
    childElement = children(form)
  } else {
    childElement = children
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
          {childElement}
        </FormContext.Provider>
      </form>
    </>
  )
})
