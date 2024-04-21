import React, { useReducer, useState } from 'react'
import Schema, { RuleItem, ValidateError } from 'async-validator'
import { mapValues, each } from 'lodash-es'

export type FunctionRule = ({
  getFieldValue,
}: {
  getFieldValue: (field: string) => any
}) => RuleItem

export type CustomRule = FunctionRule | RuleItem

type FieldDetail = {
  name: string
  value?: any
  rules?: CustomRule[]
  errors?: ValidateError[]
  isValidate?: boolean
}

export type FieldsStatus = {
  [key: string]: FieldDetail
}

interface ValidateErrorObj extends Error {
  errors: ValidateError[]
  fields: Record<string, ValidateError[]>
}

type FormStatus = {
  isValidate: boolean
  errors: Record<string, ValidateError[]>
  isSubmitting: boolean
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
  const [form, setForm] = useState<FormStatus>({
    isValidate: true,
    errors: {},
    isSubmitting: false,
  })

  const [fields, dispatch] = useReducer(FieldsReducer, {})

  const getFieldValue = (field: string) => fields[field].value
  const transformRules = (rules: CustomRule[]) => {
    return rules.map((rule) => {
      if (typeof rule === 'function') {
        return rule({ getFieldValue })
      }
      return rule
    })
  }

  const validateField = (name: string) => {
    const rules = fields[name].rules
    const value = fields[name].value

    if (rules) {
      const descriptor = {
        [name]: transformRules(rules),
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

  const validateAllFields = async () => {
    setForm({
      ...form,
      isSubmitting: true,
    })

    const valueMap = mapValues(fields, (field) => field.value)

    const descriptor = mapValues(fields, (field) =>
      transformRules(field.rules!)
    )

    let isValidate = true
    let errors: Record<string, ValidateError[]> = {}
    const validator = new Schema(descriptor)

    try {
      await validator.validate(valueMap)
    } catch (error) {
      isValidate = false
      errors = (error as ValidateErrorObj).fields
      console.log('errors: ', errors)
      each(fields, (value, name) => {
        if (errors[name]) {
          dispatch({
            type: 'validateField',
            payload: {
              name,
              isValidate: false,
              errors: errors[name],
            },
            name,
          })
        } else if (value.rules?.length && !errors[name]) {
          dispatch({
            type: 'validateField',
            payload: {
              name,
              isValidate: true,
              errors: [],
            },
            name,
          })
        }
      })
    } finally {
      setForm({
        ...form,
        isValidate,
        errors,
        isSubmitting: false,
      })

      return {
        isValidate,
        errors,
        values: valueMap,
      }
    }
  }

  return {
    form,
    fields,
    dispatch,
    validateField,
    getFieldValue,
    validateAllFields,
  }
}
