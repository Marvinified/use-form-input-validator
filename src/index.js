import { useReducer } from 'react'
import validator from 'validator'

const validate = ({ value, checks, customValidator }) => {
  if (checks) {
    checks = checks.split('|')
    for (const check of checks) {
      const [checkKey, checkConstraint] = check.split(':')

      switch (checkKey.trim()) {
        case 'required':
          if (!value) return 'Required.'
          break
        case 'match':
          if (value && !validator.matches(value, checkConstraint.trim()))
            return `Doesn't match ${checkConstraint.trim()}`
          break
        case 'date':
          if (value && validator.toDate(value) === null)
            return `Not a valid date.`
          break
        case 'email':
          if (value && !validator.isEmail(value)) return 'Not a valid email.'
          break
        case 'alpha':
          if (value && !validator.isAlpha(value))
            return 'Only Alphabets allowed.'
          break
        case 'alpha_num':
          if (value && !validator.isAlphanumeric(value))
            return 'Only Alphabets and Numbers allowed'
          break
        case 'url':
          if (value && !validator.isURL(value)) return 'Not a valid URL.'
          break
        case 'num':
          if (value && !validator.isNumeric(value))
            return 'Only Numbers allowed.'
          break
        case 'tel':
          if (value && !validator.isMobilePhone(value))
            return 'Not a valid mobile phone number.'
          break
        case 'min':
          if (value && value.length < parseInt(checkConstraint))
            return `Minimium of ${checkConstraint} character required.`
          break
        case 'max':
          if (value && value.length > parseInt(checkConstraint))
            return `Maximium of ${checkConstraint} character required.`
          break
        default:
          break
      }
    }
  }
  return typeof customValidator === 'function' && customValidator(value)
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.key]: validate({
            key: action.payload.key,
            value: action.payload.value,
            checks: state.checks[action.payload.key],
            customValidator: state.validators[action.payload.key]
          })
        },
        values: {
          [action.payload.key]: action.payload.value
        }
      }
    default:
      break
  }
}

const useFormValidator = (inputs) => {
  const initial = {
    checks: {},
    values: {},
    validators: {},
    errors: {}
  }

  for (const key in inputs) {
    initial.checks[key] = inputs[key].checks
    initial.validators[key] = inputs[key].validate
    initial.values[key] = inputs[key].value
    initial.errors[key] = ''
  }
  const [fields, setFormField] = useReducer(reducer, initial)

  const updateField = (e) => {
    validateField({
      key: e.target.name,
      value: e.target.value
    })
  }

  const validateField = ({ key, value }) => {
    if (fields.values[key] === undefined) {
      throw Error(`Field with key "${key}" not found, please make sure it is define in as follows:
      useFormValidator({
        ${key}: {
          value: "",
          error: "",
          checks: "required"
        }
      })
      `)
    }
    setFormField({
      type: 'UPDATE_FIELD',
      payload: {
        key,
        value
      }
    })
  }

  const isFieldValid = (key) => {
    validateField({
      key,
      value: fields.values[key]
    })
    // if error exist
    if (fields.errors[key]) return false
    // else
    return true
  }

  const isAllFieldsValid = () => {
    let valid = true

    for (const key in fields.values) {
      const error = validate({
        value: fields.values[key],
        checks: fields.checks[key]
      })

      if (error) valid = false

      setFormField({
        type: 'UPDATE_FIELD',
        payload: {
          key,
          value: fields.values[key],
          checks: fields.checks[key]
        }
      })
    }

    return valid
  }
  return {
    values: fields.values,
    errors: fields.errors,
    isAllFieldsValid,
    isFieldValid,
    updateField
  }
}

export default useFormValidator
