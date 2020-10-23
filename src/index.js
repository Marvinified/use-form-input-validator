import { useReducer } from 'react'
import validator from 'validator'

const validate = ({ key, value, checks, customValidator }) => {
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
          if (value && !validator.toDate(value)) return `Not a valid date.`
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
        [action.payload.key]: {
          ...state[action.payload.key],
          value: action.payload.value,
          error: validate({
            key: action.payload.key,
            value: action.payload.value,
            checks: state[action.payload.key].checks,
            customValidator: state[action.payload.key]?.validate
          })
        }
      }
    default:
      break
  }
}

const useFormValidator = (inputs) => {
  const [fields, setFormField] = useReducer(reducer, inputs)

  const updateField = ({ key, value }) => {
    if (!fields[key]) {
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

  const validateAllFields = () => {
    let hasError = false

    for (const key in fields) {
      const error = validate({
        key,
        value: fields[key].value,
        checks: fields[key].checks
      })

      if (error) hasError = true

      setFormField({
        type: 'UPDATE_FIELD',
        payload: {
          key,
          value: fields[key].value,
          checks: fields[key].checks
        }
      })
    }

    return hasError
  }

  return { fields, updateField, validateAllFields }
}

export default useFormValidator
