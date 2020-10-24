# 🆗 use-form-input-validator

React hooks library to validate your form inputs with easily configurable checks and validators.

[![NPM](https://img.shields.io/npm/v/use-form-input-validator.svg)](https://www.npmjs.com/package/use-form-input-validator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-form-input-validator
# or
yarn add use-form-input-validator
```

## Fork Demo on Codesandbox

[![Edit funny-khayyam-l4cbn](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/funny-khayyam-l4cbn?fontsize=14&hidenavigation=1&theme=dark)

# Usage

## Simple Usage

```jsx
import React from 'react'
import useFormValidator from 'use-form-input-validator'

const App = () => {
  const { values, errors, updateField, isAllFieldsValid } = useFormValidator({
    email: {
      value: '', // defuallt changes
      checks: 'required|email' // checks to run on the field on change
    }
  })

  const handleSubmit = (e) => {
    // verify if all fields are valid before submitting
    if (isAllFieldsValid()) {
      // get values easily
      const { email } = values
      console.log(email)
    }
  }
  return (
    <div>
      <label htmlFor='email'>Email: </label>
      <input name='email' onChange={updateField} />
      <br />
      <small style={{ color: 'red' }}>{errors.email}</small>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App
```

## Using Checks

Check allow you to perform common validation easily by specifying a string of list validation rules.

For example to make an username field required and have a minimium of 5 characters and a maximium of 10 character, you'll have the following `required|min:5|max:10`

```jsx
  ...
  useFormValidator({
    username: {
      value: '',
      checks: 'required|min:5|max:10', // checks to run on the field on input change
    }
  })
  ...
```

## Using a custom validator with checks

You can add a custom validator in addition to `checks` to create more complex validation rules by using the `validate` as follows.

```jsx
  ...
  const { values, errors, updateField, isAllFieldsValid } = useFormValidator({
    username: {
      value: '',
      checks: 'required|min:5|max:10', // checks to run on the field on change
      // Custom validator
      validate: (value) => {
        if (value.includes('kepler')) {
          return 'The word "kepler" cannot be included in your username'
        }
      }
    }
  })
  ...
```

## Check if a field is valid

You can check if a certain field value is valid

```jsx
import React from 'react'
import useFormValidator from 'use-form-input-validator'

const App = () => {
  const { values, errors, updateField, isFieldValid } = useFormValidator({
    email: {
      value: '', // defuallt changes
      checks: 'required|email' // checks to run on the field on change
    }
  })

  const handleSubmit = (e) => {
    // verify if email field is valid before submitting
    if (isFieldValid('email')) console.log(email)
  }
  return (
    <div>
      <label htmlFor='email'>Email: </label>
      <input name='email' onChange={updateField} />
      <br />
      <small style={{ color: 'red' }}>{errors.email}</small>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App
```

## Available Checks

- `alpha`

  The field under validation must be entirely alphabetic characters.

- `alpha_num`

  The field under validation must be entirely alpha-numeric characters.

- `date`

  The field under validation must be a valid date.

- `email`

  The field under validation must be a valid email address.

- `match:`_`regex`_

  he field under validation must match the given regular expression.

- `min:`_`limit`_

  The field under validation must have a minimium of _`limit`_ number of character.

- `max:`_`limit`_

  The field under validation must have a maximium of _`limit`_ number of character.

- `num`

  The field under validation must be a number

- `tel`

  The field under validation must be a mobile phone number

## License

MIT © [Marvinified](https://github.com/Marvinified)
