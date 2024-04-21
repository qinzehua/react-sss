import React, { useReducer, useState } from 'react'
import Schema, { RuleItem, ValidateError } from 'async-validator'

type FieldDetail = {
  name: string
  value?: any
  rules?: RuleItem[]
  errors?: ValidateError[]
  isValidate?: boolean
}

export type FieldsStatus = {
  [key: string]: FieldDetail
}

type FormStatus = {
  isValidate: boolean
}

export type FieldAction = {
  type: 'addField' | 'updateField' | 'validateField'
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
    case 'validateField':
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          isValidate: action.payload.isValidate,
          errors: action.payload.errors,
        },
      }
    default:
      return state
  }
}

export const useStore = () => {
  const [form, setForm] = useState<FormStatus>({ isValidate: true })
  const [fields, dispatch] = useReducer(FieldsReducer, {})

  const validateValue = (name: string) => {
    const rules = fields[name].rules
    console.log('rules: ', rules)
    const value = fields[name].value

    if (rules) {
      const descriptor = {
        [name]: rules,
      }
      const validator = new Schema(descriptor)
      let errors: ValidateError[] = []
      let isValidate = true

      validator
        .validate({ [name]: value })
        .then(() => {
          isValidate = true
          errors = []
        })
        .catch((err) => {
          isValidate = false
          errors = err.errors
        })
        .finally(() => {
          dispatch({
            type: 'validateField',
            payload: { name, isValidate, errors },
            name,
          })
        })
    }
  }

  return {
    form,
    fields,
    dispatch,
    validateValue,
  }
}
