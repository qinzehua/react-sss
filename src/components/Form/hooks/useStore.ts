import React, { useReducer, useState } from 'react'

type FieldDetail = {
  name: string
  label?: React.ReactNode
  value: any
  rules?: any[]
  isValidate?: boolean
}

export type FieldsStatus = {
  [key: string]: FieldDetail
}

type FormStatus = {
  isValidate: boolean
}

export type FieldAction = {
  type: 'addField' | 'updateField'
  payload: FieldDetail
  name: string
}

const FieldsReducer = (
  state: FieldsStatus,
  action: FieldAction
): FieldsStatus => {
  switch (action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: action.payload,
      }
    case 'updateField':
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          value: action.payload.value,
        },
      }
    default:
      return state
  }
}

export const useStore = () => {
  const [form, setForm] = useState<FormStatus>({ isValidate: true })
  const [fields, dispatch] = useReducer(FieldsReducer, {})

  return {
    form,
    fields,
    dispatch,
  }
}
